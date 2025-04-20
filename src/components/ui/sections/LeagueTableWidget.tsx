
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

// A more detailed mock of the league table data
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
              <TableHead className="text-center">F</TableHead>
              <TableHead className="text-center">A</TableHead>
              <TableHead className="text-center">GD</TableHead>
              <TableHead className="text-center">Pts</TableHead>
              <TableHead className="text-right pr-4">Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leagueTableData.map((team) => (
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
                    <CompetitorLogo name={team.team} size="xs" />
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
      
      {/* League positions key */}
      <div className="text-sm text-gray-600 space-y-1 px-4">
        <div>Position 1: Champion Play-off</div>
        <div>Position 18: Relegation Play-off</div>
      </div>
    </div>
  );
};

export default LeagueTableWidget;
