
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface AdPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const advertisingPackages: AdPackage[] = [
  {
    id: 'pitch-side',
    name: 'Pitch-Side Advertising',
    price: 'From £300/season',
    description: 'High-visibility advertising boards around Spain Park Stadium',
    features: [
      'Full-color advertising board',
      'Visible to all match attendees',
      'Featured in match photos and videos',
      'Mention in matchday program'
    ]
  },
  {
    id: 'program',
    name: 'Matchday Program',
    price: 'From £150/season',
    description: 'Advertisement in our official matchday program',
    features: [
      'Quarter, half, or full-page options',
      'Distributed to all attendees',
      'Digital version on club website',
      'Season-long exposure'
    ],
    popular: true
  },
  {
    id: 'digital',
    name: 'Digital Advertising',
    price: 'From £200/season',
    description: 'Promote your business across our digital platforms',
    features: [
      'Website banner advertisement',
      'Featured in club email newsletters',
      'Social media promotion',
      'Match highlight video sponsorship option'
    ]
  }
];

const AdPackagesSection: React.FC = () => {
  return (
    <section id="advertising" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Advertising Packages</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Increase your brand visibility with our range of advertising options at Spain Park Stadium and across our digital platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {advertisingPackages.map((pkg) => (
            <Card key={pkg.id} className={`relative overflow-hidden ${pkg.popular ? 'border-primary shadow-lg' : ''}`}>
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">
                  Popular
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                <CardDescription className="text-2xl font-bold text-primary mt-2">
                  {pkg.price}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full">Enquire Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdPackagesSection;
