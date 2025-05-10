
import type { Metadata } from 'next';
import { fontVariables, inter, montserrat } from '@/lib/fonts';
import '@/styles/globals.css';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Banks o\' Dee FC | Official Website',
    template: '%s | Banks o\' Dee FC',
  },
  description: 'The official website of Banks o\' Dee Football Club - Latest news, fixtures, results and more from Spain Park.',
  keywords: ['Banks o\' Dee', 'football', 'soccer', 'Aberdeen', 'Highland League', 'Spain Park'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
