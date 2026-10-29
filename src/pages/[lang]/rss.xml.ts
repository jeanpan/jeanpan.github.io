import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, langPaths, postUrl, t, type Lang } from '../../i18n';

export const getStaticPaths = langPaths;

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const posts = await getPosts(lang);
  return rss({
    title: 'Jean Pan',
    description: t(lang).siteDescription,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: `<language>${lang === 'zh' ? 'zh-TW' : 'en'}</language>`,
  });
}
