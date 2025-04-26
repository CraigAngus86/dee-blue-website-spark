
'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FixturesList from '@/components/ui/match/FixturesList';
import ResultsList from '@/components/ui/match/ResultsList';
import LeagueTable from '@/components/ui/match/LeagueTable';
import Container from '@/components/ui/layout/Container';
import MatchFilterBar from '@/components/ui/match/MatchFilterBar';
import { 
  getAvailableCompetitions,
  getAvailableMonths,
  getAvailableSeasons,
} from '@/mock-data/fixturesData';

const MatchCentre = () => {
  const [selectedSeason, setSelectedSeason] = useState<string>('2025/26');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedCompetitions, setSelectedCompetitions] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('fixtures');

  const [seasons, setSeasons] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [competitions, setCompetitions] = useState<string[]>([]);
  
  useEffect(() => {
    setSeasons(getAvailableSeasons());
    setMonths(['all', ...getAvailableMonths()]);
    setCompetitions(getAvailableCompetitions());
  }, []);

  const filterProps = {
    selectedCompetitions,
    selectedMonth,
    selectedSeason
  };

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
              <MatchFilterBar
                selectedSeason={selectedSeason}
                selectedMonth={selectedMonth}
                selectedCompetitions={selectedCompetitions}
                seasons={seasons}
                months={months}
                competitions={competitions}
                onSeasonChange={setSelectedSeason}
                onMonthChange={setSelectedMonth}
                onCompetitionChange={setSelectedCompetitions}
              />

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
