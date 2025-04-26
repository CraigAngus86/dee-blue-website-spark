
import { Metadata } from 'next';
import NewsPage from '@/pages/NewsPage';

export const metadata: Metadata = {
  title: 'News | Banks O\' Dee FC',
  description: 'Latest news and updates from Banks O\' Dee FC'
};

export default function Page() {
  return <NewsPage />;
}
