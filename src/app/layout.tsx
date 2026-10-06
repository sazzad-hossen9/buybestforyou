import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { DisclosureBar } from '@/components/layout/DisclosureBar';
import { Footer } from '@/components/layout/Footer';
import { ToastWrapper } from '@/components/layout/ToastWrapper';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    template: '%s | buybestforyou',
    default: 'buybestforyou — Real research. Straight answers. No fluff.',
  },
  description:
    'Composite ratings, verified buyer data, and expert lab/press coverage, compared side by side across Automotive, Electronics, Home Appliances, and Health and Fitness.',
  metadataBase: new URL('https://buybestforyou.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#1A1D21] font-sans selection:bg-[#B84A14] selection:text-white">
        <Header />
        <DisclosureBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastWrapper />
      </body>
    </html>
  );
}
