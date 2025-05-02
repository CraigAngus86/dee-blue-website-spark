
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Fixture } from '@/lib/fixtures-data';

interface ResultsListProps {
  results: Fixture[];
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  return (
    <div className="space-y-4">
      {results.map((result) => (
        <div key={result.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {format(parseISO(result.date), 'dd MMM yyyy')}
            </span>
            <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              {result.competition}
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <img 
                  src={result.home.logo} 
                  alt={result.home.name} 
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-medium">{result.home.name.includes("Banks") ? "Home" : result.home.name}</span>
            </div>
            
            {result.result && (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{result.result.homeScore}</span>
                <span className="text-sm">-</span>
                <span className="text-lg font-bold">{result.result.awayScore}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <span className="font-medium">{result.away.name.includes("Banks") ? "Home" : result.away.name}</span>
              <div className="w-8 h-8 relative">
                <img 
                  src={result.away.logo} 
                  alt={result.away.name} 
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
          
          {result.result?.matchReportLink && (
            <div className="mt-3 text-right">
              <a 
                href={result.result.matchReportLink} 
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Match Report
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultsList;
