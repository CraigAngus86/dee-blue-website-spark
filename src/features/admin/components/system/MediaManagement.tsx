import { SharedAdminNav } from '../SharedAdminNav';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { Image, FolderOpen } from 'lucide-react';

export function MediaManagement() {
  return (
    <div className="flex bg-[#f9fafb] min-h-screen">
      <SharedAdminNav />
      
      <div className="flex-1">
        <header className="bg-white border-b border-[#e5e7eb] px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#00105A] mb-2 m-0">Media Management</h1>
              <p className="text-[#6b7280] m-0">Manage Cloudinary assets and hero images</p>
            </div>
            <div className="text-sm text-[#6b7280]">
              <span className="font-medium">Priority:</span> 📅 Low Frequency Maintenance
            </div>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminCard className="bg-green-50 border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <Image className="text-green-600" size={24} />
                <span className="text-lg">📅</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Hero Images</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Update hero images across all pages</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>

            <AdminCard className="bg-green-50 border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <FolderOpen className="text-green-600" size={24} />
                <span className="text-lg">📅</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Gallery Management</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Cloudinary folder organization</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>
          </div>

          {/* Hero Image Manager */}
          <AdminCard title="��️ Hero Image Manager (📅 Low Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">Page Hero Control:</h4>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• <strong>Homepage:</strong> News carousel hero images</li>
                  <li>• <strong>Spain Park:</strong> Stadium timeline hero images with Ken Burns effects</li>
                  <li>• <strong>Match Centre:</strong> Match gallery hero images</li>
                  <li>• <strong>Commercial:</strong> Partnership and sponsorship hero images</li>
                </ul>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-2 text-sm text-[#6b7280]">
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Page Selection Dropdown</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Current Hero Image Preview</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Cloudinary Browser Integration</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Aspect Ratio Preview (21:9, 16:9, 4:3)</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Bulk Update Interface</div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Cloudinary Management */}
          <AdminCard title="☁️ Cloudinary Folder Management (📅 Low Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">Current Folder Structure:</h4>
                <div className="text-sm text-[#6b7280] space-y-1 font-mono bg-[#f3f4f6] p-3 rounded">
                  <div>/banksofdeefc/</div>
                  <div className="ml-4">├── matches/gallery/</div>
                  <div className="ml-4">├── players/</div>
                  <div className="ml-4">├── fans/gallery/</div>
                  <div className="ml-4">├── fans/featured/</div>
                  <div className="ml-4">├── sponsors/</div>
                  <div className="ml-4">└── heritage/</div>
                </div>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Management Features (To Build):</h4>
                <div className="space-y-2 text-sm text-[#6b7280]">
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Folder Browser Interface</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Image Cleanup Tools</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Optimization Review</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Usage Analytics</div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Image Optimization */}
          <AdminCard title="⚡ Image Optimization Standards">
            <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-2 m-0">Current Transform System:</h4>
              <ul className="text-sm text-[#6b7280] space-y-1">
                <li>• <strong>Face detection:</strong> g_auto:faces (match photos), g_auto:face (player portraits)</li>
                <li>• <strong>Aspect ratios:</strong> hero (21:9), card (16:9), square (1:1), portrait (3:4)</li>
                <li>• <strong>16x performance:</strong> Gallery system optimization achieved</li>
                <li>• <strong>Mobile optimization:</strong> Responsive transforms for all devices</li>
              </ul>
            </div>
          </AdminCard>
        </main>
      </div>
    </div>
  );
}
