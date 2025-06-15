import { SharedAdminNav } from '../SharedAdminNav';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { Trophy, Users, BarChart3 } from 'lucide-react';

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
            <div className="text-sm text-[#6b7280]">
              <span className="font-medium">Priority:</span> 🔥 High Priority Updates
            </div>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {/* Rest of content unchanged */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminCard className="bg-red-50 border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <Trophy className="text-red-600" size={24} />
                <span className="text-lg">🔥</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Match Updates</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Every Saturday + midweek games</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>

            <AdminCard className="bg-amber-50 border-amber-200">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="text-amber-600" size={24} />
                <span className="text-lg">⚡</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">League Tables</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">BBC scraper + manual override</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>

            <AdminCard className="bg-green-50 border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="text-green-600" size={24} />
                <span className="text-lg">📅</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Teams & Competitions</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Season setup, occasional updates</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>
          </div>

          {/* Match Data Manager Wireframe */}
          <AdminCard title="🎯 Match Data Manager (🔥 High Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">Supabase Data Requirements:</h4>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• <strong>166 matches total:</strong> NEEDS pagination (25-50 per page)</li>
                  <li>• <strong>37 teams:</strong> Searchable dropdown (UUID backend population)</li>
                  <li>• <strong>8 competitions:</strong> Simple dropdown</li>
                  <li>• <strong>4 seasons:</strong> Simple dropdown</li>
                  <li>• <strong>Critical fields:</strong> hospitality_available, is_highlighted, gallery_idsanity, match_report_link</li>
                </ul>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded">Season Dropdown Filter</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded">Competition Dropdown Filter</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded">Status Dropdown Filter</div>
                  </div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Search by Team Name Input</div>
                  <div className="p-4 bg-white border border-[#e5e7eb] rounded">
                    <div className="text-xs text-[#6b7280] mb-2">MATCH RESULTS TABLE (Paginated):</div>
                    <div className="grid grid-cols-7 gap-2 text-xs">
                      <div className="font-medium">Date</div>
                      <div className="font-medium">Home Team</div>
                      <div className="font-medium">Away Team</div>
                      <div className="font-medium">Score</div>
                      <div className="font-medium">Status</div>
                      <div className="font-medium">Hospitality</div>
                      <div className="font-medium">Actions</div>
                    </div>
                    <div className="mt-2 text-[#9ca3af]">... table rows here ...</div>
                  </div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Pagination Controls (Showing 1-25 of 166)</div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* League Table Manager */}
          <AdminCard title="📊 League Table Manager (⚡ Medium Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">BBC Scraper Integration:</h4>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• <strong>league_table_staging:</strong> validation_status = 'pending' for review</li>
                  <li>• <strong>team_bbc_name:</strong> BBC scraper team mapping verification</li>
                  <li>• <strong>Manual Override:</strong> Edit league positions if scraper fails</li>
                </ul>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-2 text-sm text-[#6b7280]">
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Force BBC Scrape Button</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Review Scraped Data Table</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Apply to Live Table Button</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Manual Position Editor</div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Teams Manager */}
          <AdminCard title="👕 Teams & Competitions (📅 Low Priority)">
            <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-2 m-0">Team Data Management:</h4>
              <ul className="text-sm text-[#6b7280] space-y-1">
                <li>• <strong>Rich team data:</strong> name, short_name, logo_url, founded_year, website, primary_color, stadium_name</li>
                <li>• <strong>BBC mapping:</strong> bbc_name field for scraper team matching</li>
                <li>• <strong>Logo management:</strong> Upload capability for team logos</li>
              </ul>
            </div>
          </AdminCard>
        </main>
      </div>
    </div>
  );
}
