
import { Metadata } from 'next';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import { FixturesCard } from '@/components/ui/match/FixturesCard';

export const metadata: Metadata = {
  title: 'Fixtures & Results | Banks o\' Dee FC',
  description: 'View upcoming fixtures and recent results for Banks o\' Dee FC',
};

export default function FixturesPage() {
  return (
    <>
      <Section spacing="lg">
        <Container>
          <Heading as="h1" size="4xl" className="mb-8">Fixtures & Results</Heading>
          <FixturesCard />
        </Container>
      </Section>
    </>
  );
}
