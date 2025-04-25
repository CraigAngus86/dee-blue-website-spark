
import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import { ButtonNew } from '@/components/ui/ButtonNew';
import SponsorshipTier from './SponsorshipTier';
import SponsorshipCard from './SponsorshipCard';
import { premiumSponsorship, additionalSponsorship, fanzoneSponsorship } from './sponsorshipData';

const SponsorshipTiersSection = () => {
  return (
    <Section background="light" spacing="xl" id="sponsorship-options">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Heading level={2} color="primary" className="mb-6">
            Sponsorship Opportunities
          </Heading>
          <Text size="large" color="default">
            Explore our range of sponsorship packages designed to provide maximum visibility 
            and value for your brand. From matchday experiences to long-term partnerships, 
            we offer flexible options to suit your objectives and budget.
          </Text>
        </div>

        {/* Premium Sponsorships */}
        <SponsorshipTier
          title="Premium Sponsorships"
          description="Our premium packages offer exclusive matchday experiences and maximum brand exposure."
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {premiumSponsorship.map((item) => (
              <SponsorshipCard key={item.title} {...item} />
            ))}
          </div>
        </SponsorshipTier>

        {/* Additional Sponsorship Options */}
        <SponsorshipTier
          title="Additional Sponsorship Options"
          description="Choose from our range of targeted sponsorship opportunities."
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalSponsorship.map((item) => (
              <SponsorshipCard key={item.title} {...item} />
            ))}
          </div>
        </SponsorshipTier>

        {/* Fanzone Sponsorship */}
        <SponsorshipTier
          title="Fanzone Experience"
          description="Create memorable experiences for fans before and after matches."
          className="mb-16"
        >
          <div className="max-w-2xl mx-auto">
            <SponsorshipCard {...fanzoneSponsorship} />
          </div>
        </SponsorshipTier>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Text size="large" color="default" className="mb-6">
            Ready to discuss sponsorship opportunities? Our commercial team is here to help 
            create a package that meets your objectives.
          </Text>
          <ButtonNew
            variant="primary"
            size="lg"
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Discuss Sponsorship Options
          </ButtonNew>
        </div>
      </Container>
    </Section>
  );
};

export default SponsorshipTiersSection;
