
"use client";

import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import ContactForm from './ContactForm';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';

const ContactDownloadSection = () => {
  return (
    <Section background="light" spacing="md" id="contact">
      <Container>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-6 font-montserrat">
                Contact Us
              </h3>
              <p className="text-gray-700 mb-4">
                Interested in partnering with Banks o' Dee FC? Our commercial team is ready to discuss 
                how we can create a tailored package that meets your business objectives.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card className="p-4">
                  <CardContent className="p-2 text-center">
                    <h4 className="text-lg font-bold text-primary mb-2 font-montserrat">
                      Brian Winton
                    </h4>
                    <p className="text-gray-500 mb-2">Commercial Director</p>
                    <p className="flex items-center justify-center gap-2"><span className="font-semibold">Email:</span> commercial@banksofdee.co.uk</p>
                    <p className="flex items-center justify-center gap-2"><span className="font-semibold">Phone:</span> 07123 456789</p>
                  </CardContent>
                </Card>
                
                <Card className="p-4">
                  <CardContent className="p-2 text-center">
                    <h4 className="text-lg font-bold text-primary mb-2 font-montserrat">
                      Craig Angus
                    </h4>
                    <p className="text-gray-500 mb-2">Sponsorship Coordinator</p>
                    <p className="flex items-center justify-center gap-2"><span className="font-semibold">Email:</span> sponsorship@banksofdee.co.uk</p>
                    <p className="flex items-center justify-center gap-2"><span className="font-semibold">Phone:</span> 07987 654321</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <Button 
                  variant="default" 
                  size="lg"
                  className="w-full justify-center py-6 text-lg gap-2"
                >
                  <Download size={18} />
                  Download our Sponsorship Brochure
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactDownloadSection;
