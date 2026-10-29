---
title: Rebuilding my personal site, ten years later
description: From Gulp to Astro, and why I want to start writing again.
date: 2026-10-29
emoji: 🌱
tags: [astro, web, life]
---

My old site was stitched together with Gulp years ago: one photo and two paragraphs about me, and it stayed that way for a long time. The company and city in that intro changed long ago, but the site never did.

This time I wanted something simple: a quiet place to put my thoughts down.

> Less is more. White space is content too.

## Why Astro

[Astro](https://astro.build/) ships static HTML by default and doesn't send extra JavaScript to the browser. For a site that is mostly text, that's exactly what I want.

Each post is a Markdown file. Write it, push it, and it's live:

```ts
// src/content.config.ts
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

## What's next

I hope to write regularly about the projects I build, the things I learn, and the big and small moments of life.
