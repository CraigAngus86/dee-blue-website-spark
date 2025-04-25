
import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import ContactForm from './ContactForm';
import DownloadBrochure from './DownloadBrochure';

const ContactDownloadSection = () => {
  return (
    <Section background="light" spacing="xl" id="contact">
      <Container>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-primary/5 p-6 rounded-lg h-full">
              <ContactForm />
            </div>
            <div className="h-full">
              <DownloadBrochure />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactDownloadSection;
