
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FixturesList from '@/components/ui/match/FixturesList';
import ResultsList from '@/components/ui/match/ResultsList';
import LeagueTable from '@/components/ui/match/LeagueTable';
import Container from '@/components/ui/layout/Container';
import { 
  getAvailableCompetitions,
  getAvailableMonths,
  getAvailableSeasons,
  getAllFixtures
} from '@/mock-data/fixturesData';

const MatchCentre = () => {
  const [selectedSeason, setSelectedSeason] = useState<string>('2024/25');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedCompetitions, setSelectedCompetitions] = useState<string[]>([]);

  // Refresh the available options when the component mounts
  const [seasons, setSeasons] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [competitions, setCompetitions] = useState<string[]>([]);
  
  useEffect(() => {
    // Get and log all fixture data to verify it's loading correctly
    const allFixtures = getAllFixtures();
    console.log("All fixtures data loaded:", allFixtures.length);
    
    setSeasons(getAvailableSeasons());
    setMonths(getAvailableMonths());
    setCompetitions(getAvailableCompetitions());
    console.log("Match Centre filters loaded:", {
      seasons: getAvailableSeasons(),
      months: getAvailableMonths(),
      competitions: getAvailableCompetitions()
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="relative bg-[#00105A] h-48">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/assets/images/stadium/Spain Park.jpg" 
              alt="Spain Park Stadium" 
              className="w-full h-full object-cover"
            />
          </div>
          <Container>
            <div className="relative pt-20 pb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Match Centre</h1>
              <p className="text-gray-300">View fixtures, results and league standings</p>
            </div>
          </Container>
        </div>

        <Container className="py-8">
          <Tabs defaultValue="fixtures" className="w-full">
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
                  onValueChange={setSelectedSeason}
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
                  onValueChange={setSelectedMonth}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="all-months" value="all">All Months</SelectItem>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedCompetitions[0] || 'all'}
                  onValueChange={(value) => setSelectedCompetitions(value !== 'all' ? [value] : [])}
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

            <TabsContent value="fixtures" className="mt-6">
              <FixturesList 
                selectedCompetitions={selectedCompetitions}
                selectedMonth={selectedMonth === 'all' ? '' : selectedMonth}
                selectedSeason={selectedSeason}
              />
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <ResultsList 
                selectedCompetitions={selectedCompetitions}
                selectedMonth={selectedMonth === 'all' ? '' : selectedMonth}
                selectedSeason={selectedSeason}
              />
            </TabsContent>

            <TabsContent value="table" className="mt-6">
              <LeagueTable />
            </TabsContent>
          </Tabs>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default MatchCentre;
