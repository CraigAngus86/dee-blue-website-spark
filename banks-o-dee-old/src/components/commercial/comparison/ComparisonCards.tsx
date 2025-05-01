
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonNew } from '@/components/ui/ButtonNew';
import { CardNew, CardNewContent } from '@/components/ui/CardNew';
import Heading from '@/components/ui/typography/Heading';

interface ComparisonCardsProps {
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

const ComparisonCards: React.FC<ComparisonCardsProps> = ({ data, prices }) => {
  const [activePackage, setActivePackage] = useState<'matchDaySponsor' | 'matchBallSponsor' | 'standardHospitality'>('matchDaySponsor');

  const packages = [
    { key: 'matchDaySponsor', title: 'Match Day Sponsor', price: prices.matchDaySponsor },
    { key: 'matchBallSponsor', title: 'Match Ball Sponsor', price: prices.matchBallSponsor },
    { key: 'standardHospitality', title: 'Standard Hospitality', price: prices.standardHospitality },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
        {packages.map((pkg) => (
          <ButtonNew
            key={pkg.key}
            variant={activePackage === pkg.key ? 'primary' : 'secondary'}
            onClick={() => setActivePackage(pkg.key)}
            className="whitespace-nowrap"
          >
            {pkg.title}
          </ButtonNew>
        ))}
      </div>

      <CardNew>
        <CardNewContent>
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heading level={4} color="primary" className="mb-2">
                {packages.find(p => p.key === activePackage)?.title}
              </Heading>
              <Heading level={3} color="primary">
                {packages.find(p => p.key === activePackage)?.price}
              </Heading>
            </div>

            <div className="space-y-4">
              {data.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "px-4 py-3 rounded-md",
                    feature.isPremium && "bg-secondary/20"
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">{feature.name}</span>
                    <span className="flex-shrink-0">
                      {typeof feature[activePackage] === 'boolean' ? (
                        feature[activePackage] ? (
                          <Check className="text-accent" />
                        ) : (
                          <X className="text-gray" />
                        )
                      ) : (
                        feature[activePackage]
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <ButtonNew
                variant="primary"
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Enquire Now
              </ButtonNew>
            </div>
          </div>
        </CardNewContent>
      </CardNew>
    </div>
  );
};

export default ComparisonCards;
