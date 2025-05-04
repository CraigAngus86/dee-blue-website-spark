
"use client";

import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import { Heading } from '@/components/ui/typography/Heading';
import { useCloudinaryImage } from '@/hooks/useCloudinaryImage';

interface WhyPartnerSectionProps {
  title: string;
  reasons: {
    title: string;
    description: string;
    image: {
      asset: {
        url: string;
        public_id: string;
      };
      alt: string;
    };
  }[];
}

export const WhyPartnerSection: React.FC<WhyPartnerSectionProps> = ({ title, reasons }) => {
  return (
    <Section id="why-partner">
      <Container>
        <Heading as="h2" className="text-center mb-12">
          {title}
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} {...reason} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

interface ReasonCardProps {
  title: string;
  description: string;
  image: {
    asset: {
      url: string;
      public_id: string;
    };
    alt: string;
  };
}

const ReasonCard: React.FC<ReasonCardProps> = ({ title, description, image }) => {
  const { imageUrl } = useCloudinaryImage(image?.asset?.public_id, {
    width: 600,
    height: 400,
    crop: 'fill',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={imageUrl || image?.asset?.url}
          alt={image.alt}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};
