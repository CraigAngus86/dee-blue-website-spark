
import { Metadata } from 'next';
import CommercialOpportunitiesPage from '@/pages/CommercialOpportunitiesPage';

export const metadata: Metadata = {
  title: 'Commercial Opportunities | Banks O\' Dee FC',
  description: 'Commercial and sponsorship opportunities at Banks O\' Dee FC'
};

export default function Page() {
  return <CommercialOpportunitiesPage />;
}
