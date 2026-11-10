import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { platforms, difficulties, systems, topics, keys } from './config/taxonomy';

const hacking = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/README.md'], base: './src/content/hacking' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        description: z.string().max(200).default(''),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),
        draft: z.boolean().default(true),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        platform: z.enum(keys(platforms)),
        difficulty: z.enum(keys(difficulties)).optional(),
        os: z.enum(keys(systems)).optional(),
        topics: z.array(z.enum(keys(topics))).default([]),
        tags: z.array(z.string().regex(/^[a-z0-9-]+$/, 'etiqueta: minúsculas, números y guiones')).default([]),
        machine: z.object({ name: z.string(), retired: z.boolean() }).optional(),
      })
      .superRefine((d, ctx) => {
        if (d.cover && !d.coverAlt) ctx.addIssue({ code: 'custom', message: 'coverAlt es obligatorio si hay cover (accesibilidad)', path: ['coverAlt'] });
        if (d.platform === 'ctf' && d.difficulty) ctx.addIssue({ code: 'custom', message: 'difficulty solo aplica a laboratorios, no a CTF', path: ['difficulty'] });
        if (d.platform === 'ctf' && d.os) ctx.addIssue({ code: 'custom', message: 'os solo aplica a laboratorios, no a CTF', path: ['os'] });
        // HTB solo permite publicar writeups de máquinas retiradas.
        if (!d.draft && d.platform === 'htb' && d.machine && !d.machine.retired)
          ctx.addIssue({ code: 'custom', message: 'Máquina HTB activa: no publiques el writeup (machine.retired debe ser true)', path: ['machine', 'retired'] });
      }),
});

// El Homelab Blog NO está registrado todavía (ver docs/FUTURE-HOMELAB.md).
export const collections = { hacking };
