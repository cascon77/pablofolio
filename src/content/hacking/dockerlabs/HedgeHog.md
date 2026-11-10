---
title: HedgeHog
description: Writeup de HedgeHog.
date: 2026-11-10
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
![](EscaneoHedgeHog.png)

| Puerto | Protocolo | Estado | Servicio | Versión                        |
| ------ | --------- | ------ | -------- | ------------------------------ |
| 22     | tcp       | open   | ssh      | OpenSSH 9.6p1                  |
| 80     | tcp       | open   | http     | Apache httpd 2.4.58 ((Ubuntu)) |
Con esto sabemos que tiene un puerto ssh expuesto y una pagina web a la que posteriormente analizaremos

## Análisis

Cuando entramos en la pagina web lo que vemos es escrito "*tails*" estuve dándole vueltas a que podría significar y llegué a la conclusión de que podía ser un usuario y que me avisase de empezar al revés la lista de `rockyou.txt`
![](AnalisisHedghog.png)

## Explotación

Leí al revés el archivo `rockyou.txt`, le quite los espacios en blanco y lo guarde en un archivo llamado `final.txt`
```bash
tac /usr/share/wordlists/rockyou.txt | tr -d ' ' > final.txt
```

Luego empecé el ataque de fuerza bruta con este diccionario
```bash
hydra -l tails -P final.txt ssh://172.17.0.2 -t4
```

Dando como resultado:
![](HydraHedgehog.png)

## Escalada de privilegios

Revisamos los usuarios que hay en la maquina:
![](usuariosHedgedHog.png)

Y luego vemos si tenemos permisos de administrador por una mala configuración del sudo con el comando `sudo -l`
![](noSudoUserHedgeHog.png)

Vemos que tengo un usuario que puede utilizar sudo sin contraseña asi que vamos a elevar los privilegios:

```bash
sudo -u sonic bash
```

con esto nos convertimos en el usuario sonic en el cual navegando por su carpeta personal encontramos un archivo llamado contraseña en la cual nos proporciona su contraseña

## Flags o prueba de finalización

![](pruebasHedgeHog.png)

## Mitigaciones y aprendizajes

- **Causa raíz:**
	1. Contraseña insegura
	2. Tener información privada como un usuario colgado en la web
- **Mitigación:**
	1. Aumentar la complejidad en las contraseñas
	2. Retirar toda la información sensible de la web
