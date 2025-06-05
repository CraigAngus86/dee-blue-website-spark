import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";
import { getHeaderSponsors } from "@/features/sponsors/utils/sanityQueries";
import "@/styles/globals.css";

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Banks o' Dee Football Club",
    template: "%s | Banks o' Dee FC",
  },
  description: "Official website of Banks o' Dee Football Club - Latest news, fixtures, results and more from Spain Park.",
  keywords: ["Banks o' Dee", "football", "soccer", "Aberdeen", "Highland League", "Spain Park"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch sponsors server-side (same approach as main page)
  const headerSponsors = await getHeaderSponsors();

  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>
          <Header sponsors={headerSponsors} />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
