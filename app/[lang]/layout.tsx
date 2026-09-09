import { RootProvider } from 'fumadocs-ui/provider/next';
import '../global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { HellDotsProvider } from '@/components/helldots/provider';
import { translations } from '@/lib/layout.shared';
import { getDictionary } from '@/lib/dictionaries';
import { i18n, localizePath } from '@/lib/i18n';
import { appName, siteUrl } from '@/lib/shared';

const inter = Inter({
  subsets: ['latin'],
});

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${appName} — ${dict.titleSuffix}`,
      template: `%s — ${appName}`,
    },
    description: dict.tagline,
    alternates: {
      canonical: localizePath(lang, '/'),
      languages: Object.fromEntries(
        i18n.languages.map((code) => [code, localizePath(code, '/')]),
      ),
    },
    openGraph: {
      title: appName,
      description: dict.tagline,
      url: localizePath(lang, '/'),
      siteName: `${appName} docs`,
      locale: dict.htmlLang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: appName,
      description: dict.tagline,
    },
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
