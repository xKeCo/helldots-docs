import { ImageResponse } from 'next/og';
import { OgImage, ogSize } from '@/components/og-image';
import { getDictionary } from '@/lib/dictionaries';
import { appName } from '@/lib/shared';
import { i18n } from '@/lib/i18n';

export const revalidate = false;

/**
 * The landing page's social card. A plain route rather than Next's
 * `opengraph-image` file convention: that one resolves its URL against the
 * request host, and puts an `/en` prefix on a locale the site hides.
 */
export async function GET(_req: Request, { params }: RouteContext<'/[lang]/og/image.png'>) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return new ImageResponse(
    <OgImage title={appName} description={dict.tagline} eyebrow={dict.titleSuffix} />,
    ogSize,
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
