import { SharedAdminNav } from '../SharedAdminNav';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { FileText, Camera, ClipboardList } from 'lucide-react';

export function ContentManagement() {
  return (
    <div className="flex bg-[#f9fafb] min-h-screen">
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

        <main className="p-8 space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminCard className="bg-red-50 border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="text-red-600" size={24} />
                <span className="text-lg">🔥</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">News Articles</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Twice weekly minimum</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>

            <AdminCard className="bg-red-50 border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <ClipboardList className="text-red-600" size={24} />
                <span className="text-lg">🔥</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Match Reports</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Every Saturday + midweek games</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>

            <AdminCard className="bg-amber-50 border-amber-200">
              <div className="flex items-center space-x-3 mb-4">
                <Camera className="text-amber-600" size={24} />
                <span className="text-lg">⚡</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Match Galleries</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">After every home match</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>
          </div>

          {/* News Management Wireframe */}
          <AdminCard title="📰 News Article Creation (🔥 High Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">GOD Document Requirements:</h4>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• <strong>Frequency:</strong> Twice weekly minimum</li>
                  <li>• <strong>Categories:</strong> Match Reports, Club News, Team News, Community News, Commercial News</li>
                  <li>• <strong>Integration:</strong> Links to Sanity CMS with automatic image optimization</li>
                  <li>• <strong>SEO:</strong> Meta titles, descriptions, social sharing images</li>
                </ul>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-2 text-sm text-[#6b7280]">
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Article Title Input Field</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Category Selection Dropdown</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Featured Image Upload (Cloudinary)</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Rich Text Editor for Article Body</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">SEO Settings Panel</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Preview & Publish Buttons</div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Match Reports Wireframe */}
          <AdminCard title="📝 Match Report Creation (🔥 High Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• <strong>Auto-linking:</strong> Send article ID to Supabase match.match_report_link</li>
                  <li>• <strong>Match Selection:</strong> Choose which match this report covers</li>
                  <li>• <strong>Template System:</strong> Pre-formatted match report structure</li>
                </ul>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-2 text-sm text-[#6b7280]">
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Match Selection Dropdown (Recent/Upcoming)</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Auto-populated Match Details</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Score Line & Goal Scorers</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Match Report Content Editor</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Link to Match Gallery (if available)</div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Match Galleries Wireframe */}
          <AdminCard title="📸 Match Gallery Creator (⚡ Medium Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">Critical Workflow (Craig's Priority):</h4>
                <ol className="text-sm text-[#6b7280] space-y-1 list-decimal list-inside">
                  <li>Select home/away teams from Highland League dropdown (18 teams)</li>
                  <li>Set match date</li>
                  <li>Auto-generate folder name: <code className="bg-[#f3f4f6] px-1 rounded">DDMMYY_HomeTeam_AwayTeam</code></li>
                  <li>Auto-create Cloudinary folder: <code className="bg-[#f3f4f6] px-1 rounded">banksofdeefc/matches/gallery/folder</code></li>
                  <li>Bulk photo upload to generated folder</li>
                  <li>Select cover image from uploaded photos</li>
                  <li>Auto-link Sanity gallery ID → Supabase match.gallery_idsanity</li>
                </ol>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-2 text-sm text-[#6b7280]">
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Highland League Teams Dropdown (18 teams hardcoded)</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Match Date Picker</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Auto-generated Folder Name Display</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Bulk Photo Upload Interface (Drag & Drop)</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Cover Image Selection Grid</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Create Gallery Button</div>
                </div>
              </div>
            </div>
          </AdminCard>
        </main>
      </div>
    </div>
  );
}
