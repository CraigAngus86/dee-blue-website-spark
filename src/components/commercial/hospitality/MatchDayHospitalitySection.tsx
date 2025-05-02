import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import { Button } from "@/components/ui/button";

const MatchDayHospitalitySection = () => {
  return (
    <>
      <section className="bg-primary py-16 px-4">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Section background="light" spacing="md">
              <div className="text-center">
                <Heading level={2} color="primary" className="mb-4">
                  Match Day Hospitality
                </Heading>
                <Text color="muted" className="mb-8">
                  Experience Banks o' Dee FC in style with our exclusive match day hospitality packages.
                </Text>
              </div>
            </Section>
            
            <Text className="text-white text-lg mt-8">
              Enjoy premium seating, pre-match meals, and exclusive access to the hospitality suite.
            </Text>
            <Button variant="secondary" size="lg" className="mt-8">
              Enquire Now
            </Button>
          </div>
        </Container>
      </section>
      <section className="bg-gray-100 py-12 px-4">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Heading level={3} color="primary" className="mb-4">
                Package Includes
              </Heading>
              <ul className="list-disc list-inside text-gray-700">
                <li>Premium match seating</li>
                <li>Pre-match three-course meal</li>
                <li>Half-time refreshments</li>
                <li>Access to exclusive hospitality suite</li>
                <li>Meet and greet with players</li>
                <li>Match day program</li>
              </ul>
            </div>
            <div>
              <Heading level={3} color="primary" className="mb-4">
                Pricing
              </Heading>
              <Text color="muted">
                Contact us for pricing and availability.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default MatchDayHospitalitySection;
