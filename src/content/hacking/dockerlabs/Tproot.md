---
title: Tproot
description: Writeup de Tproot.
date: 2026-11-10
draft: false
platform: dockerlabs
difficulty: very-easy
os: linux
topics:
  - enumeration
  - network
  - exploitation
tags:
  - dockerlabs
---
**Vulnerabilidades o técnicas principales:** CVE-2011-2523.


> Trabaja únicamente en el laboratorio autorizado. No reutilices estas técnicas
> contra sistemas sin permiso explícito.

## Reconocimiento y enumeración

Lo primero que realizamos es un reconocimiento. Para esto lo que hice fue hacer un escaneo de puertos para saber exactamente que puertos estaban abiertos y cuales son.

El comando que ejecute para realizar esto fue el siguiente
```bash
nmap -sV -sC --min-rate 5000 -n -Pn 172.17.0.2
```

![](EscaneoTProot.png)

| Puerto | Protocolo | Estado | Servicio | Versión                        |
| ------ | --------- | ------ | -------- | ------------------------------ |
| 21     | tcp       | open   | ftp      | vsftpd 2.3.4                   |
| 80     | tcp       | open   | http     | Apache httpd 2.4.58 ((Ubuntu)) |

## Análisis

Analice de primeras la web que no saqué nada de información debido a que es el index por defecto de apache.

Luego revise el vsftpd 2.3.4 tenía alguna vulnerabilidad ya que como vemos arriba en el analisis nos da que el usuario anon da un codigo 500... Lo primero que realice para ver si tiene alguna vulnerabilidad es lo siguiente:
```bash
searchsploit "vsftpd 2.3.4"
```
(Tambien podia haberlo buscado en internet y me saldría el CVE de la vulnerabilidad y con eso y atraves ya sea de github o Exploit-DB tendríamos el ejecutable)

![](BuscaVulnTproot.png)

Con esto comprobamos que tienen una vulnerabilidad

## Explotación

Una vez analizado y detectado esta vulnerabilidad vamos a explotarla, para esto tenemos que descargar el exploit
![](DescargaComandoTProot.png)

Yo antes de ejecutarlo siempre me gusta leerlo un poco por encima para saber que va a pedir y como funciona (sobretodo esto ultimo si nos descargamos exploits de github, esto lo recomiendo desde mi punto de vista de asegurarnos nuestra integridad de la seguridad)

Ejecutamos el exploit:
```bash
python2 49757.py 172.17.0.2
```

![](explotacionTProot.png)

Y entras siendo ya como usuario root

![](Pasted%20image%2020261110140101.png)

## Flags o prueba de finalización

Tras revisar las carpetas y buscar en los directorios encontré la flag de esta maquina.

![](flagTProot.png)

## Mitigaciones y aprendizajes

- **Causa raíz:**
	1. **Software comprometido (Backdoor):** La versión de distribución de `vsftpd 2.3.4` utilizada contenía una puerta trasera maliciosa introducida de forma anónima en los servidores de descarga oficiales en julio de 2011, la cual abría un puerto de escucha para ejecución remota de comandos si se enviaba un comodín específico (`:)`) en el usuario.
	2. **Uso de software obsoleto:** Emplear versiones antiguas de servicios de red que ya cuentan con parches de seguridad críticos públicos y conocidos desde hace más de una década.
- **Mitigación:**
	1. **Actualización del servicio:** Reemplazar inmediatamente `vsftpd` por versiones estables, actualizadas y firmadas oficialmente por los repositorios de confianza de la distribución.
	2. **Segmentación y cortafuegos:** Limitar el acceso al puerto FTP (puerto 21) únicamente a las subredes o direcciones IP autorizadas, evitando exponer servicios de transferencia de archivos directamente a redes públicas o no confiables.
- **Aprendizajes:**
	- Este laboratorio me sirvió para entender de primera mano cómo funcionan las vulnerabilidades históricas de tipo *backdoor* en la cadena de suministro de software y por qué los sistemas desactualizados son tan peligrosos.

## Referencias

- CVE-2011-2523 (NVD Details): https://nvd.nist.gov/vuln/detail/CVE-2011-2523
- Exploit-DB (vsftpd 2.3.4 - Backdoor Command Execution): https://www.exploit-db.com/exploits/49757