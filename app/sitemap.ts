import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { i18n, localizePath } from '@/lib/i18n';
import { siteUrl } from '@/lib/shared';

const abs = (path: string) => (path === '/' ? siteUrl : `${siteUrl}${path}`);

/** One entry per page per language, each pointing at its translations. */
function entry(path: string, priority: number): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    i18n.languages.map((lang) => [lang, abs(localizePath(lang, path))]),
  );

  return i18n.languages.map((lang) => ({
    url: abs(localizePath(lang, path)),
    changeFrequency: 'weekly',
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source
    .getPages(i18n.defaultLanguage)
    .map((page) => `/docs${page.slugs.length ? `/${page.slugs.join('/')}` : ''}`);

  return [
    ...entry('/', 1),
    ...pages.flatMap((path) => entry(path, path === '/docs' ? 0.9 : 0.7)),
  ];
}
