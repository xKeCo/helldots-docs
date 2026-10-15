import type { MetadataRoute } from 'next';
import { appName, appTagline } from '@/lib/shared';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${appName} docs`,
    short_name: appName,
    description: appTagline,
    start_url: '/',
    display: 'browser',
    background_color: '#0a0d14',
    theme_color: '#2563eb',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
