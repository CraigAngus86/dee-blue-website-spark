
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
  // Map form results to colors and styles
  const formColors: Record<string, string> = {
    W: "bg-green-500 border border-green-600",
    D: "bg-amber-400 border border-amber-500",
    L: "bg-red-500 border border-red-600"
  };
  
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 h-full ${className}`}>
      <div className="bg-primary py-3 px-4">
        <h2 className="text-white font-bold text-xl">League Table</h2>
      </div>
      
      <div className="p-4">
        {/* Table Header - Improved styling */}
        <div className="grid grid-cols-12 text-xs font-semibold text-gray-700 mb-2 pb-2 border-b border-medium-gray bg-gray-50 p-2 rounded">
          <div className="col-span-1 text-center">Pos</div>
          <div className="col-span-5 pl-1">Team</div>
          <div className="col-span-1 text-center">P</div>
          <div className="col-span-1 text-center">W</div>
          <div className="col-span-1 text-center">D</div>
          <div className="col-span-1 text-center">L</div>
          <div className="col-span-2 text-right pr-1">Pts</div>
        </div>
        
        {/* Team Rows - With alternating backgrounds */}
        {leagueTableData.map((team, idx) => (
          <div 
            key={team.position}
            className={`grid grid-cols-12 py-2.5 text-sm items-center ${
              idx % 2 === 0 ? "bg-gray-50" : ""
            } ${
              team.isBOD ? "bg-primary/5 font-semibold rounded border-l-4 border-primary" : ""
            }`}
          >
            <div className="col-span-1 text-center font-semibold">{team.position}</div>
            <div className="col-span-5 flex items-center gap-2 pl-1">
              <CompetitorLogo name={team.team} size="xs" />
              <span className="truncate">{team.team}</span>
            </div>
            <div className="col-span-1 text-center">{team.played}</div>
            <div className="col-span-1 text-center">{team.won}</div>
            <div className="col-span-1 text-center">{team.drawn}</div>
            <div className="col-span-1 text-center">{team.lost}</div>
            <div className="col-span-2 text-right font-bold pr-1">{team.points}</div>
          </div>
        ))}
        
        {/* Form Guide - Enhanced with better styling */}
        <div className="mt-6 pt-4 border-t border-medium-gray">
          <h3 className="text-sm font-semibold mb-3">Banks o' Dee Form</h3>
          <div className="flex space-x-2 mb-4">
            {leagueTableData[2].form.map((result, index) => (
              <div 
                key={index} 
                className={`${formColors[result]} w-8 h-8 rounded-full flex items-center justify-center shadow-md`}
              >
                <span className="text-white font-bold text-sm">{result}</span>
              </div>
            ))}
          </div>
          
          {/* Form legend */}
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
