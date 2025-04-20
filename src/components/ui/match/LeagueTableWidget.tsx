
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
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Team and Position - 3 columns */}
          <div className="md:col-span-3 flex items-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
              3
            </div>
            <div>
              <Text weight="bold" size="xl" color="primary">Banks o' Dee FC</Text>
            </div>
          </div>
          
          {/* Points - 2 columns */}
          <div className="md:col-span-2 text-center">
            <Text size="3xl" weight="bold" color="primary" className="leading-none">60</Text>
            <Text size="xs" color="muted" className="uppercase mt-1">Points</Text>
          </div>
          
          {/* Stats - 4 columns */}
          <div className="md:col-span-4 flex justify-center gap-8">
            <div className="text-center">
              <Text size="2xl" weight="bold" color="primary" className="leading-none">18</Text>
              <Text size="xs" color="muted" className="uppercase mt-1">Won</Text>
            </div>
            <div className="text-center">
              <Text size="2xl" weight="bold" color="primary" className="leading-none">6</Text>
              <Text size="xs" color="muted" className="uppercase mt-1">Drawn</Text>
            </div>
            <div className="text-center">
              <Text size="2xl" weight="bold" color="primary" className="leading-none">4</Text>
              <Text size="xs" color="muted" className="uppercase mt-1">Lost</Text>
            </div>
          </div>
          
          {/* Form - 3 columns */}
          <div className="md:col-span-3">
            <div className="flex flex-col items-end">
              <div className="flex space-x-2 mb-1">
                {formResults.map((result, index) => (
                  <div 
                    key={index}
                    className={`${result.color} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium`}
                  >
                    {result.result}
                  </div>
                ))}
              </div>
              <Text size="xs" color="muted" className="uppercase">
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
