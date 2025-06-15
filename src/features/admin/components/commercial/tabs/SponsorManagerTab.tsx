import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function SponsorManagerTab() {
  return (
    <div className="space-y-6">
      {/* Sponsor Management */}
      <AdminCard title="🤝 Sponsor Management (📅 Low Priority) - Contract renewals, new partnerships">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Sponsor Tier Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📊 Sponsor Tiers Overview:</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">Principal Partners</div>
                  <div className="text-2xl font-bold text-[#FFD700] mt-2">2</div>
                  <div className="text-sm text-[#6b7280]">Premium tier sponsors</div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">Main Sponsors</div>
                  <div className="text-2xl font-bold text-[#C5E7FF] mt-2">5</div>
                  <div className="text-sm text-[#6b7280]">Key partnership level</div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">Official Partners</div>
                  <div className="text-2xl font-bold text-[#9ca3af] mt-2">8</div>
                  <div className="text-sm text-[#6b7280]">Supporting partners</div>
                </div>
              </div>
            </div>

            {/* Header Display Management */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🎯 Header Display Control:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                  <h5 className="font-medium text-[#374151] mb-2">Desktop Header (Max 3)</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-[#f9fafb] rounded">
                      <span className="text-sm">Aberdeen Oil Services</span>
                      <span className="text-xs text-[#FFD700]">Principal</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[#f9fafb] rounded">
                      <span className="text-sm">North East Construction</span>
                      <span className="text-xs text-[#C5E7FF]">Main</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[#f9fafb] rounded">
                      <span className="text-sm">Local Hospitality Group</span>
                      <span className="text-xs text-[#C5E7FF]">Main</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                  <h5 className="font-medium text-[#374151] mb-2">Mobile Primary Sponsor</h5>
                  <div className="p-4 bg-[#FFD700] bg-opacity-20 rounded text-center">
                    <div className="text-sm font-medium">Aberdeen Oil Services</div>
                    <div className="text-xs text-[#6b7280]">Principal Partner</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Tier:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Tiers</option>
                    <option>Principal Partner</option>
                    <option>Main Sponsor</option>
                    <option>Official Partner</option>
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
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending Renewal</option>
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
                  + Add New Sponsor
                </button>
              </div>
            </div>

            {/* Sponsor Database Table */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white">
              <div className="overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b border-[#e5e7eb]">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Sponsor Name</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Tier</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Status</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Header Display</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Website</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Contract End</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">Aberdeen Oil Services</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-[#FFD700] text-[#00105A] font-medium">Principal</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">aberdenoil.co.uk</td>
                      <td className="p-4 align-middle text-[#6b7280]">May 2026</td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">North East Construction</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-[#C5E7FF] text-[#00105A] font-medium">Main</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">neconstruction.com</td>
                      <td className="p-4 align-middle text-[#6b7280]">Dec 2025</td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">Local Hospitality Group</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-[#C5E7FF] text-[#00105A] font-medium">Main</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">localhospitality.co.uk</td>
                      <td className="p-4 align-middle text-[#6b7280]">Aug 2025</td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">Aberdeen Print Solutions</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-[#f3f4f6] text-[#6b7280] font-medium">Partner</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">aberdprint.com</td>
                      <td className="p-4 align-middle text-[#6b7280]">Mar 2026</td>
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
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Sanity CMS Management:</strong> Sponsors completely managed in Sanity (not Supabase)</li>
              <li>• <strong>Tier Categories:</strong> Principal Partner, Main Sponsor, Official Partner</li>
              <li>• <strong>Header Display Control:</strong> Max 3 sponsors for header, primary mobile sponsor selection</li>
              <li>• <strong>Cross-linking:</strong> match_sponsor_id in Supabase links to Sanity document IDs</li>
              <li>• <strong>Display Order Management:</strong> Control sponsor arrangement and visibility</li>
              <li>• <strong>Additional Types:</strong> Match sponsor, Player sponsor capabilities</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}