import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function PlayerManagementTab() {
  return (
    <div className="space-y-6">
      {/* Player Management */}
      <AdminCard title="👤 Player Profile Management (📅 Low Priority) - Transfer windows, season start">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Squad Overview Statistics */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📊 Squad Overview:</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-xl font-bold text-[#00105A]">24</div>
                  <div className="text-sm text-[#6b7280]">Total Players</div>
                  <div className="text-xs text-[#6b7280] mt-1">First Team Squad</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-xl font-bold text-[#00105A]">2</div>
                  <div className="text-sm text-[#6b7280]">Goalkeepers</div>
                  <div className="text-xs text-[#6b7280] mt-1">Position group</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-xl font-bold text-[#00105A]">8</div>
                  <div className="text-sm text-[#6b7280]">Defenders</div>
                  <div className="text-xs text-[#6b7280] mt-1">Position group</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-xl font-bold text-[#00105A]">9</div>
                  <div className="text-sm text-[#6b7280]">Midfielders</div>
                  <div className="text-xs text-[#6b7280] mt-1">Position group</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-xl font-bold text-[#00105A]">5</div>
                  <div className="text-sm text-[#6b7280]">Forwards</div>
                  <div className="text-xs text-[#6b7280] mt-1">Position group</div>
                </div>
              </div>
            </div>

            {/* Position Filters */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🎯 Position Filters:</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border-2 border-[#00105A] rounded text-[#00105A] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] font-medium">
                    <option>All Players</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#00105A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>Goalkeepers</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>Defenders</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>Midfielders</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>Forwards</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button className="px-4 py-2 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors">
                  + Add New Player
                </button>
              </div>
            </div>

            {/* Player Grid */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">👥 Player Grid (All Players):</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  
                  {/* Sample Player Cards */}
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold text-sm">JS</span>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="text-[#FFD700] text-lg">⭐</span>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-[#374151]">Jamie Smith</div>
                      <div className="text-xs text-[#6b7280]">Midfielder</div>
                      <div className="text-xs text-[#FFD700] font-medium">Made in Dee</div>
                    </div>
                  </div>
                  
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold text-sm">MW</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-[#374151]">Mark Wilson</div>
                      <div className="text-xs text-[#6b7280]">Defender</div>
                      <div className="text-xs text-[#6b7280]">Signed 2023</div>
                    </div>
                  </div>
                  
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold text-sm">AL</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-[#374151]">Andy Lee</div>
                      <div className="text-xs text-[#6b7280]">Forward</div>
                      <div className="text-xs text-[#6b7280]">Signed 2024</div>
                    </div>
                  </div>
                  
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold text-sm">DM</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-[#374151]">David Miller</div>
                      <div className="text-xs text-[#6b7280]">Goalkeeper</div>
                      <div className="text-xs text-[#6b7280]">Club Captain</div>
                    </div>
                  </div>
                  
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold text-sm">CT</span>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="text-[#FFD700] text-lg">⭐</span>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-[#374151]">Connor Taylor</div>
                      <div className="text-xs text-[#6b7280]">Midfielder</div>
                      <div className="text-xs text-[#FFD700] font-medium">Made in Dee</div>
                    </div>
                  </div>
                  
                  {/* Add New Player Card */}
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-[#f9fafb] border-2 border-dashed border-[#C5E7FF] rounded-lg flex items-center justify-center hover:bg-[#C5E7FF] hover:bg-opacity-10 transition-colors">
                      <div className="text-center text-[#00105A]">
                        <div className="text-2xl mb-1">+</div>
                        <div className="text-xs font-medium">Add New Player</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Profile Editor Modal Wireframe */}
            <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">✏️ Player Profile Editor (Modal Interface):</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Personal Information */}
                <div>
                  <div className="text-sm font-medium text-[#374151] mb-3">Personal Information:</div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1">Full Name:</label>
                      <input 
                        type="text" 
                        value="Jamie Smith"
                        className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Age:</label>
                        <input 
                          type="number" 
                          value="24"
                          className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Squad Number:</label>
                        <input 
                          type="number" 
                          value="8"
                          className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1">Position:</label>
                      <div className="relative">
                        <select className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                          <option>Midfielder</option>
                          <option>Goalkeeper</option>
                          <option>Defender</option>
                          <option>Forward</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg className="w-3 h-3 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="made-in-dee"
                        checked
                        className="w-4 h-4 text-[#FFD700] bg-white border-[#e5e7eb] rounded focus:ring-[#C5E7FF]"
                      />
                      <label htmlFor="made-in-dee" className="text-xs font-medium text-[#FFD700]">Made in Dee (Youth Graduate)</label>
                    </div>
                  </div>
                </div>
                
                {/* Photo & Statistics */}
                <div>
                  <div className="text-sm font-medium text-[#374151] mb-3">Photo & Statistics:</div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold">JS</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <button className="px-4 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80 mb-2">
                          Upload Photo
                        </button>
                        <div className="text-xs text-[#6b7280]">Face detection enabled • Square crop</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Appearances:</label>
                        <input 
                          type="number" 
                          value="45"
                          className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Goals:</label>
                        <input 
                          type="number" 
                          value="12"
                          className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1">Previous Clubs:</label>
                      <textarea 
                        rows={3}
                        value="Deveronvale FC (2020-2022), Aberdeen FC Academy (2018-2020)"
                        className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A] resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button className="px-4 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded text-sm text-[#374151] hover:bg-[#f3f4f6]">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-[#00105A] text-white rounded font-medium hover:bg-[#FFD700] hover:text-[#00105A] transition-colors">
                  Save Player
                </button>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Cloudinary Integration:</strong> Face detection for player portraits (g_auto:face)</li>
              <li>• <strong>Position Management:</strong> Dropdown filtering with reduced filter count (5-6 instead of 7)</li>
              <li>• <strong>Mobile Optimization:</strong> Dropdown filters instead of displaying all options</li>
              <li>• <strong>"Made in Dee" System:</strong> Special designation for youth graduates with gold styling</li>
              <li>• <strong>Supabase Sync:</strong> Auto-sync player profiles to Supabase after save</li>
              <li>• <strong>Text Case Consistency:</strong> Position names in sentence case throughout</li>
              <li>• <strong>Modal Integration:</strong> Follow established AdminModal pattern from matches</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
