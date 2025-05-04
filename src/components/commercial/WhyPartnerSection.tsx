
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/ui/typography/Heading';
import { Trophy, Users, TrendingUp, Globe, Megaphone, Maximize2 } from 'lucide-react';

export interface WhyPartnerSectionProps {
  title?: string;
  reasons?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

export function WhyPartnerSection({ 
  title = "Why Partner With Us?", 
  reasons = defaultReasons 
}: WhyPartnerSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4">{title}</Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the benefits of partnering with Banks o' Dee FC and how we can help grow your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 text-primary">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const defaultReasons = [
  {
    icon: <Trophy className="h-8 w-8" />,
    title: 'Community Recognition',
    description: 'Gain visibility and recognition within the local Aberdeen community as a supporter of grassroots football.',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Targeted Audience',
    description: 'Connect with our passionate fanbase and the wider football community in the North East of Scotland.',
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Brand Growth',
    description: 'Increase brand awareness through matchday exposure, social media mentions, and website presence.',
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Digital Presence',
    description: 'Benefit from our growing online presence across our website and social media platforms.',
  },
  {
    icon: <Megaphone className="h-8 w-8" />,
    title: 'Marketing Opportunities',
    description: 'Access unique marketing opportunities through our matchday programmes, events, and hospitality packages.',
  },
  {
    icon: <Maximize2 className="h-8 w-8" />,
    title: 'Flexible Packages',
    description: 'Choose from a range of sponsorship options to find the perfect fit for your business needs and budget.',
  },
];
