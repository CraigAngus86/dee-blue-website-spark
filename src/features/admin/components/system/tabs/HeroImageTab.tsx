import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function HeroImageTab() {
  return (
    <div className="space-y-6">
      {/* Hero Image Manager */}
      <AdminCard title="🖼️ Hero Image Manager (📅 Low Priority) - Occasional hero image updates">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Page Selection & Current Hero */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📄 Page Selection & Current Heroes:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Select Page:</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                      <option>Homepage</option>
                      <option>Spain Park Stadium</option>
                      <option>Match Centre</option>
                      <option>Commercial Opportunities</option>
                      <option>Team Page</option>
                      <option>News Page</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Current Hero Status:</label>
                  <div className="flex items-center space-x-2 p-3 bg-white border border-[#e5e7eb] rounded">
                    <span className="text-green-600 text-lg">✓</span>
                    <span className="text-sm text-[#374151]">Hero image active</span>
                    <span className="text-xs text-[#6b7280]">Last updated: 12/06/2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Hero Preview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🖼️ Current Hero Preview (Homepage):</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  
                  {/* Desktop Preview (21:9) */}
                  <div>
                    <div className="text-sm font-medium text-[#374151] mb-2">Desktop (21:9)</div>
                    <div className="relative w-full aspect-[21/9] bg-gradient-to-r from-[#00105A] to-[#C5E7FF] rounded overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-sm font-medium">Match Gallery Hero</div>
                          <div className="text-xs opacity-80">Banks o' Dee vs Forres</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tablet Preview (16:9) */}
                  <div>
                    <div className="text-sm font-medium text-[#374151] mb-2">Tablet (16:9)</div>
                    <div className="relative w-full aspect-[16/9] bg-gradient-to-r from-[#00105A] to-[#C5E7FF] rounded overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-sm font-medium">Match Gallery</div>
                          <div className="text-xs opacity-80">Responsive</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Preview (4:3) */}
                  <div>
                    <div className="text-sm font-medium text-[#374151] mb-2">Mobile (4:3)</div>
                    <div className="relative w-full aspect-[4/3] bg-gradient-to-r from-[#00105A] to-[#C5E7FF] rounded overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-sm font-medium">Match Gallery</div>
                          <div className="text-xs opacity-80">Mobile</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm text-[#6b7280]">
                    <strong>Current:</strong> banksofdeefc/matches/gallery/150625_Banks_O_Dee_Forres_Mechanics/hero_image.jpg
                  </div>
                  <button className="px-4 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                    Change Hero
                  </button>
                </div>
              </div>
            </div>

            {/* Cloudinary Browser Interface */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">☁️ Cloudinary Browser & Upload:</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                
                {/* Folder Navigation */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-[#374151] mb-2">Current Folder:</div>
                  <div className="flex items-center space-x-2 text-sm text-[#6b7280] font-mono bg-[#f9fafb] p-2 rounded">
                    <span>/banksofdeefc/matches/gallery/</span>
                    <button className="text-[#00105A] hover:text-[#FFD700]">Browse</button>
                  </div>
                </div>
                
                {/* Image Grid Preview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="relative aspect-square bg-[#f9fafb] border border-[#e5e7eb] rounded overflow-hidden cursor-pointer hover:border-[#C5E7FF]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-[#00105A] rounded mx-auto mb-1"></div>
                        <div className="text-xs text-[#6b7280]">match_01.jpg</div>
                      </div>
                    </div>
                    <div className="absolute top-1 right-1">
                      <span className="text-[#FFD700] text-sm">⭐</span>
                    </div>
                  </div>
                  
                  <div className="relative aspect-square bg-[#f9fafb] border border-[#e5e7eb] rounded overflow-hidden cursor-pointer hover:border-[#C5E7FF]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-[#C5E7FF] rounded mx-auto mb-1"></div>
                        <div className="text-xs text-[#6b7280]">match_02.jpg</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative aspect-square bg-[#f9fafb] border border-[#e5e7eb] rounded overflow-hidden cursor-pointer hover:border-[#C5E7FF]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-[#FFD700] rounded mx-auto mb-1"></div>
                        <div className="text-xs text-[#6b7280]">match_03.jpg</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative aspect-square bg-[#f9fafb] border-2 border-dashed border-[#C5E7FF] rounded cursor-pointer hover:bg-[#C5E7FF] hover:bg-opacity-10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-[#00105A]">
                        <div className="text-lg mb-1">+</div>
                        <div className="text-xs">Upload New</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image Actions */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-[#6b7280]">
                    <span className="font-medium">Selected:</span> match_01.jpg (⭐ Current Hero)
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded text-sm text-[#374151] hover:bg-[#f3f4f6]">
                      Preview
                    </button>
                    <button className="px-4 py-2 bg-[#00105A] text-white rounded font-medium hover:bg-[#FFD700] hover:text-[#00105A] transition-colors">
                      Set as Hero
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bulk Operations */}
            <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">⚡ Bulk Hero Operations:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                  <div className="font-medium text-[#374151] mb-2">Update All Pages</div>
                  <div className="text-sm text-[#6b7280] mb-3">Apply same hero to multiple pages</div>
                  <button className="w-full px-3 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                    Bulk Update
                  </button>
                </div>
                
                <div className="p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                  <div className="font-medium text-[#374151] mb-2">Hero Templates</div>
                  <div className="text-sm text-[#6b7280] mb-3">Save commonly used hero configurations</div>
                  <button className="w-full px-3 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                    Manage Templates
                  </button>
                </div>
                
                <div className="p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                  <div className="font-medium text-[#374151] mb-2">Transform Preview</div>
                  <div className="text-sm text-[#6b7280] mb-3">Preview all aspect ratios before applying</div>
                  <button className="w-full px-3 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                    Preview All
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Cloudinary Integration:</strong> Direct folder browsing and image selection</li>
              <li>• <strong>Transform System:</strong> hero (21:9), card (16:9), mobile (4:3) aspect ratios</li>
              <li>• <strong>Page Mapping:</strong> Dynamic hero image assignment per page/section</li>
              <li>• <strong>Preview System:</strong> Real-time aspect ratio preview before applying</li>
              <li>• <strong>Bulk Operations:</strong> Template system for common hero configurations</li>
              <li>• <strong>Image Optimization:</strong> Automatic optimization for face detection and quality</li>
              <li>• <strong>Version Control:</strong> Track hero image changes and rollback capabilities</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
