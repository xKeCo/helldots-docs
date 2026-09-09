import Link from 'next/link';
import { ArrowRight, Camera, Crosshair, Database, Keyboard, ListChecks, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HellDotsMark } from '@/components/brand';
import { getDictionary } from '@/lib/dictionaries';
import { localizePath } from '@/lib/i18n';
import { appName, links } from '@/lib/shared';

const icons: Record<string, LucideIcon> = {
  anchored: Crosshair,
  capture: Camera,
  store: Database,
  triage: ListChecks,
  team: Users,
  unobtrusive: Keyboard,
};

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const t = getDictionary(lang).home;
  const href = (path: string) => localizePath(lang, path);

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-28">
        <Link
          href={href('/docs/playground')}
          className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-fd-primary opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-fd-primary" />
          </span>
          {t.badge}
          <ArrowRight className="size-3" />
        </Link>

        <h1 className="mt-6 flex flex-wrap items-center justify-center gap-3 text-4xl font-bold tracking-tight sm:text-6xl">
          <HellDotsMark className="size-10 sm:size-14" />
          {appName}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-fd-muted-foreground">
          {t.lede}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={href('/docs')}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-fd-primary px-5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.readDocs}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={href('/docs/playground')}
            className="inline-flex h-10 items-center rounded-lg border border-fd-border bg-fd-card px-5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            {t.playground}
          </Link>
        </div>

        <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-xl border border-fd-border bg-fd-card text-left">
          <div className="flex items-center gap-1.5 border-b border-fd-border px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-2 font-mono text-xs text-fd-muted-foreground">app.js</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
            <code>
              <span className="text-fd-muted-foreground">{'// npm install helldots'}</span>
              {'\n'}
              <span className="text-purple-600 dark:text-purple-400">import</span>
              {' { createCommentOverlay } '}
              <span className="text-purple-600 dark:text-purple-400">from</span>
              <span className="text-emerald-600 dark:text-emerald-400">{" 'helldots'"}</span>;{'\n\n'}
              <span className="text-blue-600 dark:text-blue-400">createCommentOverlay</span>
              {'({\n  user: { name: '}
              <span className="text-emerald-600 dark:text-emerald-400">{"'Ana'"}</span>
              {' },\n  persistence: '}
              <span className="text-emerald-600 dark:text-emerald-400">{"'localStorage'"}</span>
              {',\n});'}
            </code>
          </pre>
        </div>

        <p className="mt-4 text-sm text-fd-muted-foreground">
          {t.integrationNote}{' '}
          <kbd className="rounded border border-fd-border bg-fd-muted px-1.5 py-0.5 text-xs">
            Alt
          </kbd>{' '}
          +{' '}
          <kbd className="rounded border border-fd-border bg-fd-muted px-1.5 py-0.5 text-xs">
            C
          </kbd>{' '}
          {t.toggles}
        </p>
      </section>

      <section className="border-t border-fd-border bg-fd-muted/30">
        <div className="mx-auto grid w-full max-w-5xl gap-px overflow-hidden px-6 py-16 md:grid-cols-2 lg:grid-cols-3">
          {t.features.map((feature) => {
            const Icon = icons[feature.key] ?? Crosshair;

            return (
              <div key={feature.key} className="p-5">
                <Icon className="size-5 text-fd-primary" />
                <h2 className="mt-3 font-semibold">{feature.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">
                  {feature.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold">{t.closingTitle}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-fd-muted-foreground">{t.closingBody}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <a
            href={links.github}
            className="rounded-lg border border-fd-border px-4 py-2 transition-colors hover:bg-fd-accent"
          >
            GitHub
          </a>
          <a
            href={links.npm}
            className="rounded-lg border border-fd-border px-4 py-2 transition-colors hover:bg-fd-accent"
          >
            npm
          </a>
          <Link
            href={href('/docs/api/options')}
            className="rounded-lg border border-fd-border px-4 py-2 transition-colors hover:bg-fd-accent"
          >
            {t.apiReference}
          </Link>
        </div>
      </section>
    </main>
  );
}
