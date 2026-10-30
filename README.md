# [jeanpan.github.io](https://jeanpan.github.io/)

Jean Pan 的個人網站，用 [Astro](https://astro.build/) 建置。

## 開發

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # 輸出到 dist/
npm run check    # 型別檢查
```

## 寫文章

文章放在 `src/content/blog/<lang>/<slug>.md`。同一篇的中英文版本用相同檔名：

```
src/content/blog/zh/my-post.md   →  /zh/writing/my-post/
src/content/blog/en/my-post.md   →  /en/writing/my-post/
```

Frontmatter：

```yaml
---
title: 文章標題
description: 一句話摘要（選填）
date: 2026-10-29
emoji: 🌱            # 選填，顯示在標題前面
tags: [web, 生活]     # 選填
draft: true          # 選填，草稿只在 npm run dev 時看得到
---
```

文章有三個以上的 `##` 標題時，會自動顯示目錄。

## 部署

push 到 `master` 後，GitHub Actions 會自動 build 並部署到 GitHub Pages。

## 致謝

會動的 emoji 來自 [Google Noto Animated Emoji](https://googlefonts.github.io/noto-emoji-animation/)（CC BY 4.0）。
favicon 是 [Noto Emoji](https://github.com/googlefonts/noto-emoji) 的 👩🏻‍💻（Apache License 2.0）。
