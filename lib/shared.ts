export const appName = 'HellDots';
export const appTagline =
  'Drop-in comment overlay for web apps. Click anywhere, leave a comment anchored to that element.';

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://helldots-docs.vercel.app';

/** The project itself — what the nav's GitHub icon and the issues link mean. */
export const gitConfig = {
  user: 'xKeCo',
  repo: 'helldots',
  branch: 'main',
};

/**
 * Where this site's MDX actually lives, which is *not* where the library lives.
 * The per-page "Open in GitHub" action opens the file you are reading, so it
 * has to point at the repository holding that file — aimed at `helldots` it
 * builds a `content/docs/…` path that does not exist there, and 404s.
 *
 * `null` hides the action entirely. `helldots-docs` is private today, and a
 * private repository answers an anonymous visitor with a 404 too — a dead link
 * is worse than no link. Fill this in the moment the source is public.
 */
export const docsSource: { user: string; repo: string; branch: string } | null = null;

/** The GitHub URL for one page's source file, or undefined when it has none. */
export function docsSourceUrl(pagePath: string): string | undefined {
  if (!docsSource) return undefined;

  const { user, repo, branch } = docsSource;
  return `https://github.com/${user}/${repo}/blob/${branch}/content/docs/${pagePath}`;
}

export const links = {
  github: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  npm: 'https://www.npmjs.com/package/helldots',
  issues: `https://github.com/${gitConfig.user}/${gitConfig.repo}/issues`,
};
