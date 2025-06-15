import { SharedAdminNav } from '../SharedAdminNav';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FanZoneModerationTab } from './tabs/FanZoneModerationTab';
import { PollManagementTab } from './tabs/PollManagementTab';

export function CommunityManagement() {
  return (
    <div className="flex">
      <SharedAdminNav />
      <div className="flex-1">
        <header className="bg-white border-b border-[#e5e7eb] px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#00105A] mb-2 m-0">Community Management</h1>
              <p className="text-[#6b7280] m-0">Moderate fan submissions and manage community engagement</p>
            </div>
            <div className="text-sm text-[#6b7280]">
              <span className="font-medium">Priority:</span> 🔥 High Priority Moderation
            </div>
          </div>
        </header>
        <main className="p-8">
          {/* Tab System */}
          <Tabs defaultValue="fan-zone-moderation" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#f9fafb] border border-[#e5e7eb]">
              <TabsTrigger
                value="fan-zone-moderation"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                🔥 Fan Zone Moderation
              </TabsTrigger>
              <TabsTrigger
                value="poll-management"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                📅 Poll Management
              </TabsTrigger>
            </TabsList>
            <TabsContent value="fan-zone-moderation" className="mt-6">
              <FanZoneModerationTab />
            </TabsContent>
            <TabsContent value="poll-management" className="mt-6">
              <PollManagementTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
