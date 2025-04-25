
import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import ContactForm from './ContactForm';
import DownloadBrochure from './DownloadBrochure';

const ContactDownloadSection = () => {
  return (
    <Section background="light" spacing="md" id="contact">
      <Container>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="space-y-8">
            <ContactForm />
            <DownloadBrochure />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactDownloadSection;
