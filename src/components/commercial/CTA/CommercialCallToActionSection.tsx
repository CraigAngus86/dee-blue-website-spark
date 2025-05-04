
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';

const CommercialCallToActionSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Partner with Banks o' Dee FC
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Discover how your business can benefit from associating with one of Scotland's most progressive football clubs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Download className="mr-2 h-4 w-4" />
              Download Brochure
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommercialCallToActionSection;
