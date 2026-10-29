import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 文章放在 src/content/blog/<lang>/<slug>.md
// 同一篇文章的中英文版本用相同的檔名，例如 zh/hello.md 和 en/hello.md
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // 顯示在文章列表標題前面的 emoji
    emoji: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
