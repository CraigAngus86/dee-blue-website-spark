
import { Inter, Montserrat } from 'next/font/google';

// Define Inter font for body text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

// Define Montserrat font for headings
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800'],
});

// Export font variables for use in layout
export const fontVariables = `${inter.variable} ${montserrat.variable}`;
