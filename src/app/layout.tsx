import type { Metadata } from 'next';
import './globals.css';
import { constructMetaData } from '@/utils/functions';
import { Irish_Grover, Roboto_Condensed, Rajdhani } from 'next/font/google';

const irishGrover = Irish_Grover({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-irish-grover',
});

const robotoCondensed = Roboto_Condensed({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
});

const rajdhani = Rajdhani({
  weight: ['400', '600'],
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
      <body className={`${irishGrover.variable} ${robotoCondensed.variable} ${rajdhani.variable} antialiased`}>{children}</body>
    </html>
  );
}
