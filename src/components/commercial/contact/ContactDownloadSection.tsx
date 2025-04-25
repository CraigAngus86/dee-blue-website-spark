
import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import ContactForm from './ContactForm';
import DownloadBrochure from './DownloadBrochure';

const ContactDownloadSection = () => {
  return (
    <Section background="white" spacing="xl" id="contact">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ContactForm />
          <DownloadBrochure />
        </div>
      </Container>
    </Section>
  );
};

export default ContactDownloadSection;
