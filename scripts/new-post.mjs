#!/usr/bin/env node
// Uso: npm run new-post -- <htb|tryhackme|ctf|herramientas> <slug> "Título del artículo"
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const map = { htb: 'htb', tryhackme: 'tryhackme', ctf: 'ctf', herramientas: 'otros' };
const [dir, slug, ...rest] = process.argv.slice(2);
const title = rest.join(' ');

if (!map[dir] || !/^[a-z0-9-]+$/.test(slug ?? '') || !title) {
  console.error('Uso: npm run new-post -- <' + Object.keys(map).join('|') + '> <slug-en-minusculas> "Título"');
  process.exit(1);
}
const folder = `src/content/hacking/${dir}/${slug}`;
if (existsSync(folder)) { console.error(`Ya existe: ${folder}`); process.exit(1); }
mkdirSync(folder, { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const machine = dir === 'htb' ? 'machine: { name: "", retired: true }\n' : '';
writeFileSync(`${folder}/index.md`, `---
title: ${JSON.stringify(title)}
description: ""            # 20-200 caracteres, se usa en buscadores y redes
date: ${today}
draft: true                # pasa a false para publicar
# cover: ./cover.png       # opcional; si lo pones, coverAlt es obligatorio
# coverAlt: ""
platform: ${map[dir]}
# difficulty: easy         # solo laboratorios: easy | medium | hard | insane
# os: linux                # solo laboratorios: linux | windows | other
topics: []                 # web, active-directory, privesc, enumeration, tools, network, forensics, crypto, osint, steganography, reversing
tags: []                   # libres: minúsculas y guiones
${machine}---

## Resumen

## Enumeración

## Explotación

## Escalada de privilegios

## Conclusiones
`);
console.log(`✓ Creado ${folder}/index.md (draft: true)`);
