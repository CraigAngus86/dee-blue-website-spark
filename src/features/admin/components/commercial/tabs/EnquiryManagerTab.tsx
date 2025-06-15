import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function EnquiryManagerTab() {
  return (
    <div className="space-y-6">
      {/* Business Enquiry Manager */}
      <AdminCard title="📧 Business Enquiry Manager (⚡ Medium Priority) - Time-sensitive revenue opportunities">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Enquiry Status Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📊 Enquiry Status Overview:</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">2</div>
                  <div className="text-sm text-[#6b7280]">Pending</div>
                  <div className="w-full bg-[#fef3c7] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">5</div>
                  <div className="text-sm text-[#6b7280]">In Progress</div>
                  <div className="w-full bg-[#C5E7FF] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">3</div>
                  <div className="text-sm text-[#6b7280]">Proposal Sent</div>
                  <div className="w-full bg-[#FFD700] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">28</div>
                  <div className="text-sm text-[#6b7280]">Closed</div>
                  <div className="w-full bg-[#dcfce7] h-1 rounded mt-2"></div>
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
                    <option>In Progress</option>
                    <option>Proposal Sent</option>
                    <option>Closed</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Priority:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Priorities</option>
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Standard</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Source:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Sources</option>
                    <option>Spain Park Page</option>
                    <option>Commercial Page</option>
                    <option>Direct Contact</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Tracking Table */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white">
              <div className="overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b border-[#e5e7eb]">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Company</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Type</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Priority</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Assigned To</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Date</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">Aberdeen Oil Services</td>
                      <td className="p-4 align-middle text-[#374151]">Match Sponsorship</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800 font-medium">High</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-blue-500 text-lg">⏰</span>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">Craig</td>
                      <td className="p-4 align-middle text-[#6b7280]">14/06/2025</td>
                      <td className="p-4 align-middle text-center">
                        <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">North East Hospitality</td>
                      <td className="p-4 align-middle text-[#374151]">Hospitality Package</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-amber-100 text-amber-800 font-medium">Medium</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">Sarah</td>
                      <td className="p-4 align-middle text-[#6b7280]">12/06/2025</td>
                      <td className="p-4 align-middle text-center">
                        <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">Local Construction Ltd</td>
                      <td className="p-4 align-middle text-[#374151]">Perimeter Board</td>
                      <td className="p-4 align-middle text-center">
                        <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800 font-medium">Standard</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">Mike</td>
                      <td className="p-4 align-middle text-[#6b7280]">10/06/2025</td>
                      <td className="p-4 align-middle text-center">
                        <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
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
              <li>• <strong>Supabase Table:</strong> commercial_enquiries (id, enquiry_type, company_name, contact_email, package_interest, message, status, created_at)</li>
              <li>• <strong>Status Workflow:</strong> pending → in_progress → proposal_sent → closed</li>
              <li>• <strong>Email Integration:</strong> Automated notifications for new enquiries</li>
              <li>• <strong>Sources:</strong> Spain Park and Commercial page submissions</li>
              <li>• <strong>Priority System:</strong> High Priority, Medium Priority, Standard</li>
              <li>• <strong>Team Assignment:</strong> Commercial team member handling enquiry</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}