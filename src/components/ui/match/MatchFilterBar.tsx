import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MatchFilterBarProps {
  selectedSeason: string;
  selectedMonth: string;
  selectedCompetitions: string[];
  seasons: string[];
  months: string[];
  competitions: string[];
  onSeasonChange: (season: string) => void;
  onMonthChange: (month: string) => void;
  onCompetitionChange: (competitions: string[]) => void;
}

export default function MatchFilterBar({
  selectedSeason,
  selectedMonth,
  selectedCompetitions,
  seasons,
  months,
  competitions,
  onSeasonChange,
  onMonthChange,
  onCompetitionChange,
}: MatchFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <TabsList className="bg-white border flex justify-start p-1">
        <TabsTrigger 
          value="fixtures"
          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Fixtures
        </TabsTrigger>
        <TabsTrigger 
          value="results"
          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Results
        </TabsTrigger>
        <TabsTrigger 
          value="table"
          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          League Table
        </TabsTrigger>
      </TabsList>

      <div className="flex flex-wrap gap-2">
        <Select
          value={selectedSeason}
          onValueChange={onSeasonChange}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Season" />
          </SelectTrigger>
          <SelectContent>
            {seasons.map((season) => (
              <SelectItem key={season} value={season}>
                {season}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedMonth}
          onValueChange={onMonthChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all-months" value="all">All Months</SelectItem>
            {months.filter(m => m !== 'all').map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedCompetitions[0] || 'all'}
          onValueChange={(value) => {
            onCompetitionChange(value !== 'all' ? [value] : []);
          }}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="All Competitions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all-competitions" value="all">All Competitions</SelectItem>
            {competitions.map((competition) => (
              <SelectItem key={competition} value={competition}>
                {competition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
