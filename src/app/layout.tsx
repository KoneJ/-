import type { Metadata, Viewport } from 'next';
import './globals.css';
import '@/styles/mobile.css';

export const metadata: Metadata = {
  title: 'Frontend App',
  description: 'Next.js Application',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

