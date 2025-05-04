
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Phone, FileText } from 'lucide-react';

const ContactDownloadSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-primary flex items-center mb-4">
                <Mail className="mr-2 h-5 w-5" />
                Contact Our Commercial Team
              </h3>
              <p className="text-gray-600 mb-6">
                Interested in partnering with Banks o' Dee FC? Our commercial team is ready to discuss how we can create a bespoke partnership package for your business.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium">01224 780056</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium">commercial@banksofdeefc.co.uk</span>
                </div>
              </div>
              <Button className="w-full">
                Send Enquiry
              </Button>
            </div>
            
            <div className="bg-primary p-6 rounded-lg shadow-sm text-white">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <FileText className="mr-2 h-5 w-5" />
                Download Commercial Brochure
              </h3>
              <p className="opacity-90 mb-6">
                Get all the details about our sponsorship, advertising and hospitality packages in our comprehensive commercial brochure.
              </p>
              <div className="bg-white/10 p-4 rounded mb-6">
                <h4 className="font-semibold mb-2">Brochure includes:</h4>
                <ul className="space-y-2 opacity-90">
                  <li>• Detailed package descriptions</li>
                  <li>• Pricing information</li>
                  <li>• Sponsorship benefits</li>
                  <li>• Partnership case studies</li>
                  <li>• Club statistics and reach</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Download PDF (2.4MB)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDownloadSection;
