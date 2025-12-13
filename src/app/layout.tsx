import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { constructMetaData } from '@/utils/functions';

const rajdhani = localFont({
  src: '../../public/fonts/Rajdhani-Variable.ttf',
  variable: '--font-rajdhani',
});

const agency = localFont({
  src: '../../public/fonts/AGENCYB.ttf',  
  weight: '200',
  style: 'light',
  variable: '--font-agency',
});

export const metadata: Metadata = constructMetaData({
  title: 'Game of Thrones 2026',
  description: 'The Official Sports Fest of RCCIIT.',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${agency.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}