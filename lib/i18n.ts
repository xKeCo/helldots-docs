import { defineI18n } from 'fumadocs-core/i18n';

/**
 * English keeps the bare URLs it already had — `/docs/guides/captures` — and
 * Spanish sits under `/es`. `hideLocale: "default-locale"` is what buys that:
 * a request with no prefix is rewritten to the default language, and an
 * explicit `/en` is redirected back to the canonical bare path so the two
 * spellings never both exist.
 */
export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'es'],
  hideLocale: 'default-locale',
});

export type Locale = (typeof i18n.languages)[number];

/** The URL prefix for a locale — empty for the default one. */
export function localePrefix(locale: string | undefined): string[] {
  return locale && locale !== i18n.defaultLanguage ? [locale] : [];
}

/** Prefix an app-absolute path with the locale, when it needs one. */
export function localizePath(locale: string | undefined, path: string): string {
  const prefix = localePrefix(locale);
  return prefix.length ? `/${prefix[0]}${path}` : path;
}
