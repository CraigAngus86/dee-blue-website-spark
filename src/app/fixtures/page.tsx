
import HeroSection from '@/components/ui/hero/HeroSection';
import Container from '@/components/ui/layout/Container';
import FixtureCalendar from '@/components/fixtures/FixtureCalendar';
import UpcomingMatches from '@/components/fixtures/UpcomingMatches';
import LeagueTable from '@/components/matches/LeagueTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FixturesAndResultsPage() {
  return (
    <main>
      <HeroSection
        title="Fixtures & Results"
        image="/assets/images/matchday/MatchDay1.jpg"
        imageAlt="Spain Park Stadium during match day"
      >
        <p className="text-white">
          Follow Banks o' Dee FC's journey through the season. View upcoming fixtures and check our latest results.
        </p>
      </HeroSection>
      
      <Container className="py-8">
        <Tabs defaultValue="fixtures" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="table">League Table</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fixtures" className="mt-4">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Upcoming Matches</h2>
                <UpcomingMatches />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Fixture Calendar</h2>
                <FixtureCalendar />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="mt-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Recent Results</h2>
              {/* Results component would go here */}
              <p>Recent match results will be displayed here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="table" className="mt-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">League Table</h2>
              <LeagueTable />
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </main>
  );
}
