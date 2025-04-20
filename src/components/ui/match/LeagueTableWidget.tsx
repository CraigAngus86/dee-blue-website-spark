
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ButtonNew } from "@/components/ui/ButtonNew";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";

const LeagueTableWidget = () => {
  const formResults = [
    { result: 'W', color: 'bg-green-500' },
    { result: 'D', color: 'bg-amber-400' },
    { result: 'W', color: 'bg-green-500' },
    { result: 'W', color: 'bg-green-500' },
    { result: 'L', color: 'bg-red-500' }
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <Heading level={3} className="text-primary text-lg">
          Highland League Table
        </Heading>
        <ButtonNew 
          variant="tertiary" 
          size="sm"
          iconRight={<ChevronRight className="w-4 h-4" />}
          href="/table"
        >
          View Full Table
        </ButtonNew>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Team and position */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
            <div>
              <div className="font-semibold text-lg text-primary">Banks o' Dee FC</div>
            </div>
          </div>
          
          {/* Stats in a more detailed layout */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Points */}
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">60</div>
              <div className="text-xs text-gray-500 uppercase">Points</div>
            </div>
            
            {/* Record */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-semibold text-primary">18</div>
                <div className="text-xs text-gray-500 uppercase">Won</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-primary">6</div>
                <div className="text-xs text-gray-500 uppercase">Drawn</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-primary">4</div>
                <div className="text-xs text-gray-500 uppercase">Lost</div>
              </div>
            </div>
            
            {/* Form */}
            <div className="flex flex-col items-center">
              <div className="flex space-x-1">
                {formResults.map((result, index) => (
                  <div 
                    key={index}
                    className={`${result.color} text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold`}
                  >
                    {result.result}
                  </div>
                ))}
              </div>
              <Text size="xs" color="muted" className="uppercase mt-1">
                Form
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueTableWidget;
