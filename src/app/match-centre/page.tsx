
import { Metadata } from 'next';
import MatchCentre from '@/pages/MatchCentre';

export const metadata: Metadata = {
  title: 'Match Centre | Banks O\' Dee FC',
  description: 'Match information, fixtures, and results for Banks O\' Dee FC'
};

export default function Page() {
  return <MatchCentre />;
}
