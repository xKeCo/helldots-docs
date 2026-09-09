import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';
import { docsContentRoute, docsRoute } from '@/lib/shared';

const localeMiddleware = createI18nMiddleware(i18n);

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

/**
 * Split a leading locale segment off the path, if there is one. Both rewrites
 * below are written against the unprefixed route, and `/es/docs/x` has to hit
 * the same rule `/docs/x` does.
 */
function splitLocale(pathname: string): { locale: string; rest: string } {
  const [, first, ...others] = pathname.split('/');

  return (i18n.languages as readonly string[]).includes(first)
    ? { locale: first, rest: `/${others.join('/')}` }
    : { locale: i18n.defaultLanguage, rest: pathname };
}

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const { locale, rest } = splitLocale(request.nextUrl.pathname);

  // `/docs/x.md` — an explicit request for the source, whatever the headers say.
  const suffixed = rewriteSuffix(rest);
  if (suffixed) {
    return NextResponse.rewrite(new URL(`/${locale}${suffixed}`, request.nextUrl));
  }

  // `/docs/x` with an Accept header that prefers Markdown. The same URL then
  // has two representations, which is what `Vary` is for.
  if (isMarkdownPreferred(request)) {
    const negotiated = rewriteDocs(rest);

    if (negotiated) {
      return NextResponse.rewrite(new URL(`/${locale}${negotiated}`, request.nextUrl), {
        headers: { Vary: 'Accept' },
      });
    }
  }

  // Otherwise it is an ordinary page: add the hidden default locale, or send
  // an explicit `/en` back to its canonical prefix-free URL.
  return localeMiddleware(request, event);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
