import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function LeagueTablesTab() {
  return (
    <div className="space-y-6">
      {/* League Tables & BBC Scraper */}
      <AdminCard title="📊 League Tables & BBC Scraper (⚡ Medium Priority) - Weekly/Bi-weekly updates">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* BBC Scraper Controls */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🔄 BBC Scraper Controls:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                  <h5 className="font-medium text-[#374151] mb-2">Last Scrape Status</h5>
                  <div className="text-sm text-[#6b7280] mb-1">Yesterday at 18:30</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <span className="text-sm text-green-600 font-medium">Success</span>
                  </div>
                  <div className="text-xs text-[#6b7280] mt-1">18 teams updated</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                  <h5 className="font-medium text-[#374151] mb-2">Next Scheduled Scrape</h5>
                  <div className="text-sm text-[#6b7280] mb-1">Today at 18:30</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-500 text-lg">⏰</span>
                    <span className="text-sm text-blue-500 font-medium">Scheduled</span>
                  </div>
                  <div className="text-xs text-[#6b7280] mt-1">Auto-triggered daily</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                  <h5 className="font-medium text-[#374151] mb-2">Manual Control</h5>
                  <button className="w-full px-4 py-2 bg-[#00105A] text-white rounded font-medium hover:bg-[#FFD700] hover:text-[#00105A] transition-colors mb-2">
                    Force Scrape Now
                  </button>
                  <div className="text-xs text-[#6b7280]">Override scheduled scrape</div>
                </div>
              </div>
            </div>

            {/* Staged Data Review */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📋 Scraped Data Review (Staging Table):</h4>
              <div className="bg-white rounded-lg border border-[#e5e7eb]">
                <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-[#374151]">Latest Scrape:</span>
                      <span className="ml-2 text-sm text-[#6b7280]">15/06/2025 18:30</span>
                      <span className="ml-2 px-2 py-1 bg-[#fef3c7] text-[#92400e] rounded text-xs font-medium">Pending Review</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700">
                        Apply to Live Table
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600">
                        Reject Scrape
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="border-b border-[#e5e7eb]">
                      <tr>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Pos</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Team</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">P</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">W</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">D</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">L</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">GD</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Pts</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Changes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                        <td className="p-4 align-middle font-medium text-[#374151]">1</td>
                        <td className="p-4 align-middle text-[#374151]">Buckie Thistle</td>
                        <td className="p-4 align-middle text-center">15</td>
                        <td className="p-4 align-middle text-center">12</td>
                        <td className="p-4 align-middle text-center">2</td>
                        <td className="p-4 align-middle text-center">1</td>
                        <td className="p-4 align-middle text-center">+18</td>
                        <td className="p-4 align-middle text-center font-medium">38</td>
                        <td className="p-4 align-middle text-center">
                          <span className="text-green-600 text-sm">+3pts</span>
                        </td>
                      </tr>
                      <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                        <td className="p-4 align-middle font-medium text-[#374151]">2</td>
                        <td className="p-4 align-middle text-[#374151]">Fraserburgh</td>
                        <td className="p-4 align-middle text-center">14</td>
                        <td className="p-4 align-middle text-center">11</td>
                        <td className="p-4 align-middle text-center">1</td>
                        <td className="p-4 align-middle text-center">2</td>
                        <td className="p-4 align-middle text-center">+15</td>
                        <td className="p-4 align-middle text-center font-medium">34</td>
                        <td className="p-4 align-middle text-center">
                          <span className="text-gray-500 text-sm">No change</span>
                        </td>
                      </tr>
                      <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] bg-[#C5E7FF] bg-opacity-30">
                        <td className="p-4 align-middle font-medium text-[#00105A]">3</td>
                        <td className="p-4 align-middle text-[#00105A] font-medium">Banks o' Dee</td>
                        <td className="p-4 align-middle text-center">15</td>
                        <td className="p-4 align-middle text-center">10</td>
                        <td className="p-4 align-middle text-center">2</td>
                        <td className="p-4 align-middle text-center">3</td>
                        <td className="p-4 align-middle text-center">+12</td>
                        <td className="p-4 align-middle text-center font-medium">32</td>
                        <td className="p-4 align-middle text-center">
                          <span className="text-green-600 text-sm">+3pts ↑1</span>
                        </td>
                      </tr>
                      <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                        <td className="p-4 align-middle font-medium text-[#374151]">4</td>
                        <td className="p-4 align-middle text-[#374151]">Brora Rangers</td>
                        <td className="p-4 align-middle text-center">14</td>
                        <td className="p-4 align-middle text-center">9</td>
                        <td className="p-4 align-middle text-center">3</td>
                        <td className="p-4 align-middle text-center">2</td>
                        <td className="p-4 align-middle text-center">+8</td>
                        <td className="p-4 align-middle text-center font-medium">30</td>
                        <td className="p-4 align-middle text-center">
                          <span className="text-red-500 text-sm">↓1</span>
                        </td>
                      </tr>
                      <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                        <td className="p-4 align-middle font-medium text-[#374151]">5</td>
                        <td className="p-4 align-middle text-[#374151]">Formartine United</td>
                        <td className="p-4 align-middle text-center">15</td>
                        <td className="p-4 align-middle text-center">8</td>
                        <td className="p-4 align-middle text-center">4</td>
                        <td className="p-4 align-middle text-center">3</td>
                        <td className="p-4 align-middle text-center">+5</td>
                        <td className="p-4 align-middle text-center font-medium">28</td>
                        <td className="p-4 align-middle text-center">
                          <span className="text-gray-500 text-sm">No change</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Manual League Table Editor */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">✏️ Manual League Table Editor:</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="font-medium text-[#374151]">Current Live Table</span>
                    <span className="ml-2 text-sm text-[#6b7280]">Last updated: 14/06/2025</span>
                  </div>
                  <button className="px-4 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                    Enable Edit Mode
                  </button>
                </div>
                
                <div className="text-sm text-[#6b7280] mb-3">
                  Click "Enable Edit Mode" to manually adjust positions, points, or stats if BBC scraper data is incorrect
                </div>
                
                {/* Compact live table preview */}
                <div className="bg-[#f9fafb] p-3 rounded border border-[#e5e7eb]">
                  <div className="grid grid-cols-6 gap-2 text-xs font-medium text-[#6b7280] mb-2">
                    <div>Pos</div>
                    <div>Team</div>
                    <div>P</div>
                    <div>GD</div>
                    <div>Pts</div>
                    <div>Actions</div>
                  </div>
                  <div className="space-y-1">
                    <div className="grid grid-cols-6 gap-2 text-sm">
                      <div>1</div>
                      <div>Buckie Thistle</div>
                      <div>14</div>
                      <div>+15</div>
                      <div className="font-medium">35</div>
                      <div><button className="text-[#00105A] text-xs">Edit</button></div>
                    </div>
                    <div className="grid grid-cols-6 gap-2 text-sm">
                      <div>2</div>
                      <div>Fraserburgh</div>
                      <div>14</div>
                      <div>+15</div>
                      <div className="font-medium">34</div>
                      <div><button className="text-[#00105A] text-xs">Edit</button></div>
                    </div>
                    <div className="grid grid-cols-6 gap-2 text-sm bg-[#C5E7FF] bg-opacity-30 p-1 rounded">
                      <div className="font-medium">4</div>
                      <div className="font-medium">Banks o' Dee</div>
                      <div>14</div>
                      <div>+9</div>
                      <div className="font-medium">29</div>
                      <div><button className="text-[#00105A] text-xs font-medium">Edit</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrape History */}
            <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📈 Scrape History & Monitoring:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                  <div>
                    <div className="font-medium text-[#374151]">15/06/2025 18:30</div>
                    <div className="text-sm text-[#6b7280]">Highland League table scraped</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-lg">✓</span>
                    <div className="text-xs text-[#6b7280]">18 teams • 2.3s</div>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                  <div>
                    <div className="font-medium text-[#374151]">14/06/2025 18:30</div>
                    <div className="text-sm text-[#6b7280]">Highland League table scraped</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-lg">✓</span>
                    <div className="text-xs text-[#6b7280]">18 teams • 1.8s</div>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                  <div>
                    <div className="font-medium text-[#374151]">13/06/2025 18:30</div>
                    <div className="text-sm text-[#6b7280]">Highland League table scraped</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 text-lg">✗</span>
                    <div className="text-xs text-red-500">BBC timeout</div>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Retry</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>BBC Scraper Integration:</strong> Automated daily scraping with staging table validation</li>
              <li>• <strong>Staging System:</strong> league_table_staging table prevents bad data corruption</li>
              <li>• <strong>Team Mapping:</strong> BBC team name matching via teams.bbc_name field</li>
              <li>• <strong>Manual Override:</strong> Direct editing capabilities when scraper fails</li>
              <li>• <strong>Data Validation:</strong> Mathematical consistency checks for points/goals</li>
              <li>• <strong>Scrape History:</strong> Success/failure tracking with downloadable logs</li>
              <li>• <strong>Real-time Updates:</strong> Immediate table updates after match completion</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
