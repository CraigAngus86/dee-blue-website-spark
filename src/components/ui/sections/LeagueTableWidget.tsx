
import React from "react";
import { ChevronRight } from "lucide-react";
import CompetitorLogo from "../image/CompetitorLogo";

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
    team: "Buckie",
    played: 28,
    won: 19,
    drawn: 6,
    lost: 3,
    points: 63,
    form: ["W", "D", "W", "D", "W"],
    isBOD: false
  },
  {
    position: 3,
    team: "Banks o' Dee",
    played: 28,
    won: 18,
    drawn: 6,
    lost: 4,
    points: 60,
    form: ["W", "D", "W", "W", "L"],
    isBOD: true
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

interface LeagueTableWidgetProps {
  className?: string;
}

const LeagueTableWidget: React.FC<LeagueTableWidgetProps> = ({ className }) => {
  // Map form results to colors
  const formColors: Record<string, string> = {
    W: "bg-green-500",
    D: "bg-yellow-500",
    L: "bg-red-500"
  };
  
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 ${className}`}>
      <div className="bg-primary py-3 px-4">
        <h2 className="text-white font-bold text-xl">League Table</h2>
      </div>
      
      <div className="p-4">
        {/* Table Header */}
        <div className="grid grid-cols-12 text-xs font-semibold text-gray mb-2 pb-2 border-b border-medium-gray">
          <div className="col-span-1">Pos</div>
          <div className="col-span-5">Team</div>
          <div className="col-span-1 text-center">P</div>
          <div className="col-span-1 text-center">W</div>
          <div className="col-span-1 text-center">D</div>
          <div className="col-span-1 text-center">L</div>
          <div className="col-span-2 text-right">Pts</div>
        </div>
        
        {/* Team Rows */}
        {leagueTableData.map((team) => (
          <div 
            key={team.position}
            className={`grid grid-cols-12 py-2 text-sm items-center ${
              team.isBOD ? "bg-light-gray font-semibold" : ""
            }`}
          >
            <div className="col-span-1">{team.position}</div>
            <div className="col-span-5 flex items-center gap-2">
              <CompetitorLogo name={team.team} size="xs" />
              <span className="truncate">{team.team}</span>
            </div>
            <div className="col-span-1 text-center">{team.played}</div>
            <div className="col-span-1 text-center">{team.won}</div>
            <div className="col-span-1 text-center">{team.drawn}</div>
            <div className="col-span-1 text-center">{team.lost}</div>
            <div className="col-span-2 text-right font-bold">{team.points}</div>
          </div>
        ))}
        
        {/* Form Guide */}
        <div className="mt-6 pt-4 border-t border-medium-gray">
          <h3 className="text-sm font-semibold mb-3">Banks o' Dee Form</h3>
          <div className="flex space-x-2 mb-4">
            {leagueTableData[2].form.map((result, index) => (
              <div 
                key={index} 
                className={`${formColors[result]} w-8 h-8 rounded-full flex items-center justify-center`}
              >
                <span className="text-white font-bold">{result}</span>
              </div>
            ))}
          </div>
        </div>
        
        <a 
          href="/table" 
          className="flex items-center justify-end mt-4 text-primary font-semibold hover:underline"
        >
          View Full Table 
          <ChevronRight size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default LeagueTableWidget;
