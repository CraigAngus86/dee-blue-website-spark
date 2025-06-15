import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function PollManagementTab() {
  return (
    <div className="space-y-6">
      {/* Poll Creation & Management */}
      <AdminCard title="📊 Poll Creation & Management (📅 Low Priority) - Monthly engagement campaigns">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Active Poll Status */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">⭐ Current Active Poll:</h4>
              <div className="p-4 bg-[#FFD700] bg-opacity-20 border border-[#FFD700] rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-[#00105A]">Player of the Month - June 2025</div>
                  <span className="px-2 py-1 rounded text-xs bg-[#FFD700] text-[#00105A] font-medium">⭐ ACTIVE</span>
                </div>
                <div className="text-sm text-[#6b7280] mb-3">Which player impressed you most this month?</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium">Total Votes:</span> 247
                  </div>
                  <div>
                    <span className="font-medium">Ends:</span> 30/06/2025
                  </div>
                </div>
                <div className="mt-3">
                  <button className="px-4 py-2 bg-[#00105A] text-white rounded text-sm font-medium hover:bg-opacity-90">
                    View Results
                  </button>
                  <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600">
                    Close Early
                  </button>
                </div>
              </div>
            </div>

            {/* Poll Status Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📊 Poll Status Overview:</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">2</div>
                  <div className="text-sm text-[#6b7280]">Draft</div>
                  <div className="w-full bg-[#f3f4f6] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">1</div>
                  <div className="text-sm text-[#6b7280]">Active</div>
                  <div className="w-full bg-[#FFD700] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">3</div>
                  <div className="text-sm text-[#6b7280]">Closed</div>
                  <div className="w-full bg-[#C5E7FF] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">15</div>
                  <div className="text-sm text-[#6b7280]">Archived</div>
                  <div className="w-full bg-[#e5e7eb] h-1 rounded mt-2"></div>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Category:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Categories</option>
                    <option>Player of Month</option>
                    <option>Match Predictions</option>
                    <option>Competition Preferences</option>
                    <option>Community Topics</option>
                    <option>Club Preferences</option>
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
                    <option>Draft</option>
                    <option>Active</option>
                    <option>Closed</option>
                    <option>Archived</option>
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
                  + Create New Poll
                </button>
              </div>
            </div>

            {/* Poll Management Table */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white">
              <div className="overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b border-[#e5e7eb]">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Poll Question</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Category</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Status</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Votes</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">End Date</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">Player of the Month - June 2025</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-[#C5E7FF] text-[#00105A] font-medium">Player of Month</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-[#FFD700] text-lg">⭐</span>
                      </td>
                      <td className="p-4 align-middle text-center text-[#374151] font-medium">247</td>
                      <td className="p-4 align-middle text-[#6b7280]">30/06/2025</td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
                          <button className="text-red-500 hover:text-red-700 text-sm font-medium">Close</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">Best Performance vs Fraserburgh</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-[#f3f4f6] text-[#6b7280] font-medium">Match Predictions</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-blue-500 text-lg">⏰</span>
                      </td>
                      <td className="p-4 align-middle text-center text-[#6b7280]">-</td>
                      <td className="p-4 align-middle text-[#6b7280]">Draft</td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                          <button className="text-green-600 hover:text-green-800 text-sm font-medium">Publish</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">Favorite Match Day Food</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-[#dcfce7] text-[#166534] font-medium">Community</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center text-[#374151] font-medium">189</td>
                      <td className="p-4 align-middle text-[#6b7280]">25/05/2025</td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Results</button>
                          <button className="text-[#6b7280] hover:text-[#374151] text-sm font-medium">Archive</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">Season Prediction: Final League Position</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-[#fef3c7] text-[#92400e] font-medium">Predictions</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center text-[#374151] font-medium">156</td>
                      <td className="p-4 align-middle text-[#6b7280]">15/05/2025</td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Results</button>
                          <button className="text-[#6b7280] hover:text-[#374151] text-sm font-medium">Archive</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Poll Lifecycle:</strong> draft → active → closed → archived status workflow</li>
              <li>• <strong>Active Constraint:</strong> Only one poll active at a time (⭐ current poll indicator)</li>
              <li>• <strong>Supabase Integration:</strong> Real-time vote monitoring via supabasePollId field</li>
              <li>• <strong>Categories:</strong> competitions, player of month, predictions, preferences, community</li>
              <li>• <strong>Poll Creation:</strong> Question (200 char), 2-6 answer options (50 char each)</li>
              <li>• <strong>Scheduling:</strong> Start/end date management with early closure capabilities</li>
              <li>• <strong>Results Tracking:</strong> Real-time vote count and percentage calculations</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
