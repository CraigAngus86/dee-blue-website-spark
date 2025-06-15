import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function MatchGalleryTab() {
  return (
    <div className="space-y-6">
      {/* Match Gallery Creator */}
      <AdminCard title="📸 Match Gallery Creator (⚡ Medium Priority) - After every home match">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Step 1 & 2: Team Selection and Date */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Step 1-2: Highland League Match Selection</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Home Team:</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                      <option>Select Home Team</option>
                      <option>Banks o' Dee</option>
                      <option>Brora Rangers</option>
                      <option>Buckie Thistle</option>
                      <option>Clachnacuddin</option>
                      <option>Cove Rangers</option>
                      <option>Deveronvale</option>
                      <option>Forres Mechanics</option>
                      <option>Formartine United</option>
                      <option>Fort William</option>
                      <option>Fraserburgh</option>
                      <option>Huntly</option>
                      <option>Inverurie Loco Works</option>
                      <option>Keith</option>
                      <option>Lossiemouth</option>
                      <option>Nairn County</option>
                      <option>Rothes</option>
                      <option>Strathspey Thistle</option>
                      <option>Turriff United</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Away Team:</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                      <option>Select Away Team</option>
                      <option>Banks o' Dee</option>
                      <option>Brora Rangers</option>
                      <option>Buckie Thistle</option>
                      <option>Clachnacuddin</option>
                      <option>Cove Rangers</option>
                      <option>Deveronvale</option>
                      <option>Forres Mechanics</option>
                      <option>Formartine United</option>
                      <option>Fort William</option>
                      <option>Fraserburgh</option>
                      <option>Huntly</option>
                      <option>Inverurie Loco Works</option>
                      <option>Keith</option>
                      <option>Lossiemouth</option>
                      <option>Nairn County</option>
                      <option>Rothes</option>
                      <option>Strathspey Thistle</option>
                      <option>Turriff United</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Match Date:</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Auto-generated Folder Name */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📁 Step 3: Auto-generated Folder Name</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="mb-2">
                  <span className="text-sm font-medium text-[#374151]">Folder Name:</span>
                </div>
                <div className="font-mono text-lg text-[#00105A] bg-[#f9fafb] p-3 rounded border">
                  150625_Banks_O_Dee_Forres_Mechanics
                </div>
                <div className="text-xs text-[#6b7280] mt-2">
                  Format: DDMMYY_HomeTeam_AwayTeam (auto-generated from selection above)
                </div>
              </div>
            </div>

            {/* Step 4: Cloudinary Folder Path */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">☁️ Step 4: Cloudinary Folder Creation</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="mb-2">
                  <span className="text-sm font-medium text-[#374151]">Full Cloudinary Path:</span>
                </div>
                <div className="font-mono text-sm text-[#00105A] bg-[#f9fafb] p-3 rounded border break-all">
                  banksofdeefc/matches/gallery/150625_Banks_O_Dee_Forres_Mechanics
                </div>
                <div className="text-xs text-[#6b7280] mt-2">
                  This folder will be automatically created in Cloudinary when photos are uploaded
                </div>
              </div>
            </div>

            {/* Step 5: Bulk Photo Upload */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📤 Step 5: Bulk Photo Upload Interface</h4>
              <div className="border-2 border-dashed border-[#C5E7FF] rounded-lg p-8 text-center bg-white hover:border-[#00105A] transition-colors">
                <div className="text-[#6b7280] mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h5 className="text-lg font-medium text-[#00105A] mb-2">Drop Match Photos Here</h5>
                <p className="text-sm text-[#6b7280] mb-4">
                  <span className="font-medium text-[#00105A]">Click to browse</span> or drag and drop multiple images
                </p>
                <p className="text-xs text-[#6b7280] mb-4">JPG, PNG up to 5MB each • Upload up to 50 photos at once</p>
                <button className="px-6 py-3 bg-[#00105A] text-white rounded font-medium hover:bg-[#FFD700] hover:text-[#00105A] transition-colors">
                  Select Match Photos
                </button>
              </div>
              
              {/* Upload Progress */}
              <div className="mt-4 bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#374151]">Upload Progress:</span>
                  <span className="text-sm text-[#6b7280]">23/25 photos uploaded</span>
                </div>
                <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                  <div className="bg-[#00105A] h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
                <div className="text-xs text-[#6b7280] mt-1">Uploading to: banksofdeefc/matches/gallery/150625_Banks_O_Dee_Forres_Mechanics</div>
              </div>
            </div>

            {/* Step 6: Cover Image Selection */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🖼️ Step 6: Select Cover Image</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="text-sm text-[#6b7280] mb-3">Choose the featured image for this gallery:</div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-[#f3f4f6] rounded border-2 border-[#FFD700] overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#6b7280]">
                        Photo 1 ⭐
                      </div>
                    </div>
                    <div className="absolute top-1 right-1 w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center">
                      <span className="text-xs text-[#00105A]">✓</span>
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-[#f3f4f6] rounded border border-[#e5e7eb] hover:border-[#C5E7FF] overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#6b7280]">Photo 2</div>
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-[#f3f4f6] rounded border border-[#e5e7eb] hover:border-[#C5E7FF] overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#6b7280]">Photo 3</div>
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-[#f3f4f6] rounded border border-[#e5e7eb] hover:border-[#C5E7FF] overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#6b7280]">Photo 4</div>
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-[#f3f4f6] rounded border border-[#e5e7eb] hover:border-[#C5E7FF] overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#6b7280]">Photo 5</div>
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-[#f3f4f6] rounded border border-[#e5e7eb] hover:border-[#C5E7FF] overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#6b7280]">Photo 6</div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-[#6b7280] mt-3">
                  Click on any photo to set it as the cover image for this gallery
                </div>
              </div>
            </div>

            {/* Step 7: Create Gallery & Auto-link */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🔗 Step 7: Create Gallery & Auto-link</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Gallery Title:</label>
                    <input 
                      type="text" 
                      value="Banks o' Dee vs Forres Mechanics - 15/06/2025"
                      className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Gallery Description:</label>
                    <input 
                      type="text" 
                      placeholder="Match photos from today's victory at Spain Park"
                      className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                    />
                  </div>
                </div>
                
                <div className="bg-[#f9fafb] p-3 rounded border border-[#e5e7eb] mb-4">
                  <div className="text-sm font-medium text-[#374151] mb-1">Auto-linking Process:</div>
                  <div className="text-xs text-[#6b7280] space-y-1">
                    <div>1. Create Sanity gallery document with metadata</div>
                    <div>2. Upload all photos to Cloudinary folder</div>
                    <div>3. Link Sanity gallery ID → Supabase match.gallery_idsanity field</div>
                    <div>4. Gallery becomes available on match centre and match reports</div>
                  </div>
                </div>
                
                <button className="w-full px-6 py-3 bg-[#00105A] text-white rounded font-medium hover:bg-[#FFD700] hover:text-[#00105A] transition-colors">
                  Create Gallery & Link to Match
                </button>
              </div>
            </div>

            {/* Recent Galleries */}
            <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">�� Recent Match Galleries:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                  <div>
                    <div className="font-medium text-[#374151]">Banks o' Dee vs Forres Mechanics</div>
                    <div className="text-sm text-[#6b7280]">25 photos • Created 2 hours ago</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                  <div>
                    <div className="font-medium text-[#374151]">Cove Rangers vs Banks o' Dee</div>
                    <div className="text-sm text-[#6b7280]">18 photos • Created 1 week ago</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Highland League Teams:</strong> 18 teams hardcoded in dropdown (matchGallery schema)</li>
              <li>• <strong>Folder Naming:</strong> DDMMYY_HomeTeam_AwayTeam format (e.g., 250412_Forres_Mechanics_Banks_O_Dee)</li>
              <li>• <strong>Cloudinary Path:</strong> Auto-create banksofdeefc/matches/gallery/folder_name</li>
              <li>• <strong>Bulk Upload:</strong> Drag-drop functionality, progress indicators, 5MB limit per file</li>
              <li>• <strong>Cover Selection:</strong> Featured photo selection from uploaded set</li>
              <li>• <strong>Cross-linking:</strong> Auto-populate Sanity document, link to Supabase match.gallery_idsanity</li>
              <li>• <strong>Gallery Management:</strong> Edit existing galleries, add/remove photos post-creation</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
