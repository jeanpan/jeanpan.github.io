// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { codeThemeLight } from './config/code-theme.mjs';

export default defineConfig({
  site: 'https://jeanpan.github.io',
  integrations: [
    // 根目錄只是依語言轉址的頁面，不放進 sitemap
    sitemap({ filter: (page) => page !== 'https://jeanpan.github.io/' }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: codeThemeLight, dark: 'everforest-dark' },
      defaultColor: false,
    },
  },
});
