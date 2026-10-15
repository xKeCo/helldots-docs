import { appName } from '@/lib/shared';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const blue = '#2563eb';

/**
 * The social card — what a link to this site unfurls into. One layout for the
 * landing page and every docs page, so they read as one site: the official
 * mark and name on top, the page's own title underneath.
 *
 * Satori (behind `ImageResponse`) understands a subset of CSS and has no
 * `currentColor`, so the mark is repeated here with its colour spelled out
 * rather than imported from `brand.tsx`.
 */
export function OgImage({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        color: '#f8fafc',
        backgroundColor: '#0a0d14',
        backgroundImage: `radial-gradient(circle at 100% 0%, ${blue}55 0%, transparent 55%)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
          <path
            d="M10 10H50A40 40 0 0 1 90 50A40 40 0 0 1 50 90A40 40 0 0 1 10 50V10Z"
            stroke="#60a5fa"
            strokeWidth="12"
          />
        </svg>
        <div style={{ display: 'flex', fontSize: 44, fontWeight: 700 }}>{appName}</div>
        {eyebrow ? (
          <div
            style={{
              display: 'flex',
              marginLeft: 8,
              padding: '6px 18px',
              borderRadius: 999,
              border: '2px solid #334155',
              color: '#94a3b8',
              fontSize: 26,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 28 ? 68 : 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              lineHeight: 1.35,
              color: '#94a3b8',
              maxWidth: 980,
            }}
          >
            {description.length > 140 ? `${description.slice(0, 137)}…` : description}
          </div>
        ) : null}
      </div>
    </div>
  );
}
