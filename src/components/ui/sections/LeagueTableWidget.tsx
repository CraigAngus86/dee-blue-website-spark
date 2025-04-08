
import React from "react";

// A simple mock of the league table data
const leagueTableData = {
  position: 3,
  played: 28,
  won: 18,
  drawn: 6,
  lost: 4,
  points: 60,
  form: ["W", "D", "W", "W", "L"]
};

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
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="block text-5xl font-bold text-primary">{leagueTableData.position}</span>
            <span className="text-sm text-gray-500">Position</span>
          </div>
          
          <div className="text-right">
            <span className="block text-2xl font-bold text-primary">{leagueTableData.points}</span>
            <span className="text-sm text-gray-500">Points</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <span className="block text-xl font-bold text-primary">{leagueTableData.played}</span>
            <span className="text-sm text-gray-500">Played</span>
          </div>
          
          <div className="text-center">
            <span className="block text-xl font-bold text-primary">{leagueTableData.won}</span>
            <span className="text-sm text-gray-500">Won</span>
          </div>
          
          <div className="text-center">
            <span className="block text-xl font-bold text-primary">{leagueTableData.lost}</span>
            <span className="text-sm text-gray-500">Lost</span>
          </div>
        </div>
        
        <div>
          <div className="mb-2 text-sm text-gray-700 font-medium">Recent Form</div>
          <div className="flex space-x-2">
            {leagueTableData.form.map((result, index) => (
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
          className="block mt-6 text-primary font-semibold hover:underline text-right"
        >
          View Full Table →
        </a>
      </div>
    </div>
  );
};

export default LeagueTableWidget;
