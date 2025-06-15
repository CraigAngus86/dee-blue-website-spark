import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function FanZoneModerationTab() {
  return (
    <div className="space-y-6">
      {/* Fan Photo Moderation */}
      <AdminCard title="📷 Fan Photo Moderation (🔥 High Priority) - Ongoing submissions need quick approval">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Moderation Status Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📊 Moderation Status Overview:</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">3</div>
                  <div className="text-sm text-[#6b7280]">Pending</div>
                  <div className="w-full bg-[#fef3c7] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">45</div>
                  <div className="text-sm text-[#6b7280]">Approved</div>
                  <div className="w-full bg-[#dcfce7] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">12</div>
                  <div className="text-sm text-[#6b7280]">Featured</div>
                  <div className="w-full bg-[#FFD700] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">8</div>
                  <div className="text-sm text-[#6b7280]">Declined</div>
                  <div className="w-full bg-[#fecaca] h-1 rounded mt-2"></div>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Status:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Featured</option>
                    <option>Declined</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Submission Date:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Dates</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-end">
                <button className="px-4 py-3 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors w-full">
                  Batch Approve
                </button>
              </div>
            </div>

            {/* Photo Review Grid */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📸 Photo Review Grid:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border border-[#e5e7eb] rounded-lg p-4">
                  <div className="aspect-square bg-[#f3f4f6] rounded mb-3 flex items-center justify-center">
                    <span className="text-[#6b7280] text-sm">Photo Thumbnail</span>
                  </div>
                  <div className="text-sm text-[#374151] mb-2">Submitted by: John_Dee_Fan</div>
                  <div className="text-xs text-[#6b7280] mb-3">2 hours ago</div>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-green-100 text-green-800 rounded text-xs font-medium hover:bg-green-200">
                      ✅ Approve
                    </button>
                    <button className="flex-1 px-3 py-2 bg-[#FFD700] text-[#00105A] rounded text-xs font-medium hover:bg-yellow-300">
                      ⭐ Feature
                    </button>
                    <button className="flex-1 px-3 py-2 bg-red-100 text-red-800 rounded text-xs font-medium hover:bg-red-200">
                      ❌ Decline
                    </button>
                  </div>
                </div>
                <div className="bg-white border border-[#e5e7eb] rounded-lg p-4">
                  <div className="aspect-square bg-[#f3f4f6] rounded mb-3 flex items-center justify-center">
                    <span className="text-[#6b7280] text-sm">Photo Thumbnail</span>
                  </div>
                  <div className="text-sm text-[#374151] mb-2">Submitted by: BanksODeeSupporter</div>
                  <div className="text-xs text-[#6b7280] mb-3">4 hours ago</div>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-green-100 text-green-800 rounded text-xs font-medium hover:bg-green-200">
                      ✅ Approve
                    </button>
                    <button className="flex-1 px-3 py-2 bg-[#FFD700] text-[#00105A] rounded text-xs font-medium hover:bg-yellow-300">
                      ⭐ Feature
                    </button>
                    <button className="flex-1 px-3 py-2 bg-red-100 text-red-800 rounded text-xs font-medium hover:bg-red-200">
                      ❌ Decline
                    </button>
                  </div>
                </div>
                <div className="bg-white border border-[#e5e7eb] rounded-lg p-4">
                  <div className="aspect-square bg-[#f3f4f6] rounded mb-3 flex items-center justify-center">
                    <span className="text-[#6b7280] text-sm">Photo Thumbnail</span>
                  </div>
                  <div className="text-sm text-[#374151] mb-2">Submitted by: LocalFan2024</div>
                  <div className="text-xs text-[#6b7280] mb-3">6 hours ago</div>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-green-100 text-green-800 rounded text-xs font-medium hover:bg-green-200">
                      ✅ Approve
                    </button>
                    <button className="flex-1 px-3 py-2 bg-[#FFD700] text-[#00105A] rounded text-xs font-medium hover:bg-yellow-300">
                      ⭐ Feature
                    </button>
                    <button className="flex-1 px-3 py-2 bg-red-100 text-red-800 rounded text-xs font-medium hover:bg-red-200">
                      ❌ Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Status Workflow:</strong> pending → approved → featured → declined</li>
              <li>• <strong>Batch Operations:</strong> Efficient processing capabilities for multiple photos</li>
              <li>• <strong>Social Permissions:</strong> Track user consent for social media usage</li>
              <li>• <strong>File Validation:</strong> Follow Fan Zone patterns (5MB limit, JPG/PNG only)</li>
              <li>• <strong>Cloudinary Integration:</strong> Auto-folder organization /fans/gallery/ and /fans/featured/</li>
              <li>• <strong>Moderation Tools:</strong> Three-tier approval process with internal review notes</li>
            </ul>
          </div>
        </div>
      </AdminCard>

      {/* Fan of the Month Manager */}
      <AdminCard title="⭐ Fan of the Month Manager (⚡ Medium Priority) - Monthly cycle management">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Category Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📊 Category Overview:</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">2</div>
                  <div className="text-xs text-[#6b7280]">Loyal Legend</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">1</div>
                  <div className="text-xs text-[#6b7280]">Rising Together</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">3</div>
                  <div className="text-xs text-[#6b7280]">Community Champion</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">0</div>
                  <div className="text-xs text-[#6b7280]">Match Day Magic</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">1</div>
                  <div className="text-xs text-[#6b7280]">Next Generation</div>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Category:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Categories</option>
                    <option>Loyal Legend</option>
                    <option>Rising Together</option>
                    <option>Community Champion</option>
                    <option>Match Day Magic</option>
                    <option>Next Generation</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Status:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Status</option>
                    <option>Pending Review</option>
                    <option>Featured This Month</option>
                    <option>Archive</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Fan Submission Review Cards */}
            <div className="space-y-4">
              <h4 className="font-medium text-[#00105A] m-0">📝 Submission Review:</h4>
              <div className="space-y-3">
                <div className="bg-white border border-[#e5e7eb] rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-medium text-[#374151]">Sarah McKenzie</div>
                      <div className="text-sm text-[#6b7280]">Category: Loyal Legend</div>
                    </div>
                    <span className="px-2 py-1 rounded text-xs bg-[#fef3c7] text-[#92400e] font-medium">Pending</span>
                  </div>
                  <div className="text-sm text-[#374151] mb-3">
                    "Been supporting Banks o' Dee for over 30 years through thick and thin. Never missed a home game in the last decade and always bring my grandchildren to share the passion."
                  </div>
                  <div className="text-xs text-[#6b7280] mb-3">Word count: 34/60 ✓ | 3 photos attached</div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-[#FFD700] text-[#00105A] rounded text-sm font-medium hover:bg-yellow-300">
                      ⭐ Feature This Month
                    </button>
                    <button className="px-4 py-2 bg-green-100 text-green-800 rounded text-sm font-medium hover:bg-green-200">
                      Archive
                    </button>
                  </div>
                </div>
                <div className="bg-white border border-[#e5e7eb] rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-medium text-[#374151]">Jamie Thompson</div>
                      <div className="text-sm text-[#6b7280]">Category: Next Generation</div>
                    </div>
                    <span className="px-2 py-1 rounded text-xs bg-[#fef3c7] text-[#92400e] font-medium">Pending</span>
                  </div>
                  <div className="text-sm text-[#374151] mb-3">
                    "Started supporting Banks o' Dee when I was 8 years old. Now I'm 16 and dream of playing for the club one day. Every match inspires me to train harder."
                  </div>
                  <div className="text-xs text-[#6b7280] mb-3">Word count: 35/60 ✓ | 2 photos attached</div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-[#FFD700] text-[#00105A] rounded text-sm font-medium hover:bg-yellow-300">
                      ⭐ Feature This Month
                    </button>
                    <button className="px-4 py-2 bg-green-100 text-green-800 rounded text-sm font-medium hover:bg-green-200">
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>5 Categories:</strong> Loyal Legend, Rising Together, Community Champion, Match Day Magic, Next Generation</li>
              <li>• <strong>Story Validation:</strong> 20-60 word requirement with real-time word count</li>
              <li>• <strong>Photo Management:</strong> Multiple images with featured selection capabilities</li>
              <li>• <strong>Monthly Cycle:</strong> Featured selection workflow with archive management</li>
              <li>• <strong>Cloudinary Integration:</strong> /fans/featured/ folder for Fan of the Month photos</li>
              <li>• <strong>Social Permissions:</strong> Explicit consent tracking for promotional use</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
