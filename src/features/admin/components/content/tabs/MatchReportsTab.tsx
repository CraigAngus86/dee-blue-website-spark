import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function MatchReportsTab() {
  return (
    <div className="space-y-6">
      {/* Match Report Creation */}
      <AdminCard title="📝 Match Report Creation (🔥 High Priority) - Every Saturday + midweek games">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Match Selection */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">⚽ Select Match:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Match:</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                      <option>Select Match for Report</option>
                      <option>Banks o' Dee vs Forres Mechanics (15/06/2025) - COMPLETED</option>
                      <option>Cove Rangers vs Banks o' Dee (08/06/2025) - COMPLETED</option>
                      <option>Banks o' Dee vs Brora Rangers (22/06/2025) - UPCOMING</option>
                      <option>Fraserburgh vs Banks o' Dee (29/06/2025) - UPCOMING</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Report Type:</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                      <option>Post-Match Report</option>
                      <option>Pre-Match Preview</option>
                      <option>Match Highlights</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-populated Match Details */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">�� Match Details (Auto-populated):</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-[#6b7280] mb-1">Date & Time:</label>
                    <div className="text-sm font-medium text-[#374151]">15/06/2025, 15:00</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6b7280] mb-1">Competition:</label>
                    <div className="text-sm font-medium text-[#374151]">Highland Football League</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6b7280] mb-1">Venue:</label>
                    <div className="text-sm font-medium text-[#374151]">Spain Park</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6b7280] mb-1">Attendance:</label>
                    <input 
                      type="number" 
                      placeholder="245"
                      className="w-full px-2 py-1 border border-[#e5e7eb] rounded text-sm"
                    />
                  </div>
                </div>
                
                {/* Score Line */}
                <div className="border-t border-[#e5e7eb] pt-4">
                  <h5 className="font-medium text-[#374151] mb-3">Score Line:</h5>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <div className="font-bold text-lg text-[#00105A]">Banks o' Dee</div>
                      <input 
                        type="number" 
                        placeholder="2"
                        className="w-16 text-center text-2xl font-bold border border-[#e5e7eb] rounded mt-2"
                      />
                    </div>
                    <div className="text-2xl font-bold text-[#6b7280]">-</div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-[#00105A]">Forres Mechanics</div>
                      <input 
                        type="number" 
                        placeholder="1"
                        className="w-16 text-center text-2xl font-bold border border-[#e5e7eb] rounded mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Goal Scorers & Key Events */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">⚽ Goal Scorers & Key Events:</h4>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-2 py-1 bg-[#00105A] text-white text-xs rounded font-medium">15'</span>
                    <span className="font-medium text-[#374151]">Jamie Thomson</span>
                    <span className="text-sm text-[#6b7280]">Banks o' Dee</span>
                    <span className="text-sm">⚽ Goal</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-2 py-1 bg-[#00105A] text-white text-xs rounded font-medium">67'</span>
                    <span className="font-medium text-[#374151]">Michael Stewart</span>
                    <span className="text-sm text-[#6b7280]">Banks o' Dee</span>
                    <span className="text-sm">⚽ Goal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded font-medium">82'</span>
                    <span className="font-medium text-[#374151]">David Wilson</span>
                    <span className="text-sm text-[#6b7280]">Forres Mechanics</span>
                    <span className="text-sm">⚽ Goal</span>
                  </div>
                  <button className="mt-3 px-3 py-1 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium">
                    + Add Event
                  </button>
                </div>
              </div>
            </div>

            {/* Match Report Content */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📝 Match Report Content:</h4>
              <div className="space-y-4">
                
                {/* Quick Template Buttons */}
                <div className="flex space-x-2">
                  <button className="px-3 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded text-sm hover:bg-[#f3f4f6]">
                    Victory Template
                  </button>
                  <button className="px-3 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded text-sm hover:bg-[#f3f4f6]">
                    Draw Template
                  </button>
                  <button className="px-3 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded text-sm hover:bg-[#f3f4f6]">
                    Defeat Template
                  </button>
                  <button className="px-3 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded text-sm hover:bg-[#f3f4f6]">
                    Preview Template
                  </button>
                </div>

                {/* Content Editor */}
                <div className="border border-[#e5e7eb] rounded-lg">
                  <div className="border-b border-[#e5e7eb] p-3 bg-[#f9fafb]">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6]">B</button>
                      <button className="px-3 py-1 text-sm bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6]">I</button>
                      <button className="px-3 py-1 text-sm bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6]">Quote</button>
                      <button className="px-3 py-1 text-sm bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6]">Link Gallery</button>
                    </div>
                  </div>
                  <textarea 
                    rows={10}
                    placeholder="Banks o' Dee secured another impressive victory at Spain Park today, defeating Forres Mechanics 2-1 in front of a passionate home crowd..."
                    className="w-full p-4 border-0 resize-none focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Gallery Link */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📸 Link to Match Gallery:</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-[#6b7280]">Available Gallery:</span>
                  <span className="px-2 py-1 bg-[#dcfce7] text-[#166534] rounded text-sm font-medium">150615_Banks_O_Dee_Forres_Mechanics</span>
                  <button className="px-3 py-1 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium">
                    Link Gallery
                  </button>
                </div>
                <div className="text-xs text-[#6b7280] mt-2">
                  Gallery will be automatically linked to this match report
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded text-sm text-[#374151] hover:bg-[#f3f4f6]">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                  Preview
                </button>
              </div>
              <button className="px-6 py-2 bg-[#00105A] text-white rounded font-medium hover:bg-[#FFD700] hover:text-[#00105A] transition-colors">
                Publish Report
              </button>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Auto-linking:</strong> Send article ID to Supabase match.match_report_link field</li>
              <li>• <strong>Match Selection:</strong> Choose which match this report covers from dropdown</li>
              <li>• <strong>Template System:</strong> Pre-formatted match report structure for consistency</li>
              <li>• <strong>Data Population:</strong> Auto-fill match details from Supabase match record</li>
              <li>• <strong>Gallery Integration:</strong> Link to match galleries if available</li>
              <li>• <strong>Cross-platform Publishing:</strong> Automatic distribution to social media</li>
              <li>• <strong>SEO Optimization:</strong> Match-specific meta data and structured content</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
