
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
          <TableRow>
            <TableHead className="w-[200px]">Package Features</TableHead>
            <TableHead className="text-center">Match Day Sponsor<br/>{prices.matchDaySponsor}</TableHead>
            <TableHead className="text-center">Match Ball Sponsor<br/>{prices.matchBallSponsor}</TableHead>
            <TableHead className="text-center">Standard Hospitality<br/>{prices.standardHospitality}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((feature, index) => (
            <TableRow key={index} className={cn(feature.isPremium && "bg-secondary/20")}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell className="text-center">
                {typeof feature.matchDaySponsor === 'boolean' ? (
                  feature.matchDaySponsor ? (
                    <Check className="mx-auto text-accent" />
                  ) : (
                    <X className="mx-auto text-gray" />
                  )
                ) : (
                  feature.matchDaySponsor
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.matchBallSponsor === 'boolean' ? (
                  feature.matchBallSponsor ? (
                    <Check className="mx-auto text-accent" />
                  ) : (
                    <X className="mx-auto text-gray" />
                  )
                ) : (
                  feature.matchBallSponsor
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.standardHospitality === 'boolean' ? (
                  feature.standardHospitality ? (
                    <Check className="mx-auto text-accent" />
                  ) : (
                    <X className="mx-auto text-gray" />
                  )
                ) : (
                  feature.standardHospitality
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
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
