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
import { leagueTableData } from "@/mock-data/fixturesData";

interface LeagueTableWidgetProps {
  className?: string;
  season?: string;
}

const LeagueTableWidget: React.FC<LeagueTableWidgetProps> = ({ 
  className, 
  season = "2024/25" 
}) => {
  const formColors: Record<string, string> = {
    W: "bg-green-500 text-white",
    D: "bg-amber-400 text-white",
    L: "bg-red-500 text-white",
    "-": "bg-gray-300 text-gray-600"
  };
  
  const tableData = season === "2025/26" 
    ? getEmptyLeagueTable() 
    : leagueTableData;
  
  return (
    <div className={`${className}`}>
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
              <TableHead className="text-center">F</TableHead>
              <TableHead className="text-center">A</TableHead>
              <TableHead className="text-center">GD</TableHead>
              <TableHead className="text-center">Pts</TableHead>
              <TableHead className="text-right pr-4">Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((team) => (
              <TableRow 
                key={team.position} 
                className={team.team.toLowerCase().includes("banks") ? 
                  "bg-primary/5 font-medium" : 
                  team.position % 2 === 0 ? "bg-gray-50" : ""
                }
              >
                <TableCell className="font-semibold">{team.position}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex-shrink-0">
                      <CompetitorLogo name={team.team} size="sm" className="w-full h-full" />
                    </div>
                    <span className={team.team.toLowerCase().includes("banks") ? "font-semibold" : ""}>{team.team}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{team.played}</TableCell>
                <TableCell className="text-center">{team.won}</TableCell>
                <TableCell className="text-center">{team.drawn}</TableCell>
                <TableCell className="text-center">{team.lost}</TableCell>
                <TableCell className="text-center">{team.goalsFor}</TableCell>
                <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                <TableCell className="text-center font-medium">
                  {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                </TableCell>
                <TableCell className="text-center font-bold">{team.points}</TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex justify-end space-x-1">
                    {team.form.slice(0, 5).map((result, idx) => (
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
      
      <div className="text-sm text-gray-600 space-y-1 px-4">
        <div>Position 1: Champion Play-off</div>
        <div>Position 18: Relegation Play-off</div>
      </div>
    </div>
  );
};

function getEmptyLeagueTable() {
  // All teams in alphabetical order
  const teams = [
    "Banks o' Dee FC",
    "Brechin City FC",
    "Brora Rangers FC",
    "Buckie Thistle FC",
    "Clachnacuddin FC",
    "Deveronvale FC",
    "Formartine United FC",
    "Forres Mechanics FC",
    "Fraserburgh FC",
    "Huntly FC",
    "Inverurie Loco Works FC",
    "Keith FC",
    "Lossiemouth FC",
    "Nairn County FC",
    "Rothes FC",
    "Strathspey Thistle FC",
    "Turriff United FC",
    "Wick Academy FC"
  ];
  
  return teams.sort().map((team, index) => ({
    position: index + 1,
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: ["-", "-", "-", "-", "-"],
    logo: ''
  }));
}

export default LeagueTableWidget;
