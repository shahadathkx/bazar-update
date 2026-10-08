import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { PriceTicker } from '@/components/layout/PriceTicker';
import { Footer } from '@/components/layout/Footer';
import { ToastProvider } from '@/components/providers/ToastProvider';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  icons: {
    icon: '/logo-icon.png',
  },
  title: 'Bazardor',
  description: 'Bazardor grocery price ticker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.variable} font-sans antialiased bg-base-100 text-base-content min-h-screen flex flex-col`}>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <PriceTicker />
        <main className="flex-1 pb-12">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
