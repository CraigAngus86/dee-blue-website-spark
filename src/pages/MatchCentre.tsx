
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FixturesList from '@/components/ui/match/FixturesList';
import ResultsList from '@/components/ui/match/ResultsList';
import LeagueTable from '@/components/ui/match/LeagueTable';
import Container from '@/components/ui/layout/Container';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Check, X } from "lucide-react";
import { ButtonNew } from '@/components/ui/ButtonNew';

const MatchCentre = () => {
  const [selectedCompetitions, setSelectedCompetitions] = useState<string[]>([
    'Scottish Highland Football League',
    'Highland League Cup',
    'Scottish Challenge Cup'
  ]);

  const competitions = [
    'Scottish Highland Football League',
    'Highland League Cup',
    'Scottish Challenge Cup'
  ];

  const handleCompetitionToggle = (competition: string) => {
    setSelectedCompetitions(prev => 
      prev.includes(competition)
        ? prev.filter(c => c !== competition)
        : [...prev, competition]
    );
  };

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
            <div className="flex justify-between items-center mb-6">
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

              <Sheet>
                <SheetTrigger asChild>
                  <ButtonNew 
                    variant="secondary" 
                    size="sm" 
                    className="ml-4"
                  >
                    Filter Competitions
                  </ButtonNew>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Competitions</SheetTitle>
                    <SheetDescription>
                      Select which competitions to display
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    {competitions.map((competition) => (
                      <div
                        key={competition}
                        className="flex items-center justify-between py-2"
                        onClick={() => handleCompetitionToggle(competition)}
                      >
                        <span className="text-sm font-medium">{competition}</span>
                        {selectedCompetitions.includes(competition) ? (
                          <Check className="h-5 w-5 text-primary" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <TabsContent value="fixtures" className="mt-6">
              <FixturesList selectedCompetitions={selectedCompetitions} />
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <ResultsList selectedCompetitions={selectedCompetitions} />
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
