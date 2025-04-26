
import { Metadata } from 'next';
import TeamAndManagement from '@/pages/TeamAndManagement';

export const metadata: Metadata = {
  title: 'Team & Management | Banks O\' Dee FC',
  description: 'Meet the Banks O\' Dee FC team and management staff',
  openGraph: {
    title: 'Team & Management | Banks O\' Dee FC',
    description: 'Meet the Banks O\' Dee FC team and management staff',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team & Management | Banks O\' Dee FC',
    description: 'Meet the Banks O\' Dee FC team and management staff',
  },
};

export default function Page() {
  return <TeamAndManagement />;
}
