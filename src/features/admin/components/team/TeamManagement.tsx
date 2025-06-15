import { SharedAdminNav } from '../SharedAdminNav';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { Users, UserCheck } from 'lucide-react';

export function TeamManagement() {
  return (
    <div className="flex bg-[#f9fafb] min-h-screen">
      <SharedAdminNav />
      
      <div className="flex-1">
        <header className="bg-white border-b border-[#e5e7eb] px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#00105A] mb-2 m-0">Team Management</h1>
              <p className="text-[#6b7280] m-0">Manage player and staff profiles</p>
            </div>
            <div className="text-sm text-[#6b7280]">
              <span className="font-medium">Priority:</span> 📅 Low Frequency Updates
            </div>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminCard className="bg-green-50 border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="text-green-600" size={24} />
                <span className="text-lg">📅</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Player Profiles</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Transfer windows, season start</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>

            <AdminCard className="bg-green-50 border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <UserCheck className="text-green-600" size={24} />
                <span className="text-lg">��</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Staff Management</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Coaching and management team</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>
          </div>

          {/* Player Manager Wireframe */}
          <AdminCard title="👤 Player Profile Management (📅 Low Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">Player Profile Features:</h4>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• <strong>Professional photography:</strong> Cloudinary face detection optimization</li>
                  <li>• <strong>Position filtering:</strong> Goalkeeper, Defender, Midfielder, Forward</li>
                  <li>• <strong>"Made in Dee":</strong> Youth system graduate designation</li>
                  <li>• <strong>Career history:</strong> Previous clubs, appearances, goals</li>
                  <li>• <strong>Supabase sync:</strong> Auto-sync to Supabase after save</li>
                </ul>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">All Players</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">Goalkeepers</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">Defenders</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">Midfielders</div>
                  </div>
                  <div className="p-4 bg-white border border-[#e5e7eb] rounded">
                    <div className="text-xs text-[#6b7280] mb-2">PLAYER GRID:</div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="aspect-square bg-[#f3f4f6] rounded flex items-center justify-center text-xs">Player photo</div>
                      <div className="aspect-square bg-[#f3f4f6] rounded flex items-center justify-center text-xs">Player photo</div>
                      <div className="aspect-square bg-[#f3f4f6] rounded flex items-center justify-center text-xs">Player photo</div>
                      <div className="aspect-square bg-[#f3f4f6] rounded flex items-center justify-center text-xs">+ Add New</div>
                    </div>
                  </div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Player Profile Editor Modal</div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Staff Manager */}
          <AdminCard title="👔 Staff Management (📅 Low Priority)">
            <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-2 m-0">Staff Profile Management:</h4>
              <ul className="text-sm text-[#6b7280] space-y-1">
                <li>• <strong>Staff types:</strong> Manager, Coach, Staff</li>
                <li>• <strong>Roles:</strong> Manager, Assistant Manager, Goalkeeper Coach, Physiotherapist, etc.</li>
                <li>• <strong>Profile photos:</strong> Professional headshots with Cloudinary optimization</li>
                <li>• <strong>Career history:</strong> Previous positions and achievements</li>
              </ul>
            </div>
          </AdminCard>

          {/* Squad Overview */}
          <AdminCard title="📊 Squad Overview">
            <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-2 m-0">Current Implementation Notes:</h4>
              <ul className="text-sm text-[#6b7280] space-y-1">
                <li>• <strong>Team page modal system:</strong> Already established with player profiles</li>
                <li>• <strong>Position filtering:</strong> Currently working with 7 filters (consider reducing to 5-6)</li>
                <li>• <strong>Mobile optimization:</strong> Needs dropdown instead of displaying all filters</li>
                <li>• <strong>Text case consistency:</strong> Position names should be sentence case</li>
              </ul>
            </div>
          </AdminCard>
        </main>
      </div>
    </div>
  );
}
