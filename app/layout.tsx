import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SmoothScroll from '../components/ui/smooth-scroll';
import './globals.css';
const inter = Inter({ subsets: ['latin'], variable: '--inter' });

export const metadata: Metadata = {
  title: 'Kuma',
  description: 'Finance, for everyone.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
