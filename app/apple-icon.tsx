import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** iOS home-screen icon: the mark on the brand blue, with the room Apple's mask expects. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2563eb',
        }}
      >
        <svg width="112" height="112" viewBox="0 0 100 100" fill="none">
          <path
            d="M10 10H50A40 40 0 0 1 90 50A40 40 0 0 1 50 90A40 40 0 0 1 10 50V10Z"
            stroke="#ffffff"
            strokeWidth="13"
          />
        </svg>
      </div>
    ),
    size,
  );
}
