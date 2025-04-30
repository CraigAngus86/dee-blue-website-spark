
import type { Metadata } from 'next';
import { fontVariables, inter, montserrat } from '@/lib/fonts';
import '@/styles/globals.css';
import { Providers } from './providers';

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
            {/* Header component will be added here */}
            <main className="flex-grow">
              {children}
            </main>
            {/* Footer component will be added here */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
