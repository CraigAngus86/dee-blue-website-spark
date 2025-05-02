
import { Inter, Montserrat } from 'next/font/google';

// Load Inter font
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Load Montserrat font
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

// Export combined CSS variables for use in layout
export const fontVariables = `${inter.variable} ${montserrat.variable}`;
