
import React from 'react';
import { Match } from '@/types/match';
import { CardNew, CardNewContent } from '@/components/ui/CardNew';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface FixtureCardProps {
  fixture: Match;
}

const AvailabilityBadge = ({ status }: { status: 'good' | 'limited' | 'soldout' }) => {
  const colors = {
    good: 'bg-green-100 text-green-800',
    limited: 'bg-amber-100 text-amber-800',
    soldout: 'bg-gray-100 text-gray-800'
  };

  const labels = {
    good: 'Good Availability',
    limited: 'Limited Availability',
    soldout: 'Sold Out'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
};

const FixtureCard = ({ fixture }: FixtureCardProps) => {
  // For demo purposes, randomize availability
  const availabilityStatus = Math.random() > 0.7 ? 'limited' : 'good';

  return (
    <CardNew elevation="sm" className="w-[300px] md:w-full flex-shrink-0">
      <CardNewContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center text-gray-500 space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {format(new Date(fixture.date), 'EEE, MMM d, yyyy')} at {fixture.time}
              </span>
            </div>
            
            <h3 className="font-bold text-primary text-lg">
              {fixture.homeTeam} vs {fixture.awayTeam}
            </h3>
            
            <p className="text-sm text-gray-600">
              {fixture.competition}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <AvailabilityBadge status={availabilityStatus} />
            <Button variant="outline" size="sm" asChild>
              <a href="#contact">Enquire Now</a>
            </Button>
          </div>
        </div>
      </CardNewContent>
    </CardNew>
  );
};

export default FixtureCard;
