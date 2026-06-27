import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    date: z.coerce.date().optional(),
    blurb: z.string().optional(),
    // One string or many — each becomes a paragraph.
    story: z.union([z.string(), z.array(z.string())]).optional(),
    // A line wrapped in em-dashes (— ... —) renders as a section header.
    ingredients: z.array(z.string()).optional(),
    steps: z.array(z.string()).optional(),
    sources: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .optional(),
  }),
});

export const collections = { recipes };
