
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wine, Users, Utensils, CalendarDays } from 'lucide-react';
import Image from 'next/image';

interface HospitalityPackage {
  id: string;
  title: string;
  price: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

const hospitalityPackages: HospitalityPackage[] = [
  {
    id: 'vip-package',
    title: 'VIP Matchday Package',
    price: 'From £80 per person',
    icon: <Wine className="h-8 w-8 text-primary" />,
    description: 'The ultimate VIP matchday experience at Spain Park',
    features: [
      "Directors' box seating",
      'Premium three-course meal',
      'Full complimentary bar',
      'Matchday program and team merchandise',
      'Meet the players after the match'
    ]
  },
  {
    id: 'group-package',
    title: 'Group Experience',
    price: 'From £60 per person',
    icon: <Users className="h-8 w-8 text-primary" />,
    description: 'Perfect for groups of 10+ supporters',
    features: [
      'Reserved premium seating',
      'Two-course pre-match meal',
      'Welcome drink on arrival',
      'Matchday program',
      'Group photo opportunity'
    ]
  },
  {
    id: 'dining-package',
    title: 'Pre-Match Dining',
    price: 'From £45 per person',
    icon: <Utensils className="h-8 w-8 text-primary" />,
    description: 'Enjoy fine dining before watching the match',
    features: [
      'Two-course meal in our restaurant',
      'Reserved standard seating',
      'Cash bar available',
      'Matchday program',
      'Early access to the ground'
    ]
  }
];

const MatchDayHospitalitySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Matchday Hospitality</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience Banks o' Dee FC matches in style with our premium hospitality packages.
            Perfect for entertaining clients or enjoying a special day out with family and friends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {hospitalityPackages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {pkg.icon}
                  <h3 className="text-xl font-bold ml-3">{pkg.title}</h3>
                </div>
                <p className="text-2xl font-semibold text-primary mb-2">{pkg.price}</p>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <CardContent className="bg-gray-50 border-t p-6">
                <Button className="w-full">Enquire Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-primary rounded-lg overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Private Box Experiences
              </h3>
              <p className="text-white/90 mb-6">
                For the ultimate matchday experience, our private boxes offer unparalleled luxury
                and the best views of the action at Spain Park. Available for season-long rental
                or on a match-by-match basis.
              </p>
              <div className="mt-4">
                <Button variant="secondary">
                  Request Information
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image
                src="/images/stadium/hospitality-box.jpg"
                alt="VIP Hospitality Box"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">
            <CalendarDays className="inline-block mr-2 h-6 w-6 text-primary" />
            Upcoming Hospitality Fixtures
          </h3>
          <p className="text-gray-600 mb-6">
            Plan ahead and secure your hospitality experience at one of our upcoming fixtures.
          </p>
          <Button size="lg">
            View Fixtures
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MatchDayHospitalitySection;
