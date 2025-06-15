import { SharedAdminNav } from '../SharedAdminNav';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NewsManagementTab } from './tabs/NewsManagementTab';
import { MatchReportsTab } from './tabs/MatchReportsTab';
import { MatchGalleryTab } from './tabs/MatchGalleryTab';

export function ContentManagement() {
  return (
    <div className="flex">
      <SharedAdminNav />
      <div className="flex-1">
        <header className="bg-white border-b border-[#e5e7eb] px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#00105A] mb-2 m-0">Content Management</h1>
              <p className="text-[#6b7280] m-0">Create and manage news articles, match galleries, and reports</p>
            </div>
            <div className="text-sm text-[#6b7280]">
              <span className="font-medium">Priority:</span> 🔥 High Frequency Tasks
            </div>
          </div>
        </header>
        <main className="p-8">
          {/* Tab System */}
          <Tabs defaultValue="news-management" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#f9fafb] border border-[#e5e7eb]">
              <TabsTrigger
                value="news-management"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                🔥 News Management
              </TabsTrigger>
              <TabsTrigger
                value="match-reports"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                🔥 Match Reports
              </TabsTrigger>
              <TabsTrigger
                value="match-gallery"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                ⚡ Match Gallery Creator
              </TabsTrigger>
            </TabsList>
            <TabsContent value="news-management" className="mt-6">
              <NewsManagementTab />
            </TabsContent>
            <TabsContent value="match-reports" className="mt-6">
              <MatchReportsTab />
            </TabsContent>
            <TabsContent value="match-gallery" className="mt-6">
              <MatchGalleryTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
