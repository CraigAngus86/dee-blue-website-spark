
"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FixturesList from '@/components/ui/match/FixturesList';
import ResultsList from '@/components/ui/match/ResultsList';
import LeagueTable from '@/components/ui/match/LeagueTable';
import Container from '@/components/ui/layout/Container';
import { 
  getAvailableSeasons, 
  getAvailableCompetitions, 
  getAvailableMonths 
} from '@/lib/fixtures-data';

export default function FixturesPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>('2024/25');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedCompetitions, setSelectedCompetitions] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('fixtures');
  
  const seasons = getAvailableSeasons();
  const competitions = getAvailableCompetitions();
  const months = getAvailableMonths();

  const filterProps = {
    selectedCompetitions,
    selectedMonth,
    selectedSeason
  };

  return (
    <div className="flex flex-col min-h-screen">
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
    </div>
  );
}
