import { getPageImageUrl, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { appName, docsSourceUrl, siteUrl } from '@/lib/shared';
import { getDictionary } from '@/lib/dictionaries';
import { i18n, localizePath } from '@/lib/i18n';

export default async function Page(props: PageProps<'/[lang]/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <script
        type="application/ld+json"
        // Static, build-time JSON from our own frontmatter; `<` is escaped so a
        // title can never close the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: page.data.title,
            description: page.data.description,
            inLanguage: params.lang,
            url: `${siteUrl}${page.url}`,
            image: `${siteUrl}${getPageImageUrl(page).url}`,
            isPartOf: { '@type': 'WebSite', name: `${appName} docs`, url: siteUrl },
            publisher: { '@type': 'Person', name: 'xKeCo' },
          }).replace(/</g, '\\u003c'),
        }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={docsSourceUrl(page.path)} />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams('slug', 'lang');
}

export async function generateMetadata(
  props: PageProps<'/[lang]/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  // Per-page alternates, not the site-root pair the layout declares: a search
  // engine on the Spanish captures page should be pointed at the English
  // captures page, not at the English home.
  const path = `/docs${page.slugs.length ? `/${page.slugs.join('/')}` : ''}`;

  const dict = getDictionary(params.lang);
  const image = getPageImageUrl(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
      languages: {
        ...Object.fromEntries(i18n.languages.map((code) => [code, localizePath(code, path)])),
        'x-default': localizePath(i18n.defaultLanguage, path),
      },
    },
    // `openGraph` replaces the layout's object rather than merging into it, so
    // everything a card needs has to be restated here, not just the image.
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      siteName: `${appName} docs`,
      locale: dict.ogLocale,
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: page.data.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [image],
    },
  };
}
