
import { Metadata } from 'next';
import SpainParkPage from '@/pages/SpainParkPage';

export const metadata: Metadata = {
  title: 'Spain Park | Banks O\' Dee FC',
  description: 'Information about Spain Park, home of Banks O\' Dee FC'
};

export default function Page() {
  return <SpainParkPage />;
}
