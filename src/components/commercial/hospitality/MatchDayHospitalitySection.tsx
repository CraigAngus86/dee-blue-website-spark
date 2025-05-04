
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Coffee, UtensilsCrossed, Wine } from 'lucide-react';

interface HospitalityPackage {
  id: string;
  name: string;
  price: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

const hospitalityPackages: HospitalityPackage[] = [
  {
    id: 'standard',
    name: 'Standard Hospitality',
    price: '£40 per person',
    icon: <Coffee className="h-8 w-8 text-primary" />,
    description: 'A great matchday experience for supporters and guests',
    features: [
      'Reserved premium seating',
      'Pre-match meal',
      'Matchday program',
      'Tea and coffee at half-time'
    ]
  },
  {
    id: 'business',
    name: 'Business Package',
    price: '£75 per person',
    icon: <UtensilsCrossed className="h-8 w-8 text-primary" />,
    description: 'Perfect for entertaining business clients and partners',
    features: [
      'VIP reserved seating',
      'Three-course pre-match meal',
      'Complimentary bar (beer & wine)',
      'Matchday program',
      'Team sheet',
      'Post-match player interviews'
    ]
  },
  {
    id: 'executive',
    name: 'Executive Experience',
    price: '£120 per person',
    icon: <Wine className="h-8 w-8 text-primary" />,
    description: 'The ultimate VIP matchday experience at Spain Park',
    features: [
      'Directors' box seating',
      'Premium three-course meal',
      'Full complimentary bar',
      'Matchday program and team merchandise',
      'Meet the manager and captain',
      'Photograph opportunities',
      'Post-match reception'
    ]
  }
];

const MatchDayHospitalitySection: React.FC = () => {
  return (
    <section id="hospitality" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Matchday Hospitality</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Experience Banks o' Dee match days in style with our premium hospitality packages, perfect for special occasions or business entertainment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {hospitalityPackages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4">
                  {pkg.icon}
                </div>
                <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                <CardDescription className="text-2xl font-bold text-primary mt-2">
                  {pkg.price}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4 text-center">{pkg.description}</p>
                <ul className="space-y-2 text-sm">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full">Book Hospitality</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Users className="h-12 w-12 text-primary" />
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg">Group Bookings Available</h3>
              <p className="text-gray-600">Special rates available for groups of 10 or more. Contact us for custom packages.</p>
            </div>
            <Button className="md:ml-auto whitespace-nowrap">Enquire Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchDayHospitalitySection;
