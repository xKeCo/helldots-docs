export const appName = 'HellDots';
export const appTagline =
  'Drop-in comment overlay for web apps. Click anywhere, leave a comment anchored to that element.';

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://helldots-docs.vercel.app';

export const gitConfig = {
  user: 'xKeCo',
  repo: 'helldots',
  branch: 'main',
};

export const links = {
  github: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  npm: 'https://www.npmjs.com/package/helldots',
  issues: `https://github.com/${gitConfig.user}/${gitConfig.repo}/issues`,
};
