import type { Metadata } from "next";
import { Bebas_Neue, Open_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";
import { getHeaderSponsors } from "@/features/sponsors/utils/sanityQueries";
import "@/styles/globals.css";

// Fonts → CSS variables
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Baynounah Sports Club",
    template: "%s | Baynounah SC",
  },
  description:
    "Baynounah Sports Club — Be Part of the Journey. Academy-first, community-driven football in Abu Dhabi.",
  keywords: [
    "Baynounah SC",
    "Baynounah Sports Club",
    "Abu Dhabi football",
    "UAE football",
    "football academy",
    "fixtures",
    "results",
    "news",
  ],
  openGraph: {
    title: "Baynounah Sports Club",
    description:
      "Be Part of the Journey — academy excellence, community, and ambition in Abu Dhabi.",
    url: "https://www.baynounahsc.ae",
    siteName: "Baynounah SC",
    images: ["/og.jpg"],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baynounah Sports Club",
    description:
      "Be Part of the Journey — academy excellence, community, and ambition in Abu Dhabi.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headerSponsors = await getHeaderSponsors();

  return (
    <html lang="en" className={`${openSans.variable} ${bebas.variable}`}>
      <head>
        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              name: "Baynounah Sports Club",
              url: "https://www.baynounahsc.ae",
              logo: "/favicon.ico",
              sameAs: [
                "https://x.com/baynounahsc",
                "https://www.facebook.com/BaynounahSC/",
                "https://www.instagram.com/baynounahsc/",
                "https://www.youtube.com/channel/UCXiba2uCfhFI_PYJiiExavA",
              ],
              email: "support@baynounahsc.ae",
              telephone: "+971566975370",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Abu Dhabi",
                addressCountry: "AE",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen bg-[rgb(var(--surface-1))] text-[rgb(var(--brand-black))]">
        <Providers>
          <Header sponsors={headerSponsors} />
          <main id="main" className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
