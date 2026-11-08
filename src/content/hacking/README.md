# Hack Blog

Un artículo = un fichero `.md`, o una carpeta con `index.md` y sus imágenes.
Crea uno con `npm run new-post`, usa la [plantilla de writeup](../../../docs/WRITEUP-TEMPLATE.md)
o consulta el [writeup CTF de ejemplo](./ctf/ejemplo-osint/).

## Plantillas de Obsidian

Las plantillas de Templater están en `src/content/templates/`, fuera de esta colección
de artículos. En Obsidian, configura `templates` como **Template folder location**
en los ajustes de Templater. Después, usa **Templater: Create new note from template**
y elige `Plantilla máquina` o `Plantilla CTF`. Cada plantilla permite elegir una
carpeta existente bajo `hacking/` o indicar una ruta nueva; si hace falta, crea las
carpetas y mueve allí la nota. La plantilla de máquina también nombra el archivo con
el nombre de máquina indicado. Para publicarla en el sitio, usa `index.md` dentro de
una carpeta propia.

Ambas plantillas generan un borrador (`draft: true`) con metadatos compatibles con el
sitio. La de máquinas incluye selectores de plataforma, sistema operativo y
dificultad (Muy fácil, Fácil, Medio, Difícil o Insane); las claves de temas y las
etiquetas sirven para clasificar y encontrar la nota. Cada pregunta explica qué dato
introducir; la ficha no repite en el cuerpo el título ni los metadatos de la máquina.
La de CTF permite elegir la plataforma y modalidad del evento, y pregunta por el
equipo, los resultados y los retos sin repetir el nombre de la competición. Revisa las
reglas de la plataforma antes de publicar cualquier writeup.
