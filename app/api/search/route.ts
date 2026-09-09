import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

/**
 * The loader already carries the i18n config, so results are filtered to the
 * caller's locale on their own — a Spanish search never surfaces English
 * pages. Orama's default tokenizer is multilingual; `localeMap` is deprecated
 * and would only split this into one database per language.
 */
export const { GET } = createFromSource(source);
