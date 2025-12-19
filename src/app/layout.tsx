import type { Metadata } from 'next';
import './globals.css';
import { constructMetaData } from '@/utils/functions';
import SessionProvider from '@/lib/SessionProvider';
import {
  Irish_Grover,
  Roboto_Condensed,
  Rajdhani,
  Cinzel,
} from 'next/font/google';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel',
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
      </head>
      <body
        className={`${irishGrover.variable} ${robotoCondensed.variable} ${rajdhani.variable} ${cinzel.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Toaster position="bottom-right" richColors duration={5000} />
        <SessionProvider />
        <Footer />
      </body>
    </html>
  );
}
