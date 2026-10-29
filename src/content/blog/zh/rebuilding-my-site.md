---
title: 十年後，重寫我的個人網站
description: 從 Gulp 到 Astro，以及我為什麼想重新開始寫字。
date: 2026-10-29
emoji: 🌱
tags: [astro, web, 生活]
---

舊的網站是很多年前用 Gulp 拼起來的：一張照片、兩段自我介紹，就這樣放了好幾年。自介裡寫的公司和城市早就不一樣了，網站卻一直停在那裡。

這次想要的東西很簡單：一個安靜的地方，可以放下自己的想法。

> 少即是多。留白也是一種內容。

## 為什麼選 Astro

[Astro](https://astro.build/) 預設只輸出靜態 HTML，不會送多餘的 JavaScript 到瀏覽器。對一個以文字為主的網站來說，這正是我要的。

每篇文章就是一個 Markdown 檔，寫完 push 就上線：

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

## 接下來

希望自己可以固定寫一點東西，記錄做過的專案、學到的東西，以及生活中的大小事。
