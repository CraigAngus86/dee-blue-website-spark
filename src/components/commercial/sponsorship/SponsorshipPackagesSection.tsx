
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star } from 'lucide-react';

interface SponsorshipTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  premium?: boolean;
}

const sponsorshipTiers: SponsorshipTier[] = [
  {
    id: 'standard',
    name: 'Standard Sponsorship',
    price: 'From £500/season',
    description: 'Entry-level package ideal for local businesses',
    features: [
      'Logo on club website',
      'Social media mention',
      'Business listing in matchday program',
      '2 season tickets'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Partnership',
    price: 'From £1,500/season',
    description: 'Enhanced visibility across multiple channels',
    features: [
      'Logo on club website and training kit',
      'Regular social media promotion',
      'Half-page ad in matchday program',
      'Pitch-side advertising board',
      '4 season tickets with hospitality',
      'Player appearance opportunity'
    ],
    premium: true
  },
  {
    id: 'elite',
    name: 'Elite Sponsorship',
    price: 'From £3,000/season',
    description: 'Maximum exposure and benefits for your business',
    features: [
      'Logo on match kits',
      'Front-of-house advertising',
      'Full-page ad in matchday program',
      'Premium pitch-side advertising',
      'VIP hospitality for 6 guests all season',
      'Named sponsor for selected matches',
      'Exclusive player/manager meet & greet'
    ]
  }
];

const SponsorshipPackagesSection: React.FC = () => {
  return (
    <section id="sponsorship" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Sponsorship Opportunities</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Partner with Banks o' Dee FC and align your brand with one of the most successful clubs in the Highland League, reaching thousands of loyal supporters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sponsorshipTiers.map((tier) => (
            <Card key={tier.id} className={`relative ${tier.premium ? 'border-primary-dark shadow-xl' : ''}`}>
              {tier.premium && (
                <div className="absolute -top-4 -right-4 bg-primary-dark text-white p-3 rounded-full">
                  <Star className="h-6 w-6" />
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-2xl font-bold text-primary mt-2">
                  {tier.price}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button className={`w-full ${tier.premium ? 'bg-primary-dark hover:bg-primary' : ''}`}>
                  Contact Us
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorshipPackagesSection;
