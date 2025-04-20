
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FixturesList from '@/components/ui/match/FixturesList';
import ResultsList from '@/components/ui/match/ResultsList';
import LeagueTable from '@/components/ui/match/LeagueTable';
import Container from '@/components/ui/layout/Container';

const MatchCentre = () => {
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
            <TabsList className="bg-white border w-full flex justify-start mb-6 p-1">
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

            <TabsContent value="fixtures" className="mt-6">
              <FixturesList />
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <ResultsList />
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
