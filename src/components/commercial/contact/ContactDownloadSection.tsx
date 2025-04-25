
import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import ContactForm from './ContactForm';
import { ButtonNew } from '@/components/ui/ButtonNew';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import { Download } from 'lucide-react';

const ContactDownloadSection = () => {
  return (
    <Section background="light" spacing="md" id="contact">
      <Container>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="space-y-8">
            <ContactForm />
            
            <div>
              <Heading level={3} color="primary" className="mb-6">
                Direct Contact
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <CardContent className="p-2">
                    <Heading level={4} color="primary" className="mb-2">
                      Brian Winton
                    </Heading>
                    <Text color="muted" className="mb-2">Commercial Director</Text>
                    <Text className="flex items-center gap-2"><span className="font-semibold">Email:</span> commercial@banksofdee.co.uk</Text>
                    <Text className="flex items-center gap-2"><span className="font-semibold">Phone:</span> 07123 456789</Text>
                  </CardContent>
                </Card>
                
                <Card className="p-4">
                  <CardContent className="p-2">
                    <Heading level={4} color="primary" className="mb-2">
                      Craig Angus
                    </Heading>
                    <Text color="muted" className="mb-2">Sponsorship Coordinator</Text>
                    <Text className="flex items-center gap-2"><span className="font-semibold">Email:</span> sponsorship@banksofdee.co.uk</Text>
                    <Text className="flex items-center gap-2"><span className="font-semibold">Phone:</span> 07987 654321</Text>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 bg-primary/5 p-6 rounded-lg text-center">
                <Heading level={4} color="primary" className="mb-3">
                  Download Our Sponsorship Brochure
                </Heading>
                <Text className="mb-4">
                  Get detailed information about all our sponsorship opportunities in our comprehensive brochure.
                </Text>
                <ButtonNew 
                  variant="primary" 
                  size="lg"
                  iconLeft={<Download size={18} />}
                >
                  Download Brochure (PDF)
                </ButtonNew>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactDownloadSection;
