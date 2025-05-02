
"use client";

import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { fixtures } from '@/lib/fixtures-data';
import { MatchCardNew } from '@/components/ui/image/MatchCardNew';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SelectCompat } from '@/components/ui/select';
import LeagueTable from '@/components/ui/match/LeagueTable';

// Mock data for the league table
const mockLeagueData = [
  { position: 1, team: 'Banks o\' Dee', played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 24, goalsAgainst: 7, goalDifference: 17, points: 25 },
  { position: 2, team: 'Formartine United', played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 22, goalsAgainst: 8, goalDifference: 14, points: 23 },
  { position: 3, team: 'Buckie Thistle', played: 10, won: 7, drawn: 1, lost: 2, goalsFor: 19, goalsAgainst: 9, goalDifference: 10, points: 22 },
  { position: 4, team: 'Brechin City', played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 18, goalsAgainst: 10, goalDifference: 8, points: 20 },
  { position: 5, team: 'Fraserburgh', played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 15, goalsAgainst: 10, goalDifference: 5, points: 18 },
];

// Get unique competitions from fixtures
const competitions = Array.from(new Set(fixtures.map(fixture => fixture.competition)));

// Get unique seasons - normally would come from API
const seasons = ['2023/24', '2022/23', '2021/22'];

export default function FixturesPage() {
  const [activeTab, setActiveTab] = useState<string>('fixtures');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>(seasons[0]);
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  
  // Filter fixtures by competition if not 'All'
  const filteredFixtures = selectedCompetition === 'All' 
    ? fixtures
    : fixtures.filter(fixture => fixture.competition === selectedCompetition);
  
  // Split into upcoming and past matches
  const now = new Date();
  const upcomingFixtures = filteredFixtures.filter(fixture => 
    new Date(`${fixture.date}T${fixture.time}`) > now).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastFixtures = filteredFixtures.filter(fixture => 
    new Date(`${fixture.date}T${fixture.time}`) <= now && fixture.result).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fixtures & Results</h1>
      
      <Tabs defaultValue="fixtures" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="fixtures" className="px-6">Fixtures</TabsTrigger>
          <TabsTrigger value="results" className="px-6">Results</TabsTrigger>
          <TabsTrigger value="table" className="px-6">League Table</TabsTrigger>
        </TabsList>
        
        {/* Fixtures Tab */}
        <TabsContent value="fixtures" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium mb-1">Competition</label>
              <SelectCompat
                value={selectedCompetition}
                onValueChange={(value) => setSelectedCompetition(value)}
                className="w-full"
              >
                <option value="All">All Competitions</option>
                {competitions.map(comp => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </SelectCompat>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium mb-1">Season</label>
              <SelectCompat
                value={selectedSeason}
                onValueChange={(val) => setSelectedSeason(val)}
                className="w-full"
              >
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </SelectCompat>
            </div>
          </div>
          
          {upcomingFixtures.length > 0 ? (
            <div className="grid gap-6">
              {upcomingFixtures.map(fixture => (
                <MatchCardNew
                  key={fixture.id}
                  competition={fixture.competition}
                  date={fixture.date}
                  time={fixture.time}
                  venue={fixture.venue}
                  home={fixture.home}
                  away={fixture.away}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">No upcoming fixtures found</p>
            </div>
          )}
        </TabsContent>
        
        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium mb-1">Competition</label>
              <SelectCompat
                value={selectedCompetition}
                onValueChange={(value) => setSelectedCompetition(value)}
                className="w-full"
              >
                <option value="All">All Competitions</option>
                {competitions.map(comp => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </SelectCompat>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium mb-1">Month</label>
              <SelectCompat
                value={selectedMonth}
                onValueChange={(value) => setSelectedMonth(value)}
                className="w-full"
              >
                <option value="All">All Months</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                {/* Add more months as needed */}
              </SelectCompat>
            </div>
          </div>
          
          {pastFixtures.length > 0 ? (
            <div className="grid gap-6">
              {pastFixtures.map(fixture => (
                <MatchCardNew
                  key={fixture.id}
                  competition={fixture.competition}
                  date={fixture.date}
                  time={fixture.time}
                  venue={fixture.venue}
                  home={fixture.home}
                  away={fixture.away}
                  result={fixture.result}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">No past results found</p>
            </div>
          )}
        </TabsContent>
        
        {/* League Table Tab */}
        <TabsContent value="table" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Highland League Table</h2>
            <div className="w-40">
              <SelectCompat
                value={selectedSeason}
                onValueChange={(value) => setSelectedSeason(value)}
              >
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </SelectCompat>
            </div>
          </div>
          
          <LeagueTable
            selectedSeason={selectedSeason}
            data={mockLeagueData}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
