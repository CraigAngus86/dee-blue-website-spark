
import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonNew } from '@/components/ui/ButtonNew';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ComparisonTableProps {
  data: Array<{
    name: string;
    matchDaySponsor: boolean | string;
    matchBallSponsor: boolean | string;
    standardHospitality: boolean | string;
    isPremium?: boolean;
  }>;
  prices: {
    matchDaySponsor: string;
    matchBallSponsor: string;
    standardHospitality: string;
  };
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data, prices }) => {
  return (
    <div className="relative overflow-x-auto border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/10">
            <TableHead className="w-[200px] font-semibold text-primary">Package Features</TableHead>
            <TableHead className="text-center font-semibold text-primary">
              Match Day Sponsor<br/><span className="text-accent font-bold">{prices.matchDaySponsor}</span>
            </TableHead>
            <TableHead className="text-center font-semibold text-primary">
              Match Ball Sponsor<br/><span className="text-accent font-bold">{prices.matchBallSponsor}</span>
            </TableHead>
            <TableHead className="text-center font-semibold text-primary">
              Standard Hospitality<br/><span className="text-accent font-bold">{prices.standardHospitality}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((feature, index) => (
            <TableRow key={index} className={cn(feature.isPremium && "bg-secondary/10")}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell className="text-center">
                {typeof feature.matchDaySponsor === 'boolean' ? (
                  feature.matchDaySponsor ? (
                    <Check className="mx-auto text-green-500" size={20} />
                  ) : (
                    <X className="mx-auto text-gray-400" size={20} />
                  )
                ) : (
                  feature.matchDaySponsor
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.matchBallSponsor === 'boolean' ? (
                  feature.matchBallSponsor ? (
                    <Check className="mx-auto text-green-500" size={20} />
                  ) : (
                    <X className="mx-auto text-gray-400" size={20} />
                  )
                ) : (
                  feature.matchBallSponsor
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.standardHospitality === 'boolean' ? (
                  feature.standardHospitality ? (
                    <Check className="mx-auto text-green-500" size={20} />
                  ) : (
                    <X className="mx-auto text-gray-400" size={20} />
                  )
                ) : (
                  feature.standardHospitality
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="border-t-2 border-gray-200">
            <TableCell />
            <TableCell className="text-center">
              <ButtonNew
                variant="primary"
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Enquire Now
              </ButtonNew>
            </TableCell>
            <TableCell className="text-center">
              <ButtonNew
                variant="primary"
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Enquire Now
              </ButtonNew>
            </TableCell>
            <TableCell className="text-center">
              <ButtonNew
                variant="primary"
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Enquire Now
              </ButtonNew>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
