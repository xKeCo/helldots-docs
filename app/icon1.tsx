import { ImageResponse } from 'next/og';

export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

/**
 * The PNG twin of `icon.svg`, for the browsers that still ignore SVG favicons.
 * Same mark, same blue; drawn a little heavier because it is read at 16px.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
          <path
            d="M10 10H50A40 40 0 0 1 90 50A40 40 0 0 1 50 90A40 40 0 0 1 10 50V10Z"
            stroke="#2563eb"
            strokeWidth="15"
          />
        </svg>
      </div>
    ),
    size,
  );
}
