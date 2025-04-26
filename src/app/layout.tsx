
'use client';

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import '../index.css';
import '../App.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HelmetProvider>
          <div className="min-h-screen flex flex-col">
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
