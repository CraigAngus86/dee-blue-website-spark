import { SharedAdminNav } from '../SharedAdminNav';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlayerManagementTab } from './tabs/PlayerManagementTab';
import { StaffManagementTab } from './tabs/StaffManagementTab';

export function TeamManagement() {
  return (
    <div className="flex">
      <SharedAdminNav />
      <div className="flex-1">
        <header className="bg-white border-b border-[#e5e7eb] px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#00105A] mb-2 m-0">Team Management</h1>
              <p className="text-[#6b7280] m-0">Manage player and staff profiles</p>
            </div>
            
          </div>
        </header>
        <main className="p-8">
          {/* Tab System */}
          <Tabs defaultValue="player-management" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#f9fafb] border border-[#e5e7eb]">
              <TabsTrigger
                value="player-management"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                ✅ Player Management
              </TabsTrigger>
              <TabsTrigger
                value="staff-management"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                ✅ Staff Management
              </TabsTrigger>
            </TabsList>
            <TabsContent value="player-management" className="mt-6">
              <PlayerManagementTab />
            </TabsContent>
            <TabsContent value="staff-management" className="mt-6">
              <StaffManagementTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
