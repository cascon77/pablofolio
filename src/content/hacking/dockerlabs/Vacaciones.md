---
title: Vacaciones
description: Writeup de Vacaciones.
date: 2026-11-08
draft: false
platform: dockerlabs
difficulty: very-easy
os: linux
topics:
  - enumeration
  - web
  - auth
  - privesc
tags:
  - dockerlabs
---
**Vulnerabilidades o técnicas principales:** information-disclosure, brute-force, account-pivoting, sudo-enumeration, privesc.


> Trabaja únicamente en el laboratorio autorizado. No reutilices estas técnicas
> contra sistemas sin permiso explícito.

## Reconocimiento y enumeración

Lo primero que realizamos es un reconocimiento. Para esto lo que hice fue hacer un escaneo de puertos para saber exactamente que puertos estaban abiertos y cuales son.

El comando que ejecute para realizar esto fue el siguiente
```bash
nmap -sV -sC --min-rate 5000 -n -Pn 172.17.0.2
```

Dándome como resultado los siguientes puertos abiertos
![Resultado del escaneo de puertos y servicios con Nmap](./imagenes/Pasted%20image%2020261108130506.png)

| Puerto | Protocolo | Estado | Servicio | Versión                        |
| ------ | --------- | ------ | -------- | ------------------------------ |
| 22     | tcp       | open   | ssh      | OpenSSH 7.6p1                  |
| 80     | tcp       | open   | http     | Apache httpd 2.4.29 ((Ubuntu)) |

Con esto sabemos que tiene un puerto ssh expuesto y una pagina web a la que posteriormente analizaremos
## Análisis

Empezamos por la pagina web: 
1. Entramos a revisar si tiene información relevante. Como esta esta en blanco vamos a ver si tiene algo oculto en el código.
2. Abrimos el inspeccionar elemento o con el `ctrl + U` abrimos el  código fuente la pagina en el cual encontraremos un comentario que es un mensaje entre dos personas
![Comentario HTML encontrado en el código fuente de la página](./imagenes/Pasted%20image%2020261108130315.png)

También revisamos si el SSH tiene vulnerabilidades (CVE) la cual encontramos que es vulnerable a enumeración de usuarios (CVE-2018-15473).
## Explotación

Empezamos con la explotación como había encontrado esos dos nombres de usuario opté de por intentar asegurar e ir por el vector de ataque de enumerar usuarios realizando una lista de usuarios (los dos usuarios que encontramos en el análisis) y lance el exploit a través de metasploit. Pero esto no me dio ningún resultado.

El siguiente paso que hice cogiendo esa lista de usuarios pasarme a un ataque de fuerza bruta a través de la herramienta hydra.
```bash
hydra -L usuarios.txt -P /usr/share/wordlists/rockyou.txt ssh://172.17.0.2 -t 4
```

![Resultado de Hydra al encontrar credenciales SSH](./imagenes/Pasted%20image%2020261108130343.png)
(el parámetro -l es una flag del comando de hydra para buscar por un único usuario)

Una vez tenemos la contraseña del usuario debemos registrarnos por ssh 
```bash
ssh camilo@172.17.0.2
```

Una vez dentro del usuario nuestro objetivo será recopilar información y recordando el comentario que había en la pagina web tenemos que movernos entre las carpetas hasta el mail que esta en `/var/mail/camilo` donde encontraremos un archivo llamado `correo.txt` que pone:
![Contenido del correo encontrado en el sistema](./imagenes/Pasted%20image%2020261108130532.png)

Además revise el `/etc/passwd` para saber los usuarios existentes en el sistema que son los siguientes ***juan***, ***camilo*** y ***pedro***.

Ahora entraremos a la cuenta de juan por ssh ya que la contraseña fue escrita por el correo que le mando juan a camilo siendo este.
```bash
ssh juan@172.17.0.2
```

## Escalada de privilegios

Ahora tendremos que realizar la escalada de privilegios porque queremos hacernos root. Entonces, lo primero que haremos es analizar los posibles vectores de explotación para elevar privilegios. 
```bash
sudo -l
```
Esto nos da el siguiente resultado:
![Resultado de sudo -l mostrando permisos de Ruby](./imagenes/Pasted%20image%2020261108131203.png)
Mostrándonos que el `/usr/bin/ruby` no necesita contraseña para ejecutarlo como administrador así que nos aprovecharemos de esto utilizando la técnica de evasión de shell documentada en GTFOBins:
```
sudo ruby -e 'exec "/bin/sh"'
```

## Flags o prueba de finalización

Para comprobar que esto funcionó realiza:
```
whoami
```
Y a mi siempre me gusta hacer un `cat` de `shadow`
```bash
cat /etc/shadow
```

**En este laboratorio no hay una FLAG final**
## Mitigaciones y aprendizajes

- **Causa raíz:** 
	1. Información sensible (nombres de usuarios) dentro del codigo fuente web visible.
	2. Uso de credenciales débiles a ataques de fuerza bruta.
	3. Transmisión de credenciales en texto plano.
	4. Principio de menor privilegio vulnerado mediante una regla `/etc/sudoers` excesivamente permisiva (`NOPASSWD`) sobre un intérprete ejecutable (`/usr/bin/ruby`).
- **Mitigación:**
	1. **Limpieza de código web:** Sanitizar el código fuente retirando comentarios, rastros de desarrollo o comunicaciones internas antes de desplegar en producción. 
	2. **Fortalecimiento de SSH:** Implementar políticas de contraseñas robustas o priorizar la autenticación mediante claves criptográficas (`SSH Keys`). Configurar herramientas de mitigación como `Fail2Ban` o limitar los intentos de inicio de sesión para detener ataques de fuerza bruta. 
	3. **Gestión segura de credenciales:** Evitar almacenar contraseñas en archivos de texto plano dentro de correos o logs del sistema. Restringir permisos de lectura en directorios sensibles. 
	4. **Hardening de Sudoers:** Aplicar el principio de menor privilegio. Evitar otorgar `NOPASSWD` a binarios interactivos o intérpretes de comandos (como Ruby, Python, Perl, Bash, etc.). Si se requiere delegación de tareas, restringir los parámetros exactos o utilizar scripts firmados y no editables por el usuario.
- **Aprendizajes:**
	- **Cadena de ataque completa (Kill Chain):** Un hallazgo aparentemente menor en la capa de aplicación (comentario HTML) puede ser el detonante clave para comprometer completamente la infraestructura de red subyacente. 
	- **Uso estratégico de GTFOBins:** Los binarios legítimos con permisos administrativos pueden ser vectorizados como proxy de ejecución de código si permiten el escape de contexto (`exec "/bin/sh"`).  
	- **Pivoteo interno:** La enumeración post-explotación local (revisión de correos internos y `/etc/passwd`) es crucial para identificar vectores de movimiento lateral entre usuarios antes de intentar una escalada a superusuario.

## Referencias

- GTFOBins (Ruby Sudo Abuse): https://gtfobins.github.io/gtfobins/ruby
- CVE-2018-15473 (OpenSSH User Enumeration): https://nvd.nist.gov/vuln/detail/CVE-2018-15473