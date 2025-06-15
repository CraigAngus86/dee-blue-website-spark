import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function TeamsCompetitionsTab() {
  return (
    <div className="space-y-6">
      {/* Teams & Competitions Management */}
      <AdminCard title="👕 Teams & Competitions Management (📅 Low Priority) - Season setup, occasional updates">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Management Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📊 Management Overview:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">37</div>
                  <div className="text-sm text-[#6b7280]">Total Teams</div>
                  <div className="text-xs text-[#6b7280] mt-1">Highland League + Opponents</div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">8</div>
                  <div className="text-sm text-[#6b7280]">Competitions</div>
                  <div className="text-xs text-[#6b7280] mt-1">Leagues + Cup competitions</div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">4</div>
                  <div className="text-sm text-[#6b7280]">Seasons</div>
                  <div className="text-xs text-[#6b7280] mt-1">Current: 2024/25</div>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Data Type:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>Teams</option>
                    <option>Competitions</option>
                    <option>Seasons</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Search Teams:</label>
                <input 
                  type="text" 
                  placeholder="Search by team name..."
                  className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                />
              </div>

              <div className="flex items-end">
                <button className="px-4 py-3 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors w-full">
                  + Add New Team
                </button>
              </div>
            </div>

            {/* Teams Management Table */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🏟️ Teams Database:</h4>
              <div className="rounded-lg border border-[#e5e7eb] bg-white">
                <div className="overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="border-b border-[#e5e7eb]">
                      <tr>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Team Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Short Name</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Logo</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">BBC Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Stadium</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Founded</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] bg-[#C5E7FF] bg-opacity-30">
                        <td className="p-4 align-middle text-[#00105A] font-medium">Banks o' Dee</td>
                        <td className="p-4 align-middle text-[#374151]">BOD</td>
                        <td className="p-4 align-middle text-center">
                          <div className="w-8 h-8 bg-[#00105A] rounded mx-auto flex items-center justify-center">
                            <span className="text-white text-xs font-bold">BOD</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle text-[#374151]">Banks O Dee</td>
                        <td className="p-4 align-middle text-[#374151]">Spain Park</td>
                        <td className="p-4 align-middle text-[#6b7280]">1902</td>
                        <td className="p-4 align-middle text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                        <td className="p-4 align-middle text-[#374151] font-medium">Forres Mechanics</td>
                        <td className="p-4 align-middle text-[#374151]">Forres</td>
                        <td className="p-4 align-middle text-center">
                          <div className="w-8 h-8 bg-[#dc2626] rounded mx-auto flex items-center justify-center">
                            <span className="text-white text-xs font-bold">FM</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle text-[#374151]">Forres Mechanics</td>
                        <td className="p-4 align-middle text-[#374151]">Mosset Park</td>
                        <td className="p-4 align-middle text-[#6b7280]">1884</td>
                        <td className="p-4 align-middle text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                        <td className="p-4 align-middle text-[#374151] font-medium">Fraserburgh</td>
                        <td className="p-4 align-middle text-[#374151]">Fraserburgh</td>
                        <td className="p-4 align-middle text-center">
                          <div className="w-8 h-8 bg-[#1d4ed8] rounded mx-auto flex items-center justify-center">
                            <span className="text-white text-xs font-bold">FRA</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle text-[#374151]">Fraserburgh</td>
                        <td className="p-4 align-middle text-[#374151]">Bellslea Park</td>
                        <td className="p-4 align-middle text-[#6b7280]">1910</td>
                        <td className="p-4 align-middle text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                        <td className="p-4 align-middle text-[#374151] font-medium">Brora Rangers</td>
                        <td className="p-4 align-middle text-[#374151]">Brora</td>
                        <td className="p-4 align-middle text-center">
                          <div className="w-8 h-8 bg-[#059669] rounded mx-auto flex items-center justify-center">
                            <span className="text-white text-xs font-bold">BR</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle text-[#374151]">Brora Rangers</td>
                        <td className="p-4 align-middle text-[#374151]">Dudgeon Park</td>
                        <td className="p-4 align-middle text-[#6b7280]">1878</td>
                        <td className="p-4 align-middle text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                        <td className="p-4 align-middle text-[#374151] font-medium">Keith</td>
                        <td className="p-4 align-middle text-[#374151]">Keith</td>
                        <td className="p-4 align-middle text-center">
                          <div className="w-8 h-8 bg-[#9333ea] rounded mx-auto flex items-center justify-center">
                            <span className="text-white text-xs font-bold">KEI</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle text-[#374151]">Keith</td>
                        <td className="p-4 align-middle text-[#374151]">Kynoch Park</td>
                        <td className="p-4 align-middle text-[#6b7280]">1910</td>
                        <td className="p-4 align-middle text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Team Editor Modal Wireframe */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">✏️ Team Editor Interface (Modal):</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Team Name:</label>
                    <input 
                      type="text" 
                      value="Banks o' Dee"
                      className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Short Name:</label>
                    <input 
                      type="text" 
                      value="BOD"
                      className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">BBC Name (Critical for Scraper):</label>
                    <input 
                      type="text" 
                      value="Banks O Dee"
                      className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Stadium Name:</label>
                    <input 
                      type="text" 
                      value="Spain Park"
                      className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Founded Year:</label>
                    <input 
                      type="number" 
                      value="1902"
                      className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Website:</label>
                    <input 
                      type="url" 
                      value="https://banksofdeefc.com"
                      className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                    />
                  </div>
                </div>
                
                {/* Logo Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#374151] mb-2">Team Logo:</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[#00105A] rounded flex items-center justify-center">
                      <span className="text-white font-bold">BOD</span>
                    </div>
                    <div className="flex-1">
                      <button className="px-4 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                        Upload New Logo
                      </button>
                      <div className="text-xs text-[#6b7280] mt-1">PNG, SVG recommended • Max 2MB</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded text-sm text-[#374151] hover:bg-[#f3f4f6]">
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-[#00105A] text-white rounded font-medium hover:bg-[#FFD700] hover:text-[#00105A] transition-colors">
                    Save Team
                  </button>
                </div>
              </div>
            </div>

            {/* Competitions & Seasons Management */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* Competitions */}
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-4 m-0">🏆 Competitions:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                    <div>
                      <div className="font-medium text-[#374151]">Highland Football League</div>
                      <div className="text-sm text-[#6b7280]">League • 18 teams</div>
                    </div>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                    <div>
                      <div className="font-medium text-[#374151]">Scottish FA Cup</div>
                      <div className="text-sm text-[#6b7280]">Cup • Knockout</div>
                    </div>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                    <div>
                      <div className="font-medium text-[#374151]">Highland League Cup</div>
                      <div className="text-sm text-[#6b7280]">Cup • Highland teams</div>
                    </div>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                  </div>
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                  + Add Competition
                </button>
              </div>

              {/* Seasons */}
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-4 m-0">📅 Seasons:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-[#FFD700] bg-opacity-20 rounded border-2 border-[#FFD700]">
                    <div>
                      <div className="font-medium text-[#374151]">2024/25</div>
                      <div className="text-sm text-[#6b7280]">⭐ Current Season</div>
                    </div>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                    <div>
                      <div className="font-medium text-[#374151]">2023/24</div>
                      <div className="text-sm text-[#6b7280]">Completed</div>
                    </div>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                    <div>
                      <div className="font-medium text-[#374151]">2022/23</div>
                      <div className="text-sm text-[#6b7280]">Completed</div>
                    </div>
                    <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
                  </div>
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                  + Create New Season
                </button>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Rich Team Data:</strong> name, short_name, logo_url, founded_year, website, primary_color, stadium_name</li>
              <li>• <strong>BBC Scraper Mapping:</strong> bbc_name field critical for automated league table updates</li>
              <li>• <strong>Logo Management:</strong> Cloudinary integration for team logo uploads and optimization</li>
              <li>• <strong>UUID System:</strong> User-friendly dropdowns with backend UUID population for matches</li>
              <li>• <strong>Competition Types:</strong> League vs Cup designation with participant tracking</li>
              <li>• <strong>Season Management:</strong> Current season flagging and historical data preservation</li>
              <li>• <strong>Data Dependencies:</strong> Teams and competitions required before creating matches</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
