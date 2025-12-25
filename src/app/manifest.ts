import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Game of Thrones 2026 - Official Sports Fest of RCCIIT',
    short_name: 'GOT 2026',
    description:
      'Game of Thrones 2026 is the premier annual sports festival of RCC Institute of Information Technology.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#CCA855',
    orientation: 'portrait-primary',
    categories: ['sports', 'events', 'education'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/assets/home/Game of Thrones.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
