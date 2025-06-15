import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function StaffManagementTab() {
  return (
    <div className="space-y-6">
      {/* Staff Management */}
      <AdminCard title="👔 Staff Profile Management (📅 Low Priority) - Management and coaching team updates">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Staff Overview Statistics */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📊 Staff Overview:</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">8</div>
                  <div className="text-sm text-[#6b7280]">Total Staff</div>
                  <div className="text-xs text-[#6b7280] mt-1">Management + Coaching</div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">3</div>
                  <div className="text-sm text-[#6b7280]">Management</div>
                  <div className="text-xs text-[#6b7280] mt-1">Senior positions</div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">4</div>
                  <div className="text-sm text-[#6b7280]">Coaching Staff</div>
                  <div className="text-xs text-[#6b7280] mt-1">Specialized coaches</div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">1</div>
                  <div className="text-sm text-[#6b7280]">Support Staff</div>
                  <div className="text-xs text-[#6b7280] mt-1">Medical + Admin</div>
                </div>
              </div>
            </div>

            {/* Staff Category Filters */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🎯 Staff Categories:</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border-2 border-[#00105A] rounded text-[#00105A] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] font-medium">
                    <option>All Staff</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#00105A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>Management</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>Coaching Staff</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <button className="px-4 py-3 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors w-full">
                    + Add New Staff
                  </button>
                </div>
              </div>
            </div>

            {/* Management Team */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">👥 Management Team:</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Manager */}
                  <div className="relative group cursor-pointer p-4 border border-[#e5e7eb] rounded-lg hover:border-[#C5E7FF] transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold text-sm">PJ</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#374151]">Paul Johnstone</div>
                        <div className="text-xs text-[#FFD700] font-medium">Manager</div>
                        <div className="text-xs text-[#6b7280]">Since 2022</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#6b7280]">Contract</div>
                        <div className="text-xs font-medium text-[#374151]">2025</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-[#6b7280]">
                      Former Aberdeen FC coach • UEFA A License
                    </div>
                  </div>
                  
                  {/* Assistant Manager */}
                  <div className="relative group cursor-pointer p-4 border border-[#e5e7eb] rounded-lg hover:border-[#C5E7FF] transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold text-sm">SM</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#374151]">Steve Mitchell</div>
                        <div className="text-xs text-[#00105A] font-medium">Assistant Manager</div>
                        <div className="text-xs text-[#6b7280]">Since 2023</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#6b7280]">Contract</div>
                        <div className="text-xs font-medium text-[#374151]">2024</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-[#6b7280]">
                      Former Formartine United manager • UEFA B License
                    </div>
                  </div>
                  
                  {/* General Manager */}
                  <div className="relative group cursor-pointer p-4 border border-[#e5e7eb] rounded-lg hover:border-[#C5E7FF] transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold text-sm">AB</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#374151]">Alan Brown</div>
                        <div className="text-xs text-[#00105A] font-medium">General Manager</div>
                        <div className="text-xs text-[#6b7280]">Since 2020</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#6b7280]">Role</div>
                        <div className="text-xs font-medium text-[#374151]">Operations</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-[#6b7280]">
                      Club operations and player recruitment specialist
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coaching Staff */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">⚽ Coaching Staff:</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* First Team Coach */}
                  <div className="relative group cursor-pointer p-3 border border-[#e5e7eb] rounded-lg hover:border-[#C5E7FF] transition-colors text-center">
                    <div className="w-12 h-12 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#00105A] font-bold text-xs">RC</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-[#374151]">Robert Clark</div>
                    <div className="text-xs text-[#00105A] font-medium">First Team Coach</div>
                    <div className="text-xs text-[#6b7280]">UEFA B License</div>
                  </div>
                  
                  {/* Goalkeeper Coach */}
                  <div className="relative group cursor-pointer p-3 border border-[#e5e7eb] rounded-lg hover:border-[#C5E7FF] transition-colors text-center">
                    <div className="w-12 h-12 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#00105A] font-bold text-xs">JW</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-[#374151]">John Watson</div>
                    <div className="text-xs text-[#00105A] font-medium">Goalkeeper Coach</div>
                    <div className="text-xs text-[#6b7280]">FA Level 3</div>
                  </div>
                  
                  {/* Youth Coach */}
                  <div className="relative group cursor-pointer p-3 border border-[#e5e7eb] rounded-lg hover:border-[#C5E7FF] transition-colors text-center">
                    <div className="w-12 h-12 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#00105A] font-bold text-xs">MT</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-[#374151]">Michael Taylor</div>
                    <div className="text-xs text-[#00105A] font-medium">Youth Coach</div>
                    <div className="text-xs text-[#6b7280]">UEFA B License</div>
                  </div>
                  
                  {/* Fitness Coach */}
                  <div className="relative group cursor-pointer p-3 border border-[#e5e7eb] rounded-lg hover:border-[#C5E7FF] transition-colors text-center">
                    <div className="w-12 h-12 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#00105A] font-bold text-xs">LG</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-[#374151]">Lisa Grant</div>
                    <div className="text-xs text-[#00105A] font-medium">Fitness Coach</div>
                    <div className="text-xs text-[#6b7280]">Sports Science</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Staff */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🏥 Support Staff:</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Physiotherapist */}
                  <div className="relative group cursor-pointer p-4 border border-[#e5e7eb] rounded-lg hover:border-[#C5E7FF] transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold text-xs">DH</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#374151]">Dr. Helen Ross</div>
                        <div className="text-xs text-[#00105A] font-medium">Club Physiotherapist</div>
                        <div className="text-xs text-[#6b7280]">Chartered Physiotherapist • Sports Medicine</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Kit Manager */}
                  <div className="relative group cursor-pointer p-4 border border-[#e5e7eb] rounded-lg hover:border-[#C5E7FF] transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold text-xs">TM</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#374151]">Tommy MacDonald</div>
                        <div className="text-xs text-[#00105A] font-medium">Kit Manager</div>
                        <div className="text-xs text-[#6b7280]">Equipment management • 15 years experience</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Profile Editor Modal Wireframe */}
            <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">✏️ Staff Profile Editor (Modal Interface):</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Personal & Role Information */}
                <div>
                  <div className="text-sm font-medium text-[#374151] mb-3">Personal & Role Information:</div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1">Full Name:</label>
                      <input 
                        type="text" 
                        value="Paul Johnstone"
                        className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1">Role:</label>
                      <div className="relative">
                        <select className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                          <option>Manager</option>
                          <option>Assistant Manager</option>
                          <option>First Team Coach</option>
                          <option>Goalkeeper Coach</option>
                          <option>Youth Coach</option>
                          <option>Fitness Coach</option>
                          <option>Physiotherapist</option>
                          <option>General Manager</option>
                          <option>Kit Manager</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg className="w-3 h-3 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Start Date:</label>
                        <input 
                          type="date" 
                          value="2022-07-01"
                          className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Contract Until:</label>
                        <input 
                          type="date" 
                          value="2025-06-30"
                          className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1">Qualifications:</label>
                      <input 
                        type="text" 
                        value="UEFA A License"
                        placeholder="e.g. UEFA A License, Sports Science Degree"
                        className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Photo & Career History */}
                <div>
                  <div className="text-sm font-medium text-[#374151] mb-3">Photo & Career History:</div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-b from-[#00105A] to-[#C5E7FF] rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#00105A] font-bold">PJ</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <button className="px-4 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80 mb-2">
                          Upload Photo
                        </button>
                        <div className="text-xs text-[#6b7280]">Professional headshot • Square crop preferred</div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1">Previous Experience:</label>
                      <textarea 
                        rows={4}
                        value="Aberdeen FC Youth Coach (2018-2022), Cove Rangers Assistant Manager (2015-2018), Former professional player at Dundee FC and Arbroath FC"
                        className="w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A] resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1">Key Achievements:</label>
                      <textarea 
                        rows={3}
                        value="Led Aberdeen FC Youth to Scottish Cup Final (2021), Developed 5 players to professional level, Highland League Manager of the Year nominee (2023)"
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
                  Save Staff Member
                </button>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Role Categories:</strong> Management, Coaching Staff, Support Staff with hierarchical organization</li>
              <li>• <strong>Cloudinary Integration:</strong> Professional headshot uploads with face detection optimization</li>
              <li>• <strong>Contract Management:</strong> Start dates, contract expiry tracking, automatic renewals</li>
              <li>• <strong>Qualification Tracking:</strong> Coaching licenses, certifications, professional development</li>
              <li>• <strong>Career History:</strong> Previous roles, achievements, professional playing background</li>
              <li>• <strong>Sanity CMS Integration:</strong> Staff profiles sync with main website team page</li>
              <li>• <strong>Modal System:</strong> Follow established AdminModal pattern for profile editing</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
