import type { Metadata } from 'next';
import './globals.css';
import { constructMetaData } from '@/utils/functions';
import SessionProvider from '@/lib/SessionProvider';

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
    <html lang="en" className="no-scrollbar">
      <body className={`$antialiased no-scrollbar`}>
        <SessionProvider />
        {children}
      </body>
    </html>
  );
}
