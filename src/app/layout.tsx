import type { Metadata } from 'next';
import { Rajdhani } from 'next/font/google';
import './globals.css';
import { constructMetaData } from '@/utils/functions';

const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

export const metadata: Metadata = constructMetaData({
  title: 'Game of Thrones 2026',
  description: 'The Official Sports Fest of RCCIIT.',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Irish+Grover&family=Cinzel:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${rajdhani.variable} antialiased`}>{children}</body>
    </html>
  );
}
