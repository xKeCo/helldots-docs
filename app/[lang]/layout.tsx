import { RootProvider } from 'fumadocs-ui/provider/next';
import '../global.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { HellDotsProvider } from '@/components/helldots/provider';
import { translations } from '@/lib/layout.shared';
import { getDictionary } from '@/lib/dictionaries';
import { i18n, localizePath } from '@/lib/i18n';
import { appName, links, siteUrl } from '@/lib/shared';

const inter = Inter({
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = getDictionary(lang);
  const title = `${appName} — ${dict.titleSuffix}`;
  const image = localizePath(lang, '/og/image.png');

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${appName} — ${dict.titleSuffix}`,
      template: `%s — ${appName}`,
    },
    description: dict.tagline,
    applicationName: appName,
    keywords: dict.keywords,
    authors: [{ name: 'xKeCo', url: links.github }],
    creator: 'xKeCo',
    alternates: {
      canonical: localizePath(lang, '/'),
      languages: {
        ...Object.fromEntries(i18n.languages.map((code) => [code, localizePath(code, '/')])),
        'x-default': localizePath(i18n.defaultLanguage, '/'),
      },
    },
    openGraph: {
      title,
      description: dict.tagline,
      url: localizePath(lang, '/'),
      siteName: `${appName} docs`,
      locale: dict.ogLocale,
      alternateLocale: i18n.languages
        .filter((code) => code !== lang)
        .map((code) => getDictionary(code).ogLocale),
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: dict.tagline,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <html lang={dict.htmlLang} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider i18n={i18nProvider(translations, lang)}>
          {/*
            The docs run the library they document: every page of this site has
            a live HellDots overlay on it, persisting to your browser — and
            rendered in the same language as the page around it, since HellDots
            ships both `en` and `es`.
          */}
          <HellDotsProvider locale={dict.widgetLocale}>{children}</HellDotsProvider>
        </RootProvider>
      </body>
    </html>
  );
}
