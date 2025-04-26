
import React, { useState, useEffect, useMemo } from 'react';
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
import { Skeleton } from "@/components/ui/skeleton";
import { 
  getAvailableCompetitions,
  getAvailableMonths,
  getAvailableSeasons,
  getAllFixtures
} from '@/mock-data/fixturesData';

const MatchCentre = () => {
  const [selectedSeason, setSelectedSeason] = useState<string>('2025/26');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedCompetitions, setSelectedCompetitions] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('fixtures');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [seasons, setSeasons] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [competitions, setCompetitions] = useState<string[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const allFixtures = getAllFixtures();
        console.log("All fixtures data loaded:", allFixtures.length);
        
        setSeasons(getAvailableSeasons());
        setMonths(['all', ...getAvailableMonths()]);
        setCompetitions(getAvailableCompetitions());
        console.log("Match Centre filters loaded:", {
          seasons: getAvailableSeasons(),
          months: getAvailableMonths(),
          competitions: getAvailableCompetitions()
        });
      } catch (error) {
        console.error("Error loading match centre data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  useEffect(() => {
    console.log("State changed:");
    console.log("- selectedTab:", selectedTab);
    console.log("- selectedMonth:", selectedMonth);
    console.log("- selectedCompetitions:", selectedCompetitions);
  }, [selectedTab, selectedMonth, selectedCompetitions]);

  const filterProps = useMemo(() => ({
    selectedCompetitions,
    selectedMonth,
    selectedSeason
  }), [selectedCompetitions, selectedMonth, selectedSeason]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50">
          <div className="relative bg-[#00105A] h-48">
            <div className="absolute inset-0 opacity-20">
              <Skeleton className="w-full h-full" />
            </div>
            <Container>
              <div className="relative pt-20 pb-8">
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-6 w-80" />
              </div>
            </Container>
          </div>
          <Container className="py-8">
            <Skeleton className="h-12 w-full mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="relative h-[40vh] min-h-[300px] w-full bg-[#00105A]">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ 
              backgroundImage: `url(/assets/images/stadium/Spain Park.jpg)`,
              backgroundPosition: "center 30%"
            }}
          >
            <div className="absolute inset-0 bg-[#00105A]/60 z-10"></div>
          </div>
          
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
              Match Centre
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-inter">
              View fixtures, results and league standings
            </p>
          </div>
        </div>

        <div className="bg-[#F4F7FB] py-8">
          <Container>
            <Tabs 
              defaultValue="fixtures" 
              className="w-full"
              onValueChange={(value) => {
                console.log("Tab changed to:", value);
                setSelectedTab(value);
              }}
            >
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
                    onValueChange={(val) => {
                      console.log("Month selection changed to:", val);
                      setSelectedMonth(val);
                    }}
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
                      const newValue = value !== 'all' ? [value] : [];
                      console.log("Competition selection changed to:", newValue);
                      setSelectedCompetitions(newValue);
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

              <TabsContent value="fixtures" className="mt-6">
                <FixturesList {...filterProps} />
              </TabsContent>

              <TabsContent value="results" className="mt-6">
                <ResultsList {...filterProps} />
              </TabsContent>

              <TabsContent value="table" className="mt-6">
                <LeagueTable selectedSeason={selectedSeason} />
              </TabsContent>
            </Tabs>
          </Container>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MatchCentre;
