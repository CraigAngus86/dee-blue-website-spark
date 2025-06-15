import { SharedAdminNav } from '../SharedAdminNav';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { Camera, Star, BarChart } from 'lucide-react';

export function CommunityManagement() {
  return (
    <div className="flex bg-[#f9fafb] min-h-screen">
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

        <main className="p-8 space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminCard className="bg-red-50 border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <Camera className="text-red-600" size={24} />
                <span className="text-lg">🔥</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Fan Photo Moderation</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Ongoing submissions need quick approval</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>

            <AdminCard className="bg-amber-50 border-amber-200">
              <div className="flex items-center space-x-3 mb-4">
                <Star className="text-amber-600" size={24} />
                <span className="text-lg">⚡</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Fan of the Month</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Monthly cycle management</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>

            <AdminCard className="bg-green-50 border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart className="text-green-600" size={24} />
                <span className="text-lg">📅</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Poll Management</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Monthly engagement campaigns</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>
          </div>

          {/* Fan Photo Moderation Wireframe */}
          <AdminCard title="📷 Fan Photo Moderation (🔥 High Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">Moderation Workflow:</h4>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• <strong>Status workflow:</strong> pending → approved → featured → declined</li>
                  <li>• <strong>Batch approval:</strong> Efficient processing capabilities</li>
                  <li>• <strong>Social permissions:</strong> Track user consent for social media</li>
                  <li>• <strong>Proven patterns:</strong> Follow Fan Zone form validation (5MB limit, JPG/PNG)</li>
                </ul>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">Pending (3)</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">Approved (45)</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">Featured (12)</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">Declined (8)</div>
                  </div>
                  <div className="p-4 bg-white border border-[#e5e7eb] rounded">
                    <div className="text-xs text-[#6b7280] mb-2">PHOTO REVIEW GRID:</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-square bg-[#f3f4f6] rounded flex items-center justify-center text-xs">Photo thumbnail</div>
                      <div className="aspect-square bg-[#f3f4f6] rounded flex items-center justify-center text-xs">Photo thumbnail</div>
                      <div className="aspect-square bg-[#f3f4f6] rounded flex items-center justify-center text-xs">Photo thumbnail</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-green-100 border border-green-300 rounded text-xs text-center">✅ Approve</div>
                    <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-center">⭐ Feature</div>
                    <div className="p-2 bg-red-100 border border-red-300 rounded text-xs text-center">❌ Decline</div>
                  </div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Fan of Month Manager */}
          <AdminCard title="⭐ Fan of the Month Manager (⚡ Medium Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">Category Management:</h4>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• <strong>5 categories:</strong> Loyal Legend, Rising Together, Community Champion, Match Day Magic, Next Generation</li>
                  <li>• <strong>Story validation:</strong> 20-60 word requirement</li>
                  <li>• <strong>Photo gallery:</strong> Multiple images with featured selection</li>
                </ul>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-2 text-sm text-[#6b7280]">
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Category Filter Tabs</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Submission Review Cards</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Story Word Count Validation</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Featured Selection Interface</div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Poll Manager */}
          <AdminCard title="📊 Poll Creation & Management (📅 Low Priority)">
            <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-2 m-0">Poll Lifecycle Management:</h4>
              <ul className="text-sm text-[#6b7280] space-y-1">
                <li>• <strong>Status workflow:</strong> draft → active → closed → archived</li>
                <li>• <strong>Active constraint:</strong> Only one poll active at a time (⭐ indicator)</li>
                <li>• <strong>Supabase integration:</strong> Real-time vote monitoring via supabasePollId</li>
                <li>• <strong>Categories:</strong> competitions, player of month, predictions, preferences, community</li>
              </ul>
            </div>
          </AdminCard>
        </main>
      </div>
    </div>
  );
}
