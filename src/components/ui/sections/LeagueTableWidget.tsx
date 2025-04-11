
import React from "react";
import CompetitorLogo from "../image/CompetitorLogo";
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

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
    W: "bg-green-500 text-white",
    D: "bg-amber-400 text-white",
    L: "bg-red-500 text-white"
  };
  
  // Get Banks o' Dee data
  const bodData = leagueTableData.find(team => team.isBOD);
  
  return (
    <div className={`${className}`}>
      {/* Modern table design */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Pos</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">P</TableHead>
              <TableHead className="text-center">W</TableHead>
              <TableHead className="text-center">D</TableHead>
              <TableHead className="text-center">L</TableHead>
              <TableHead className="text-center">Pts</TableHead>
              <TableHead className="text-right pr-4">Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leagueTableData.map((team) => (
              <TableRow 
                key={team.position} 
                className={team.isBOD ? 
                  "bg-primary/5 font-medium" : 
                  team.position % 2 === 0 ? "bg-gray-50" : ""
                }
              >
                <TableCell className="font-semibold">{team.position}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CompetitorLogo name={team.team} size="xs" />
                    <span className={team.isBOD ? "font-semibold" : ""}>{team.team}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{team.played}</TableCell>
                <TableCell className="text-center">{team.won}</TableCell>
                <TableCell className="text-center">{team.drawn}</TableCell>
                <TableCell className="text-center">{team.lost}</TableCell>
                <TableCell className="text-center font-bold">{team.points}</TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex justify-end space-x-1">
                    {team.form.map((result, idx) => (
                      <div 
                        key={idx} 
                        className={`${formColors[result]} w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Banks o' Dee Focus Strip */}
      {bodData && (
        <div className="bg-white shadow-sm rounded-lg p-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                {bodData.position}
              </div>
              <div>
                <div className="font-semibold text-lg text-primary">Banks o' Dee FC</div>
                <div className="text-sm text-gray-500">Highland League</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-8 mt-2 sm:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{bodData.points}</div>
                <div className="text-xs text-gray-500 uppercase">Points</div>
              </div>
              
              <div>
                <div className="flex space-x-1 justify-center">
                  {bodData.form.map((result, idx) => (
                    <div 
                      key={idx} 
                      className={`${formColors[result]} w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 uppercase text-center mt-1">Form</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeagueTableWidget;
