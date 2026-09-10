import { cn } from '@/lib/cn';

/**
 * The official mark: the outline of the shape the widget already draws. The
 * comment cursor and every marker on the page share this silhouette — a sharp
 * top-left corner opening into three quarters of a circle, where the corner is
 * the tip that points at the element being commented on.
 *
 * `currentColor` rather than the brand blue, so a caller can put it on a
 * coloured surface; `text-fd-primary` is the default the nav relies on.
 */
export function HellDotsMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="HellDots"
      className={cn('text-fd-primary', className)}
    >
      <path
        d="M10 10H50A40 40 0 0 1 90 50A40 40 0 0 1 50 90A40 40 0 0 1 10 50V10Z"
        stroke="currentColor"
        strokeWidth="12"
      />
    </svg>
  );
}
