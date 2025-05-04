
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/ui/typography/Heading';
import { CheckCircle, XCircle } from 'lucide-react';

interface ComparisonFeature {
  feature: string;
  silver: boolean;
  gold: boolean;
  platinum: boolean;
}

const comparisonData: ComparisonFeature[] = [
  { feature: 'Match Tickets', silver: true, gold: true, platinum: true },
  { feature: 'Pre-match Buffet', silver: true, gold: true, platinum: true },
  { feature: 'Half-time Refreshments', silver: false, gold: true, platinum: true },
  { feature: 'Reserved Seating', silver: false, gold: true, platinum: true },
  { feature: 'Match Day Programme', silver: false, gold: true, platinum: true },
  { feature: 'Private Bar Access', silver: false, gold: false, platinum: true },
  { feature: 'Post-match Player Meet & Greet', silver: false, gold: false, platinum: true },
  { feature: 'Club Merchandise Pack', silver: false, gold: false, platinum: true },
];

const ComparisonSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4">Package Comparison</Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare our hospitality packages to find the perfect match for your needs
          </p>
        </div>
        
        <Card className="overflow-hidden">
          <CardHeader className="bg-slate-50">
            <CardTitle>Hospitality Packages Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Feature</th>
                    <th className="text-center p-4 border-l">Silver</th>
                    <th className="text-center p-4 border-l">Gold</th>
                    <th className="text-center p-4 border-l">Platinum</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-4">{item.feature}</td>
                      <td className="text-center p-4 border-l">
                        {item.silver ? 
                          <CheckCircle className="inline-block h-5 w-5 text-green-600" /> : 
                          <XCircle className="inline-block h-5 w-5 text-slate-300" />
                        }
                      </td>
                      <td className="text-center p-4 border-l">
                        {item.gold ? 
                          <CheckCircle className="inline-block h-5 w-5 text-green-600" /> : 
                          <XCircle className="inline-block h-5 w-5 text-slate-300" />
                        }
                      </td>
                      <td className="text-center p-4 border-l">
                        {item.platinum ? 
                          <CheckCircle className="inline-block h-5 w-5 text-green-600" /> : 
                          <XCircle className="inline-block h-5 w-5 text-slate-300" />
                        }
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 border-t">
                    <td className="p-4 font-bold">Price</td>
                    <td className="text-center p-4 border-l font-bold">£45 per person</td>
                    <td className="text-center p-4 border-l font-bold">£65 per person</td>
                    <td className="text-center p-4 border-l font-bold">£95 per person</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ComparisonSection;
