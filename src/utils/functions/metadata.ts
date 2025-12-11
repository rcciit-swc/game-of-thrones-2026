import { Metadata } from 'next';

export function constructMetaData({
  title = 'Game of Thrones 2026',
  description = 'Game of Thrones is the Official Techno-Management Fest of RCCIIT.',
  authors = {
    name: 'Game of Thrones RCCIIT Team 2026',
    url: 'https://got.rcciit.org.in/',
  },
  creator = 'Game of Thrones RCCIIT Team 2026',
  generator = 'Next.js',
  publisher = 'Game of Thrones',
  icons = '/favicon.ico',
  robots = 'index, follow',
  image = '/assets/home/Game of Thrones.png',
}: {
  title?: string;
  description?: string;
  image?: string;
  authors?: { name: string; url: string };
  creator?: string;
  generator?: string;
  publisher?: string;
  icons?: string;
  robots?: string;
} = {}): Metadata {
  return {
    title,
    description,
    authors,
    creator,
    generator,
    publisher,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    icons,
    metadataBase: new URL('https://got.rcciit.org.in/'),
    robots,
  };
}
