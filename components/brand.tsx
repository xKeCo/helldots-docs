import { cn } from '@/lib/cn';

/**
 * The mark: one anchored comment dot with its tail, and the two smaller dots
 * of the comments already left on the page around it.
 */
export function HellDotsMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn('text-fd-primary', className)}
    >
      <path
        d="M14.5 3.5a6 6 0 0 1 4.2 10.3l-3.4 6.9a.9.9 0 0 1-1.6 0l-3.4-6.9A6 6 0 0 1 14.5 3.5Z"
        fill="currentColor"
      />
      <circle cx="14.5" cy="9.5" r="2.1" className="fill-fd-background" />
      <circle cx="4.6" cy="6.4" r="1.9" fill="currentColor" opacity="0.45" />
      <circle cx="6.1" cy="16.4" r="1.4" fill="currentColor" opacity="0.28" />
    </svg>
  );
}
