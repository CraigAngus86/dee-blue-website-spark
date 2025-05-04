
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle } from 'lucide-react';

const ComparisonSection: React.FC = () => {
  const benefits = [
    { name: 'Logo on Club Website', bronze: true, silver: true, gold: true, platinum: true },
    { name: 'Social Media Mentions', bronze: true, silver: true, gold: true, platinum: true },
    { name: 'Match Program Advertisement', bronze: false, silver: true, gold: true, platinum: true },
    { name: 'Pitch-side Advertising Board', bronze: false, silver: true, gold: true, platinum: true },
    { name: 'Company Announcements During Matches', bronze: false, silver: false, gold: true, platinum: true },
    { name: 'Logo on Training Kit', bronze: false, silver: false, gold: true, platinum: true },
    { name: 'Logo on Match Kit', bronze: false, silver: false, gold: false, platinum: true },
    { name: 'Hospitality Package', bronze: false, silver: '2 tickets', gold: '4 tickets', platinum: '6 tickets + VIP' },
    { name: 'Player Appearances', bronze: false, silver: '1 per season', gold: '2 per season', platinum: 'Unlimited' },
    { name: 'Named Match Sponsor', bronze: false, silver: false, gold: '1 match', platinum: '3 matches' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Compare Partnership Packages</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            See at a glance which sponsorship package best suits your business needs and objectives.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-primary text-white">
                <TableHead className="border">Benefit</TableHead>
                <TableHead className="text-center border">Bronze<br /><span className="text-sm opacity-80">£500/season</span></TableHead>
                <TableHead className="text-center border">Silver<br /><span className="text-sm opacity-80">£1,500/season</span></TableHead>
                <TableHead className="text-center border">Gold<br /><span className="text-sm opacity-80">£3,000/season</span></TableHead>
                <TableHead className="text-center border">Platinum<br /><span className="text-sm opacity-80">£5,000+/season</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benefits.map((benefit, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell className="border font-medium">{benefit.name}</TableCell>
                  <TableCell className="text-center border">
                    {renderBenefitValue(benefit.bronze)}
                  </TableCell>
                  <TableCell className="text-center border">
                    {renderBenefitValue(benefit.silver)}
                  </TableCell>
                  <TableCell className="text-center border">
                    {renderBenefitValue(benefit.gold)}
                  </TableCell>
                  <TableCell className="text-center border">
                    {renderBenefitValue(benefit.platinum)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-500 mb-4">All packages can be customized to meet your specific business needs</p>
          <p className="font-bold text-primary">Contact our commercial team for a bespoke partnership proposal</p>
        </div>
      </div>
    </section>
  );
};

function renderBenefitValue(value: boolean | string) {
  if (typeof value === 'boolean') {
    return value ? 
      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : 
      <XCircle className="h-5 w-5 text-gray-300 mx-auto" />;
  }
  return value;
}

export default ComparisonSection;
