import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import StadiumImage from '@/components/ui/image/StadiumImage';
import { ButtonNew } from '@/components/ui/ButtonNew';
import { CalendarClock, Users } from 'lucide-react';

const MatchDayHospitalitySection = () => {
  return (
    <Section background="light" spacing="md" id="matchday-hospitality">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Heading level={2} color="primary" className="mb-6">
              Match Day Hospitality
            </Heading>
            <Text size="large" color="default" className="mb-4">
              Experience Banks o' Dee FC in style with our exclusive match day hospitality packages.
            </Text>
            <Text color="default" className="mb-6">
              Enjoy premium seating, gourmet dining, and unparalleled access to the heart of the action.
              Perfect for entertaining clients, rewarding employees, or celebrating a special occasion with
              fellow Dee supporters.
            </Text>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-primary" />
                <Text weight="medium">Pre-match dining experience</Text>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <Text weight="medium">Exclusive access to the hospitality suite</Text>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A8.25 8.25 0 0012 21a8.25 8.25 0 00-8.25-8.25.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
                <Text weight="medium">Meet and greet with club legends</Text>
              </div>
            </div>

            <div className="mt-8">
              <ButtonNew href="#package-comparison" variant="primary">
                View Packages
              </ButtonNew>
            </div>
          </div>

          <div>
            <StadiumImage
              filename="Hospitality Suite.jpg"
              alt="Match Day Hospitality at Spain Park"
              aspectRatio="4/3"
              rounded="md"
              shadow="md"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default MatchDayHospitalitySection;
