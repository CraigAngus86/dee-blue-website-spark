
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ButtonNew } from "@/components/ui/ButtonNew";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import { leagueTableData } from "@/mock-data/fixturesData";

const LeagueTableWidget = () => {
  const teamData = leagueTableData.find(team => team.team.toLowerCase().includes('banks'));
  const formResults = teamData 
    ? teamData.form.slice(0, 5).map(result => {
        const color = result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-amber-400' : 'bg-red-500';
        return { result, color };
      })
    : [
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
          href="/matches"
        >
          View Full Table
        </ButtonNew>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Team and Position - 3 columns */}
          <div className="md:col-span-3 flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              {teamData ? teamData.position : 3}
            </div>
            <Text weight="bold" size="large" color="primary" className="text-lg">Banks o' Dee FC</Text>
          </div>
          
          {/* Stats Group - 6 columns */}
          <div className="md:col-span-6 flex justify-center items-center gap-8">
            <div className="text-center">
              <Text size="large" weight="bold" color="primary" className="text-3xl leading-none">
                {teamData ? teamData.points : 60}
              </Text>
              <Text size="xs" color="muted" className="uppercase mt-1">Points</Text>
            </div>
            <div className="text-center">
              <Text size="large" weight="bold" color="primary" className="text-xl leading-none">
                {teamData ? teamData.won : 18}
              </Text>
              <Text size="xs" color="muted" className="uppercase mt-1">Won</Text>
            </div>
            <div className="text-center">
              <Text size="large" weight="bold" color="primary" className="text-xl leading-none">
                {teamData ? teamData.drawn : 6}
              </Text>
              <Text size="xs" color="muted" className="uppercase mt-1">Drawn</Text>
            </div>
            <div className="text-center">
              <Text size="large" weight="bold" color="primary" className="text-xl leading-none">
                {teamData ? teamData.lost : 4}
              </Text>
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
