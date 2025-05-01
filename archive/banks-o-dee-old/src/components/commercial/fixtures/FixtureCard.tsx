
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
    good: 'bg-green-100 text-green-800 border border-green-300',
    limited: 'bg-amber-100 text-amber-800 border border-amber-300',
    soldout: 'bg-gray-100 text-gray-800 border border-gray-300'
  };

  const labels = {
    good: 'Good Availability',
    limited: 'Limited Availability',
    soldout: 'Sold Out'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
};

const FixtureCard = ({ fixture }: FixtureCardProps) => {
  const availabilityStatus = Math.random() > 0.7 ? 'limited' : 'good';
  
  // Parse date safely
  const matchDate = fixture.date ? new Date(fixture.date) : new Date();
  
  return (
    <CardNew elevation="sm" className="h-full flex flex-col">
      <CardNewContent>
        <div className="flex flex-col h-full justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center text-gray-500 space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {format(matchDate, 'EEE, MMM d, yyyy')} at {fixture.time}
              </span>
            </div>
            
            <h3 className="font-bold text-primary text-lg">
              {fixture.homeTeam} vs {fixture.awayTeam}
            </h3>
            
            <p className="text-sm text-gray-600">
              {fixture.competition}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4">
            <AvailabilityBadge status={availabilityStatus} />
            <Button variant="outline" size="sm" asChild>
              <a href="#contact" className="font-semibold">Enquire Now</a>
            </Button>
          </div>
        </div>
      </CardNewContent>
    </CardNew>
  );
};

export default FixtureCard;
