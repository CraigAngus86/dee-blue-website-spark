import { SharedAdminNav } from './SharedAdminNav';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { QuickActionCards } from './dashboard/QuickActionCards';
import { StatusWidgets } from './dashboard/StatusWidgets';

export function AdminDashboard() {
  return (
    <div className="flex">
      <SharedAdminNav />
      
      <div className="flex-1">
        <header className="bg-white border-b border-[#e5e7eb] px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#00105A] mb-2 m-0">Dashboard</h1>
              <p className="text-[#6b7280] m-0">Welcome back! Here's what needs your attention today.</p>
            </div>
            <div className="text-sm text-[#6b7280]">
              <span className="font-medium">Today:</span> Saturday, 15 June 2025
            </div>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {/* Urgent Alerts Banner */}
          <AdminCard className="bg-red-50 border-red-200">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🚨</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-700 mb-2 m-0">Urgent Actions Required</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-white rounded border border-red-200">
                    <div className="text-sm font-medium text-red-700">Commercial Enquiries</div>
                    <div className="text-xs text-red-600">2 new enquiries - response needed within 24h</div>
                    <button className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200">
                      Review Now →
                    </button>
                  </div>
                  <div className="p-3 bg-white rounded border border-red-200">
                    <div className="text-sm font-medium text-red-700">Match Result</div>
                    <div className="text-xs text-red-600">Today's match vs Huntly - result not updated</div>
                    <button className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200">
                      Update Result →
                    </button>
                  </div>
                  <div className="p-3 bg-white rounded border border-red-200">
                    <div className="text-sm font-medium text-red-700">BBC Scraper</div>
                    <div className="text-xs text-red-600">Failed last night - league table not updated</div>
                    <button className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200">
                      Fix Now →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Today's Priority Workflows */}
          <div>
            <h2 className="text-xl font-semibold text-[#00105A] mb-4 m-0">🎯 Priority Tasks</h2>
            <QuickActionCards />
          </div>

          {/* Work Queue Overview */}
          <div>
            <h2 className="text-xl font-semibold text-[#00105A] mb-4 m-0">📋 Work Queue</h2>
            <StatusWidgets />
          </div>

          {/* Quick Stats & Metrics */}
          <AdminCard title="📊 This Week's Activity">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-[#f8fafc] rounded-lg border border-[#e5e7eb]">
                <div className="text-2xl font-bold text-[#00105A] mb-1">3</div>
                <div className="text-sm text-[#6b7280] mb-2">News Articles</div>
                <div className="text-xs text-green-600">↑ 2 from last week</div>
              </div>
              <div className="text-center p-4 bg-[#f8fafc] rounded-lg border border-[#e5e7eb]">
                <div className="text-2xl font-bold text-[#00105A] mb-1">12</div>
                <div className="text-sm text-[#6b7280] mb-2">Fan Photos</div>
                <div className="text-xs text-[#FFD700]">8 pending review</div>
              </div>
              <div className="text-center p-4 bg-[#f8fafc] rounded-lg border border-[#e5e7eb]">
                <div className="text-2xl font-bold text-[#00105A] mb-1">2.4K</div>
                <div className="text-sm text-[#6b7280] mb-2">Page Views</div>
                <div className="text-xs text-green-600">↑ 15% this week</div>
              </div>
              <div className="text-center p-4 bg-[#f8fafc] rounded-lg border border-[#e5e7eb]">
                <div className="text-2xl font-bold text-[#00105A] mb-1">156</div>
                <div className="text-sm text-[#6b7280] mb-2">Poll Responses</div>
                <div className="text-xs text-green-600">Current poll active</div>
              </div>
            </div>
          </AdminCard>

          {/* Recent Activity Feed */}
          <AdminCard title="📈 Recent Activity">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-[#f8fafc] rounded border border-[#e5e7eb]">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-[#374151]">News article published</div>
                      <div className="text-xs text-[#6b7280]">"Match Preview: Banks o' Dee vs Huntly FC"</div>
                    </div>
                    <span className="text-xs text-[#6b7280]">2 hours ago</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-[#f8fafc] rounded border border-[#e5e7eb]">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-[#374151]">Fan photo approved</div>
                      <div className="text-xs text-[#6b7280]">Match day photo from @BanksODeeFan87</div>
                    </div>
                    <span className="text-xs text-[#6b7280]">3 hours ago</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-[#f8fafc] rounded border border-[#e5e7eb]">
                <div className="w-2 h-2 bg-[#FFD700] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-[#374151]">Commercial enquiry received</div>
                      <div className="text-xs text-[#6b7280]">Aberdeen Construction Ltd - Match sponsorship interest</div>
                    </div>
                    <span className="text-xs text-[#6b7280]">5 hours ago</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-[#f8fafc] rounded border border-[#e5e7eb]">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-[#374151]">League table updated</div>
                      <div className="text-xs text-[#6b7280]">BBC scraper successful - Banks o' Dee now 3rd position</div>
                    </div>
                    <span className="text-xs text-[#6b7280]">Yesterday</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-[#f8fafc] rounded border border-[#e5e7eb]">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-[#374151]">Match gallery uploaded</div>
                      <div className="text-xs text-[#6b7280]">15 photos from Keith FC away match</div>
                    </div>
                    <span className="text-xs text-[#6b7280]">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-sm text-[#00105A] hover:text-[#FFD700] font-medium">
                View Full Activity Log →
              </button>
            </div>
          </AdminCard>

          {/* Upcoming Deadlines */}
          <AdminCard title="⏰ Upcoming Deadlines & Reminders">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* This Week */}
              <div>
                <h4 className="font-medium text-[#00105A] mb-3 m-0">📅 This Week:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-[#fff7ed] rounded border border-[#fed7aa]">
                    <div>
                      <div className="text-sm font-medium text-[#92400e]">Weekly news article due</div>
                      <div className="text-xs text-[#92400e]">Content deadline: Monday</div>
                    </div>
                    <span className="text-xs bg-[#fbbf24] text-white px-2 py-1 rounded">Due Soon</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#f0f9ff] rounded border border-[#7dd3fc]">
                    <div>
                      <div className="text-sm font-medium text-[#0369a1]">Away match: vs Fraserburgh</div>
                      <div className="text-xs text-[#0369a1]">Wednesday 7:45 PM</div>
                    </div>
                    <span className="text-xs bg-[#0284c7] text-white px-2 py-1 rounded">Match Day</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                    <div>
                      <div className="text-sm font-medium text-[#374151]">Fan of the Month selection</div>
                      <div className="text-xs text-[#6b7280]">Review submissions and choose winner</div>
                    </div>
                    <span className="text-xs bg-[#6b7280] text-white px-2 py-1 rounded">This Week</span>
                  </div>
                </div>
              </div>
              
              {/* Next Month */}
              <div>
                <h4 className="font-medium text-[#00105A] mb-3 m-0">📅 Coming Up:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                    <div>
                      <div className="text-sm font-medium text-[#374151]">Sponsor contract renewal</div>
                      <div className="text-xs text-[#6b7280]">Aberdeen Plumbing Services - July 1st</div>
                    </div>
                    <span className="text-xs bg-[#6b7280] text-white px-2 py-1 rounded">14 days</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                    <div>
                      <div className="text-sm font-medium text-[#374151]">Season ticket campaign</div>
                      <div className="text-xs text-[#6b7280]">2024/25 season preparation</div>
                    </div>
                    <span className="text-xs bg-[#6b7280] text-white px-2 py-1 rounded">Planning</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                    <div>
                      <div className="text-sm font-medium text-[#374151]">Player registration deadline</div>
                      <div className="text-xs text-[#6b7280]">Highland League registration window</div>
                    </div>
                    <span className="text-xs bg-[#6b7280] text-white px-2 py-1 rounded">July 15</span>
                  </div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* System Status */}
          <AdminCard title="⚙️ System Status">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                <div className="text-green-600 text-lg mb-1">✓</div>
                <div className="text-sm font-medium text-green-700">Website</div>
                <div className="text-xs text-green-600">All systems operational</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                <div className="text-green-600 text-lg mb-1">✓</div>
                <div className="text-sm font-medium text-green-700">Content Management</div>
                <div className="text-xs text-green-600">Sanity CMS healthy</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded border border-red-200">
                <div className="text-red-600 text-lg mb-1">✗</div>
                <div className="text-sm font-medium text-red-700">BBC Scraper</div>
                <div className="text-xs text-red-600">Failed last run</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                <div className="text-green-600 text-lg mb-1">✓</div>
                <div className="text-sm font-medium text-green-700">Media Storage</div>
                <div className="text-xs text-green-600">85% capacity</div>
              </div>
            </div>
          </AdminCard>
        </main>
      </div>
    </div>
  );
}
