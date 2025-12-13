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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} antialiased`}>{children}</body>
    </html>
  );
}
