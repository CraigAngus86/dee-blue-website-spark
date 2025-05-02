
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Fixture } from '@/lib/fixtures-data';

interface FixturesListProps {
  fixtures: Fixture[];
}

const FixturesList: React.FC<FixturesListProps> = ({ fixtures }) => {
  return (
    <div className="space-y-4">
      {fixtures.map((fixture) => (
        <div key={fixture.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {format(parseISO(fixture.date), 'dd MMM yyyy')} • {fixture.time}
            </span>
            <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              {fixture.competition}
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <img 
                  src={fixture.home.logo} 
                  alt={fixture.home.name} 
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-medium">{fixture.home.name.includes("Banks") ? "Home" : fixture.home.name}</span>
            </div>
            
            <span className="text-sm font-bold">VS</span>
            
            <div className="flex items-center gap-2">
              <span className="font-medium">{fixture.away.name.includes("Banks") ? "Home" : fixture.away.name}</span>
              <div className="w-8 h-8 relative">
                <img 
                  src={fixture.away.logo} 
                  alt={fixture.away.name} 
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mt-3">
            {fixture.venue}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FixturesList;
