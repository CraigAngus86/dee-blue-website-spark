
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import '../index.css';
import '../App.css';

export const metadata: Metadata = {
  title: {
    default: 'Banks O\' Dee FC',
    template: '%s | Banks O\' Dee FC'
  },
  description: 'Official website of Banks O\' Dee Football Club',
  openGraph: {
    title: 'Banks O\' Dee FC',
    description: 'Official website of Banks O\' Dee Football Club',
    url: 'https://banksofdee.com',
    siteName: 'Banks O\' Dee FC',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banks O\' Dee FC',
    description: 'Official website of Banks O\' Dee Football Club',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HelmetProvider>
          <div className="min-h-screen flex flex-col w-full">
            <Header />
            {children}
            <Footer />
            <Toaster />
          </div>
        </HelmetProvider>
      </body>
    </html>
  );
}
