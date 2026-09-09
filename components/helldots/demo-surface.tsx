'use client';

import { useHellDots } from './provider';
import { getDictionary } from '@/lib/dictionaries';
import { cn } from '@/lib/cn';

/**
 * A stand-in product UI. It exists so there is something worth pointing at:
 * a comment anchored to a real button in a real card demonstrates the anchor,
 * the fingerprint and the screenshot far better than a paragraph of prose can.
 */
export function DemoSurface() {
  const { locale } = useHellDots();
  const t = getDictionary(locale).demo;

  return (
    <section
      id="plans"
      className="not-prose my-6 rounded-xl border border-fd-border bg-fd-background p-5"
    >
      <header className="mb-5">
        <p className="text-xs font-medium uppercase tracking-wide text-fd-primary">{t.eyebrow}</p>
        <h3 className="mt-1 text-lg font-semibold">{t.heading}</h3>
        <p className="mt-1 text-sm text-fd-muted-foreground">{t.note}</p>
      </header>

      <div className="grid gap-3 md:grid-cols-3">
        {t.plans.map((plan, index) => {
          const featured = index === 1;

          return (
            <div
              key={plan.name}
              className={cn(
                'card flex flex-col rounded-lg border p-4',
                featured
                  ? 'border-fd-primary/50 bg-fd-primary/5 ring-1 ring-fd-primary/20'
                  : 'border-fd-border bg-fd-card',
              )}
            >
              <div className="flex items-baseline justify-between">
                <h4 className="text-sm font-semibold">{plan.name}</h4>
                {featured && (
                  <span className="rounded-full bg-fd-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fd-primary-foreground">
                    {t.popular}
                  </span>
                )}
              </div>
              <p className="mt-2">
                <span className="text-2xl font-bold tabular-nums">{plan.price}</span>
                <span className="text-sm text-fd-muted-foreground">{t.perMonth}</span>
              </p>
              <p className="mt-1 text-xs text-fd-muted-foreground">{plan.note}</p>
              <ul className="mt-3 flex-1 space-y-1.5 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-fd-muted-foreground">
                    <span aria-hidden className="text-fd-primary">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                data-plan={plan.name.toLowerCase()}
                className={cn(
                  'cta mt-4 h-9 rounded-lg text-sm font-medium transition-colors',
                  featured
                    ? 'bg-fd-primary text-fd-primary-foreground hover:opacity-90'
                    : 'border border-fd-border bg-fd-background hover:bg-fd-accent',
                )}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
