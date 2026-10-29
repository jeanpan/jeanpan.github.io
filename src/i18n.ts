import { getCollection, type CollectionEntry } from 'astro:content';

export const langs = ['zh', 'en'] as const;
export type Lang = (typeof langs)[number];

export const htmlLang: Record<Lang, string> = { zh: 'zh-Hant', en: 'en' };

export const otherLang = (lang: Lang): Lang => (lang === 'zh' ? 'en' : 'zh');

export const ui = {
  zh: {
    siteDescription: '軟體工程師 Jean Pan 的個人網站，記錄做過的專案、學到的東西，以及生活中的大小事。',
    navHome: '首頁',
    navWriting: '文章',
    navAbout: '關於',
    switchLang: 'EN',
    switchLangLabel: 'Read in English',
    toggleTheme: '切換深淺色',
    recentWriting: '最近的文章',
    allWriting: '所有文章 »',
    noPosts: '還沒有文章，快寫好了。',
    readingTime: (min: number) => `閱讀約 ${min} 分鐘`,
    toc: '目錄',
    prev: '上一篇',
    next: '下一篇',
    taggedWith: (tag: string) => `標籤：${tag}`,
    footerPlace: '寫於東京',
    notFound: '找不到這一頁。',
    backHome: '回到首頁 »',
  },
  en: {
    siteDescription: 'The personal site of Jean Pan, a software engineer, writing about the projects I build, the things I learn, and the big and small moments of life.',
    navHome: 'Home',
    navWriting: 'Writing',
    navAbout: 'About',
    switchLang: '中',
    switchLangLabel: '切換成中文',
    toggleTheme: 'Toggle dark mode',
    recentWriting: 'Recent writing',
    allWriting: 'All writing »',
    noPosts: 'Nothing here yet. Soon.',
    readingTime: (min: number) => `${min} min read`,
    toc: 'Contents',
    prev: 'Previous',
    next: 'Next',
    taggedWith: (tag: string) => `Tagged “${tag}”`,
    footerPlace: 'Built in Tokyo',
    notFound: 'This page does not exist.',
    backHome: 'Back to home »',
  },
} as const;

export const t = (lang: Lang) => ui[lang];

export const langPaths = () => langs.map((lang) => ({ params: { lang } }));

export type Post = CollectionEntry<'blog'>;

export const postLang = (post: Post) => post.id.split('/')[0] as Lang;
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');
export const postUrl = (post: Post) => `/${postLang(post)}/writing/${postSlug(post)}/`;

// 依日期排序，新的在前；正式 build 時不包含草稿
export async function getPosts(lang: Lang) {
  const posts = await getCollection(
    'blog',
    (post) => postLang(post) === lang && (import.meta.env.DEV || !post.data.draft),
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date, style: 'short' | 'full' = 'full') {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return style === 'short' ? `${m}.${d}` : `${y}.${m}.${d}`;
}

// 中文以字數計（每分鐘約 400 字），英文以單字計（每分鐘約 220 字）
export function readingMinutes(body: string, lang: Lang) {
  const text = body.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '');
  const count =
    lang === 'zh'
      ? (text.match(/[一-鿿]/g) ?? []).length + (text.match(/[a-zA-Z]+/g) ?? []).length
      : (text.match(/\S+/g) ?? []).length;
  return Math.max(1, Math.round(count / (lang === 'zh' ? 400 : 220)));
}
