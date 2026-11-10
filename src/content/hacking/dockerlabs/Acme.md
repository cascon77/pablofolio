---
title: Acme
description: Writeup de Acme.
date: 2026-11-09
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
**Vulnerabilidades o técnicas principales:** information-disclosure, SUID.


> Trabaja únicamente en el laboratorio autorizado. No reutilices estas técnicas
> contra sistemas sin permiso explícito.

## Reconocimiento y enumeración

Lo primero que realizamos es un reconocimiento. Para esto lo que hice fue hacer un escaneo de puertos para saber exactamente que puertos estaban abiertos y cuales son.

El comando que ejecute para realizar esto fue el siguiente
```bash
nmap -sV -sC --min-rate 5000 -n -Pn 172.17.0.2
```

Dándome como resultado los siguientes puertos abiertos
![Resultado del escaneo de puertos](./imagenes/Pasted%20image%2020261110002529.png)

| Puerto | Protocolo | Estado | Servicio | Versión                        |
| ------ | --------- | ------ | -------- | ------------------------------ |
| 22     | tcp       | open   | ssh      | OpenSSH 8.9p1                  |
| 80     | tcp       | open   | http     | Apache httpd 2.4.52 ((Ubuntu)) |
Con esto sabemos que tiene un puerto ssh expuesto y una pagina web a la que posteriormente analizaremos

## Análisis

Empezamos por la pagina web: 
![Pagina web](./imagenes/Pasted%20image%2020261110002745.png)

Como dice probamos con cualquier usuario en ssh
```
ssh cualquier_usuario@172.17.0.2
```

![](./imagenes/Pasted%20image%2020261110003117.png)

observamos que el sistema arroja un mensaje de bienvenida o un banner informativo que expone un usuario y contraseña válidos.

## Explotación

Aprovechando la información filtrada directamente por el servicio SSH, procedemos a realizar la autenticación legítima utilizando las credenciales obtenidas: `ssh usuario_valido@172.17.0.2`
![](./imagenes/Pasted%20image%2020261110003424.png)

En la cual encontraremos la flag dentro de user.txt
## Escalada de privilegios

Para escalar los privilegios lo primero que intente fue utilizar el comando `sudo -l` que no dejaba ya que el usuario no pertenecia a sudoers y atraves de la version de `sudo -V` tampoco encontré ninguna vulnerabilidad.

Una vez comprobado esto pasé a revisar los permisos especiales en binarios **SUID**:
```bash
find / -perm -4000 -type f 2>/dev/null
```
dándonos los siguientes resultados:
![](./imagenes/Pasted%20image%2020261110214062.png)

Y los revisamos con [GTFOBins](https://gtfobins.github.io/gtfobins/ruby) dando que el `bash` y el de `dash` son vulnerables a SUID para explotarlos utilizaremos los comandos indicados GTFOBins:
```bash
# Para bash
bash -p
# Para dash
dash -p
```

Cualquiera de las dos opciones nos eleva los privilegios pudiendo sacar la flag de root

![](./imagenes/Pasted%20image%2020261110214884.png)

## Flags o prueba de finalización

En esta maquina encontramos dos flags una de usuario normal en el directorio del usuario sin privilegios que se vio anteriormente y la flag de root esta en un archivo en el directorio de root 

## Mitigaciones y aprendizajes

- **Causa raíz:** 
	1. **Fuga de información en el servicio SSH:** Configuración insegura del servidor SSH (o mensajes de bienvenida/banner verbosos) que expone credenciales de usuario válidas al intentar realizar una conexión o inicio de sesión.
	2. **Mala configuración de permisos (SUID):** Asignación incorrecta del bit SUID (`-rwsr-xr-x`) a intérpretes de comandos del sistema operativo (`bash` y `dash`), permitiendo que cualquier usuario ejecute estos binarios heredando los privilegios del propietario (root).
- **Mitigación:**
	1. **Endurecimiento de SSH (SSH Hardening):** Desactivar banners dinámicos personalizados, mensajes MOTD informativos o configuraciones que revelen pistas sobre usuarios y contraseñas. Asegurarse de que el servicio responda de forma genérica ante intentos fallidos o conexiones arbitrarias.
	2. **Auditoría y corrección de binarios SUID:** Eliminar inmediatamente el bit SUID de intérpretes de comandos y shells del sistema (`bash`, `dash`) ejecutando comandos como `chmod u-s /bin/bash`. Los shells nunca deben tener permisos SUID activos.
- **Aprendizajes:**
	- **Reconocimiento interactivo:** Probar interacciones básicas contra los servicios (como intentar un login con credenciales arbitrarias o verificar el comportamiento del banner) puede revelar vectores de acceso inicial inesperados sin necesidad de herramientas ruidosas de fuerza bruta. 
	- **Peligro de los SUID en Shells:** Un binario SUID mal configurado que permita invocar una terminal interactiva (como `bash -p`) otorga control total del sistema de forma inmediata, siendo uno de los objetivos principales tras conseguir acceso a un usuario sin privilegios.
## Referencias

- GTFOBins (Bash SUID): https://gtfobins.github.io/gtfobins/bash/
- GTFOBins (Dash SUID): https://gtfobins.github.io/gtfobins/dash/