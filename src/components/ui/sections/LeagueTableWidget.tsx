
import React from "react";
import { ChevronRight } from "lucide-react";
import CompetitorLogo from "../image/CompetitorLogo";
import Text from "@/components/ui/typography/Text";
import { cn } from "@/lib/utils";

// A more detailed mock of the league table data
const leagueTableData = [
  {
    position: 1,
    team: "Brechin",
    played: 28,
    won: 20,
    drawn: 5,
    lost: 3,
    points: 65,
    form: ["W", "W", "W", "D", "W"],
    isBOD: false
  },
  {
    position: 2,
    team: "Banks o' Dee",
    played: 28,
    won: 19,
    drawn: 6,
    lost: 3,
    points: 60,
    form: ["W", "D", "W", "W", "L"],
    isBOD: true
  },
  {
    position: 3,
    team: "Buckie",
    played: 28,
    won: 18,
    drawn: 6,
    lost: 4,
    points: 58,
    form: ["W", "D", "W", "D", "W"],
    isBOD: false
  },
  {
    position: 4,
    team: "Fraserburgh",
    played: 28,
    won: 17,
    drawn: 5,
    lost: 6,
    points: 56,
    form: ["L", "W", "W", "D", "W"],
    isBOD: false
  },
  {
    position: 5,
    team: "Formartine",
    played: 28,
    won: 16,
    drawn: 4,
    lost: 8,
    points: 52,
    form: ["W", "L", "W", "D", "W"],
    isBOD: false
  }
];

// Get Banks o' Dee's data
const bodData = leagueTableData.find(team => team.isBOD);

interface LeagueTableWidgetProps {
  className?: string;
}

const LeagueTableWidget: React.FC<LeagueTableWidgetProps> = ({ className }) => {
  // Map form results to colors and styles
  const formColors: Record<string, string> = {
    W: "bg-green-500",
    D: "bg-amber-400",
    L: "bg-red-500"
  };
  
  return (
    <div className={`w-full ${className}`}>
      {/* Banks o' Dee Position Card */}
      <div className="flex items-stretch w-full bg-white rounded-lg shadow-sm mb-4 p-4">
        {/* Position and Team */}
        <div className="flex items-center pr-8 border-r border-gray-100">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3 text-lg">
            {bodData?.position}
          </div>
          <div>
            <Text as="div" weight="bold" color="primary">Banks o' Dee FC</Text>
            <Text as="div" size="small" color="muted">Highland League</Text>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 flex-1 pl-8">
          {/* Matches */}
          <div className="text-center">
            <Text as="div" size="small" weight="bold" color="primary">{bodData?.played}</Text>
            <Text as="div" size="xs" color="muted">PLAYED</Text>
          </div>
          
          {/* Record */}
          <div className="text-center">
            <Text as="div" size="small" weight="bold" color="primary">
              {bodData?.won}W {bodData?.drawn}D {bodData?.lost}L
            </Text>
            <Text as="div" size="xs" color="muted">RECORD</Text>
          </div>
          
          {/* Points */}
          <div className="text-center">
            <Text as="div" size="large" weight="bold" color="primary">{bodData?.points}</Text>
            <Text as="div" size="xs" color="muted">POINTS</Text>
          </div>
          
          {/* Form */}
          <div className="flex flex-col items-center">
            <div className="flex space-x-1">
              {bodData?.form.map((result, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-semibold",
                    formColors[result]
                  )}
                >
                  {result}
                </div>
              ))}
            </div>
            <Text as="div" size="xs" color="muted" className="mt-1">FORM</Text>
          </div>
        </div>
      </div>
      
      {/* Mini League Table */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 px-2 font-semibold text-gray-600 w-8">#</th>
              <th className="text-left py-2 px-2 font-semibold text-gray-600">Team</th>
              <th className="text-center py-2 px-2 font-semibold text-gray-600 w-12">P</th>
              <th className="text-center py-2 px-2 font-semibold text-gray-600 w-12">W</th>
              <th className="text-center py-2 px-2 font-semibold text-gray-600 w-12">D</th>
              <th className="text-center py-2 px-2 font-semibold text-gray-600 w-12">L</th>
              <th className="text-right py-2 px-2 font-semibold text-gray-600 w-16">PTS</th>
            </tr>
          </thead>
          <tbody>
            {leagueTableData.map((team) => (
              <tr 
                key={team.position}
                className={cn(
                  "border-b border-gray-50",
                  team.isBOD ? "bg-primary/5 font-semibold" : ""
                )}
              >
                <td className="py-2 px-2 text-center">
                  {team.position}
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center">
                    <CompetitorLogo name={team.team} size="xs" className="mr-2" />
                    <span>{team.team}</span>
                  </div>
                </td>
                <td className="py-2 px-2 text-center">{team.played}</td>
                <td className="py-2 px-2 text-center">{team.won}</td>
                <td className="py-2 px-2 text-center">{team.drawn}</td>
                <td className="py-2 px-2 text-center">{team.lost}</td>
                <td className="py-2 px-2 text-right font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Form legend */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Win</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-400 mr-1"></div>
              <span>Draw</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span>Loss</span>
            </div>
          </div>
          
          <a 
            href="/table" 
            className="flex items-center text-primary font-semibold hover:underline text-sm"
          >
            View Full Table 
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeagueTableWidget;
