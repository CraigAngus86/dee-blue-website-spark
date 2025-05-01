
import React from 'react';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import { ButtonNew } from '@/components/ui/ButtonNew';
import { Download, Mail, Phone } from 'lucide-react';

const DownloadBrochure = () => {
  return (
    <div className="space-y-8">
      <div className="bg-secondary/20 p-6 md:p-8 rounded-lg">
        <Heading level={2} color="primary" className="mb-4">
          Download Our Sponsorship Brochure
        </Heading>
        <Text color="muted" className="mb-6">
          Download our comprehensive sponsorship brochure for full details of all our partnership opportunities at Banks o' Dee FC.
        </Text>
        <ButtonNew 
          variant="accent"
          iconRight={<Download />}
          className="w-full md:w-auto"
          href="/brochure.pdf"
        >
          Download Brochure
        </ButtonNew>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
        <Heading level={2} color="primary" className="mb-4">
          Direct Contact
        </Heading>
        <div className="space-y-6">
          <div>
            <Text weight="medium" className="mb-1">Brian Winton</Text>
            <div className="space-y-2">
              <a 
                href="mailto:brian.winton@bankodee.co.uk" 
                className="flex items-center text-primary hover:text-primary-light"
              >
                <Mail className="h-4 w-4 mr-2" />
                <Text size="small">brian.winton@bankodee.co.uk</Text>
              </a>
              <a 
                href="tel:+441224871333" 
                className="flex items-center text-primary hover:text-primary-light"
              >
                <Phone className="h-4 w-4 mr-2" />
                <Text size="small">+44 (0) 1224 871333</Text>
              </a>
            </div>
          </div>

          <div>
            <Text weight="medium" className="mb-1">Craig Angus</Text>
            <div className="space-y-2">
              <a 
                href="mailto:craig.angus@bankodee.co.uk" 
                className="flex items-center text-primary hover:text-primary-light"
              >
                <Mail className="h-4 w-4 mr-2" />
                <Text size="small">craig.angus@bankodee.co.uk</Text>
              </a>
              <a 
                href="tel:+441224878787" 
                className="flex items-center text-primary hover:text-primary-light"
              >
                <Phone className="h-4 w-4 mr-2" />
                <Text size="small">+44 (0) 1224 878787</Text>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadBrochure;
