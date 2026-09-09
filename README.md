# HellDots documentation

The documentation site for [HellDots](https://github.com/xKeCo/helldots) — a
drop-in comment overlay for web apps — built with
[Fumadocs](https://fumadocs.dev) on Next.js.

The site runs the library it documents. Every page has a live `CommentOverlay`
mounted in the root layout with `persistence: "localStorage"`, so a visitor can
leave a comment on the docs themselves and find it there on their next visit.

It ships in **English and Spanish**. English keeps the bare URLs
(`/docs/guides/captures`); Spanish sits under `/es`.

## Development

```bash
pnpm install
pnpm dev
```

The site is at `http://localhost:3000`. Content is MDX under `content/docs`;
edits hot-reload.

```bash
pnpm build        # production build — also validates every MDX page
pnpm types:check  # next typegen && tsc --noEmit
```

## Layout

| Path                              | What it is                                                    |
| --------------------------------- | ------------------------------------------------------------- |
| `content/docs/**`                 | The documentation, as MDX. `meta.json` files order the sidebar |
| `lib/i18n.ts`                     | Locale config, and the helpers that prefix a path              |
| `lib/dictionaries.ts`             | UI strings outside MDX — nav, landing page, control panel      |
| `lib/source.ts`                   | Fumadocs source — `defineDocs` + the loader                    |
| `lib/shared.ts`                   | Site name, routes, GitHub and npm links                        |
| `lib/layout.shared.tsx`           | Fumadocs chrome translations, and nav options per locale       |
| `components/helldots/provider.tsx`| Mounts the live overlay; the SPA re-anchoring lives here       |
| `components/helldots/controls.tsx`| The playground's control panel, all public API                 |
| `components/helldots/demo-surface.tsx` | A mock product UI worth leaving comments on              |
| `components/mdx.tsx`              | MDX component registry                                         |
| `app/[lang]/(home)/page.tsx`      | Landing page                                                   |
| `proxy.ts`                        | Markdown content negotiation, then the locale middleware       |
| `app/global.css`                  | Tailwind + Fumadocs preset, and the accent taken from the widget |

## Adding a page

Drop an `.mdx` file into `content/docs` (or a subfolder) with frontmatter:

```mdx
---
title: My page
description: One sentence, used for search and the OG image.
icon: Sparkles
---
```

`icon` is any [Lucide](https://lucide.dev) name — the `lucideIconsPlugin` in
`lib/source.ts` resolves it. Then add the file's slug to the relevant
`meta.json` to place it in the sidebar; a page missing from `pages` still
builds, it just sorts by path.

## Translating

The parser is `dot`: a translation is the same filename with the locale before
the extension. `captures.mdx` is English, `captures.es.mdx` is Spanish, and the
same goes for `meta.json` / `meta.es.json`.

Add the slug to **both** `meta.json` files — the sidebar order is per language.
A page with no translation falls back to English rather than 404ing, so a
partial translation is a valid state to ship.

Two things to watch in Spanish MDX:

- **Links need the `/es` prefix.** `/es/docs/guides/captures`, not
  `/docs/guides/captures` — the latter is a real URL, it just goes to the
  English page.
- **Anchors keep their accents.** The slugger does not strip them, so
  `## Cambiar imágenes por URLs` is `#cambiar-imágenes-por-urls`. Guessing the
  unaccented spelling silently produces a dead link.

UI strings outside MDX live in `lib/dictionaries.ts`; Fumadocs' own chrome (the
search dialog, the table of contents, the theme switcher) is translated in
`lib/layout.shared.tsx`.

### The widget follows the page

HellDots ships `en` and `es` of its own, so the overlay is constructed with the
page's locale and its toolbar reads **Comentar / Bandeja** on the Spanish side.
The library takes its locale at construction and exposes no setter, so `locale`
is a dependency of the mount effect: switching language rebuilds the widget.
Nothing is lost — localStorage mode reloads the comments on the way back up.

## The live widget

`HellDotsProvider` is mounted once in `app/layout.tsx`. Three things it does
that any App Router integration needs:

- imports `helldots` lazily inside the effect, so it stays out of the first payload;
- guards the async mount with a `cancelled` flag and `cleanup()`, for React's development double-mount;
- calls `notifyNavigation()` after each `pathname` change, scheduled with a `requestAnimationFrame` pair **and** a 150 ms deadline — a hidden tab never paints, so rAF alone would never fire there.

It also assigns the instance to `window.helldots`, deliberately: the playground
page tells readers to drive the API from their console. The library itself puts
nothing on `window`.

## Deploying

Any Next.js host. On Vercel the defaults are correct; set
`NEXT_PUBLIC_SITE_URL` to the canonical origin so OG images and metadata
resolve against it.

## License

MIT, matching the library.
