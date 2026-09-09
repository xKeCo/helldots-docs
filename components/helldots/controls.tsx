'use client';

import { useEffect, useState } from 'react';
import { useHellDots } from './provider';
import { getDictionary } from '@/lib/dictionaries';
import { cn } from '@/lib/cn';

function Button({
  className,
  variant = 'secondary',
  ...props
}: React.ComponentProps<'button'> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-9 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' &&
          'border-transparent bg-fd-primary text-fd-primary-foreground hover:opacity-90',
        variant === 'secondary' &&
          'border-fd-border bg-fd-card text-fd-foreground hover:bg-fd-accent',
        variant === 'danger' &&
          'border-fd-border bg-fd-card text-red-600 hover:bg-red-500/10 dark:text-red-400',
        className,
      )}
      {...props}
    />
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-fd-border bg-fd-card px-3 py-2">
      <div className="text-lg font-semibold tabular-nums leading-tight">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-fd-muted-foreground">{label}</div>
    </div>
  );
}

/**
 * The control panel for the copy of HellDots running on this site. Everything
 * here goes through the same public API the docs describe — there is no
 * private hook into the widget.
 */
export function HellDotsControls() {
  const { overlay, ready, revision, commentMode, locale, name, setName } = useHellDots();
  const t = getDictionary(locale).controls;
  const [draft, setDraft] = useState(name);

  useEffect(() => setDraft(name), [name]);

  // `revision` is the dependency, not the value: it is bumped on every change
  // the widget emits, which is exactly when these figures go stale.
  const metrics = overlay && revision >= 0 ? overlay.getMetrics() : null;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-muted/30">
      <div className="flex flex-wrap items-center gap-2 border-b border-fd-border px-4 py-3">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
            ready
              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
              : 'bg-fd-muted text-fd-muted-foreground',
          )}
        >
          <span
            className={cn(
              'size-1.5 rounded-full',
              ready ? 'bg-emerald-500' : 'bg-fd-muted-foreground',
            )}
          />
          {ready ? t.mounted : t.mounting}
        </span>
        <span className="text-xs text-fd-muted-foreground">
          {t.persistence} <code className="font-mono">localStorage</code>
        </span>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex flex-wrap items-end gap-2">
          <label className="flex flex-col gap-1 text-xs font-medium text-fd-muted-foreground">
            {t.displayName}
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => setName(draft)}
              onKeyDown={(e) => e.key === 'Enter' && setName(draft)}
              placeholder="Guest"
              className="h-9 w-48 rounded-lg border border-fd-border bg-fd-background px-3 text-sm text-fd-foreground outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            />
          </label>
          <Button onClick={() => setName(draft)} disabled={!ready || draft.trim() === name}>
            {t.save}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="primary" disabled={!ready} onClick={() => overlay?.toggleCommentMode()}>
            {commentMode ? t.exitMode : t.enterMode}
            <kbd className="rounded border border-white/25 px-1 text-[10px] font-normal">
              Alt+C
            </kbd>
          </Button>
          <Button disabled={!ready || !metrics?.total} onClick={() => overlay?.exportCommentsCsv()}>
            {t.exportCsv}
          </Button>
          <Button
            variant="danger"
            disabled={!ready || !metrics?.total}
            onClick={() => {
              if (confirm(t.confirmClear)) {
                overlay?.clearComments();
              }
            }}
          >
            {t.clearAll}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label={t.total} value={metrics?.total ?? 0} />
          <Stat label={t.open} value={metrics?.byStatus.open ?? 0} />
          <Stat label={t.inProgress} value={metrics?.byStatus.in_progress ?? 0} />
          <Stat label={t.resolved} value={metrics?.byStatus.resolved ?? 0} />
        </div>

        <p className="text-xs text-fd-muted-foreground">
          {t.footnoteBefore}
          <code className="font-mono text-fd-foreground">overlay.getMetrics()</code>
          {t.footnoteAfter}
        </p>
      </div>
    </div>
  );
}
