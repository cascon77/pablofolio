# Plantilla de writeup

Cada writeup se guarda como `index.md` dentro de una carpeta propia:

```text
src/content/hacking/<plataforma>/<slug>/index.md
```

Por ejemplo:

```text
src/content/hacking/dockerlabs/maquina-ejemplo/index.md
```

Las imágenes específicas del writeup pueden guardarse junto a `index.md`. La imagen
`public/og/default.png` también se puede mostrar en el cuerpo usando su ruta pública
`/og/default.png`, como en el ejemplo incluido abajo.

Copia esta plantilla y sustituye los valores de ejemplo:

Si prefieres ver un artículo ya redactado de principio a fin, consulta el
[writeup de ejemplo OSINT para un CTF ficticio](../src/content/hacking/ctf/ejemplo-osint/).

````markdown
---
title: "Nombre del reto o máquina"
description: "Resumen breve del reto y de los aspectos principales documentados en este writeup."
date: 2026-11-06
draft: true
# Para una portada optimizada, guarda una imagen junto a este index.md y usa una ruta relativa:
# cover: ./portada.png
# coverAlt: "Descripción accesible de la imagen de portada"
platform: dockerlabs
# difficulty: easy
# os: linux
topics: [enumeration, web, privesc]
tags: [dockerlabs, linux]
# Solo para máquinas de Hack The Box:
# machine: { name: "Nombre de la máquina", retired: true }
---

## Resumen

- **Plataforma:** DockerLabs
- **Reto/máquina:** Nombre del reto
- **Dificultad:** Fácil
- **Sistema:** Linux
- **Fecha:** AAAA-MM-DD

Describe brevemente el objetivo, el alcance y qué técnicas generales se exploran.

> Realizado únicamente en un laboratorio autorizado. No reutilices estas técnicas
> contra sistemas sin permiso explícito.

## Reconocimiento y enumeración

Anota el contexto inicial, los servicios o componentes observados y las hipótesis
que surjan. Incluye comandos relevantes y explica qué información aporta cada uno.

```text
# Comando utilizado
# Resultado relevante (redacta datos sensibles)
```

### Evidencia

Las imágenes de `public/` se referencian desde la raíz del sitio. Esta imagen de
ejemplo se sirve desde `public/og/default.png`:

![Imagen de ejemplo para documentar una evidencia](/og/default.png)

Para una captura propia, guárdala en una subcarpeta `imagenes/` junto a este
writeup y usa sintaxis Markdown con una ruta relativa, por ejemplo:
`![Descripción de la evidencia](./imagenes/evidencia-01.png)`. Añade siempre un
texto alternativo descriptivo; los embeds de Obsidian (`![[...]]`) no se muestran
en el sitio.

## Análisis

Explica los hallazgos que sean relevantes, cómo los validaste dentro del laboratorio
y qué impacto tienen en el contexto del reto. Evita incluir credenciales, tokens o
datos personales reales.

## Explotación

Documenta el procedimiento seguido paso a paso, incluyendo los comandos y las
respuestas importantes. Aclara las condiciones necesarias y limita la explicación
al entorno autorizado del laboratorio.

```text
# Comando o acción realizada
# Salida relevante
```

## Escalada de privilegios

Si el reto incluye esta etapa, describe las comprobaciones realizadas, el vector
identificado y cómo se verificó el resultado. Si no aplica, elimina esta sección.

## Flags o prueba de finalización

Indica dónde se encontró la prueba de finalización y cómo se validó. No publiques
flags de competiciones activas si sus reglas no lo permiten; puedes censurar el valor.

## Mitigaciones y aprendizajes

- **Causa raíz:** explica brevemente el problema o configuración relevante.
- **Mitigación:** describe cómo se corregiría o reduciría el riesgo.
- **Aprendizaje:** resume qué señales o técnicas te resultaron útiles.

## Referencias

- [Documentación o recurso utilizado](https://example.com)
````

## Metadatos válidos

- `platform`: `htb`, `tryhackme`, `thehackerlabs`, `dockerlabs`, `thepwnlab`,
  `ctf` u `otros`.
- `difficulty`: `very-easy`, `easy`, `medium`, `hard` o `insane` (Muy fácil, Fácil,
  Medio, Difícil o Insane). Solo se usa en laboratorios, no en CTF.
- `os`: `linux`, `windows` u `other`. Solo se usa en laboratorios, no en CTF.
- `topics`: `web`, `active-directory`, `privesc`, `enumeration`, `tools`, `network`,
  `exploitation`, `auth`, `cloud`, `forensics`, `crypto`, `osint`, `steganography`
  o `reversing`.
- `tags`: etiquetas libres en minúsculas, números y guiones.

Para publicar el artículo, cambia `draft: true` a `draft: false`. Los writeups de
HTB solo pueden publicarse cuando la máquina esté retirada.
