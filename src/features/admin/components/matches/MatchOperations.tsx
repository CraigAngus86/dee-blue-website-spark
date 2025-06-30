import { SharedAdminNav } from '../SharedAdminNav';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MatchDataTab } from './tabs/MatchDataTab';
import { LeagueTablesTab } from './tabs/LeagueTablesTab';
import { TeamsCompetitionsTab } from './tabs/TeamsCompetitionsTab';

export function MatchOperations() {
  return (
    <div className="flex">
      <SharedAdminNav />
      <div className="flex-1">
        <header className="bg-white border-b border-[#e5e7eb] px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#00105A] mb-2 m-0">Match Operations</h1>
              <p className="text-[#6b7280] m-0">Manage match results, league tables, and team data</p>
            </div>
                      </div>
        </header>

        <main className="p-8">
          {/* Tab System */}
          <Tabs defaultValue="match-data" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#f9fafb] border border-[#e5e7eb]">
              <TabsTrigger
                value="match-data"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                ✅ Match Data Management
              </TabsTrigger>
              <TabsTrigger
                value="league-tables"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                ✅ League Tables & Scraping
              </TabsTrigger>
              <TabsTrigger
                value="teams-competitions"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                📋 Teams & Competitions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="match-data" className="mt-6">
              <MatchDataTab />
            </TabsContent>

            <TabsContent value="league-tables" className="mt-6">
              <LeagueTablesTab />
            </TabsContent>

            <TabsContent value="teams-competitions" className="mt-6">
              <TeamsCompetitionsTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
