"use client";
import React, { useState } from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { AdminModal } from '../../shared/AdminModal';

type AdminMode = 'add' | 'edit' | 'delete';

interface ModalState {
  isOpen: boolean;
  mode: AdminMode;
  recordId: string | null;
}

export function MatchDataTab() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: 'add',
    recordId: null
  });

  const openModal = (mode: AdminMode, recordId?: string) => {
    setModalState({
      isOpen: true,
      mode,
      recordId: recordId || null
    });
  };

  const closeModal = () => {
    setModalState({
      ...modalState,
      isOpen: false
    });
  };

  const handleModalSuccess = () => {
    console.log('Match operation successful - refreshing table...');
    closeModal();
  };

  return (
    <div className="space-y-6">
      {/* Match Data Manager */}
      <AdminCard title="🎯 Match Data Manager (🔥 High Priority) - Every Saturday + midweek games">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Season:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Seasons</option>
                    <option>2024/25</option>
                    <option>2023/24</option>
                    <option>2022/23</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Month:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Months</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Competition:</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                    <option>All Competitions</option>
                    <option>Highland Football League</option>
                    <option>Scottish FA Cup</option>
                    <option>Highland League Cup</option>
                    <option>Aberdeenshire Cup</option>
                    <option>Premier Sports Cup</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Add New Match Button */}
            <div className="mb-4 flex justify-end">
              <button 
                onClick={() => openModal('add')}
                className="px-4 py-2 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors"
              >
                + Add New Match
              </button>
            </div>
              
            {/* Match Results Table - FULL RESTORATION */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white">
              <div className="overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b border-[#e5e7eb]">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Date & Time</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Home Team</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Away Team</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Score</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Status</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Hospitality</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Tickets</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Report</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Gallery</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Sponsor</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle">
                        <div className="text-[#374151] font-medium">15/06/2025</div>
                        <div className="text-[#6b7280] text-xs">15:00</div>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">Banks o' Dee</td>
                      <td className="p-4 align-middle text-[#374151]">Forres Mechanics</td>
                      <td className="p-4 align-middle text-[#374151] font-medium">2-1</td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => openModal('edit', '1')}
                            className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openModal('delete', '1')}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle">
                        <div className="text-[#374151] font-medium">08/06/2025</div>
                        <div className="text-[#6b7280] text-xs">14:30</div>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">Cove Rangers</td>
                      <td className="p-4 align-middle text-[#374151]">Banks o' Dee</td>
                      <td className="p-4 align-middle text-[#374151] font-medium">0-3</td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => openModal('edit', '2')}
                            className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openModal('delete', '2')}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle">
                        <div className="text-[#374151] font-medium">22/06/2025</div>
                        <div className="text-[#6b7280] text-xs">15:00</div>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">Banks o' Dee</td>
                      <td className="p-4 align-middle text-[#374151]">Brora Rangers</td>
                      <td className="p-4 align-middle text-[#6b7280]">-</td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-blue-500 text-lg">⏰</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => openModal('edit', '3')}
                            className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openModal('delete', '3')}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle">
                        <div className="text-[#374151] font-medium">29/06/2025</div>
                        <div className="text-[#6b7280] text-xs">15:00</div>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">Fraserburgh</td>
                      <td className="p-4 align-middle text-[#374151]">Banks o' Dee</td>
                      <td className="p-4 align-middle text-[#6b7280]">-</td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-blue-500 text-lg">⏰</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => openModal('edit', '4')}
                            className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openModal('delete', '4')}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle">
                        <div className="text-[#374151] font-medium">06/07/2025</div>
                        <div className="text-[#6b7280] text-xs">15:00</div>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">Banks o' Dee</td>
                      <td className="p-4 align-middle text-[#374151]">Inverurie Loco Works</td>
                      <td className="p-4 align-middle text-[#6b7280]">-</td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-blue-500 text-lg">⏰</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => openModal('edit', '5')}
                            className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openModal('delete', '5')}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle">
                        <div className="text-[#374151] font-medium">13/07/2025</div>
                        <div className="text-[#6b7280] text-xs">16:00</div>
                      </td>
                      <td className="p-4 align-middle text-[#374151]">Keith</td>
                      <td className="p-4 align-middle text-[#374151]">Banks o' Dee</td>
                      <td className="p-4 align-middle text-[#374151] font-medium">1-4</td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-red-500 text-lg">✗</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => openModal('edit', '6')}
                            className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openModal('delete', '6')}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
              
            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-2 mt-4">
              <div className="text-sm text-[#6b7280]">
                Showing 1-25 of 166 matches
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb] disabled:opacity-50" disabled>
                  Previous
                </button>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 rounded bg-[#00105A] text-white text-sm">1</button>
                  <button className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb]">2</button>
                  <button className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb]">3</button>
                  <span className="px-2 py-1 text-sm text-[#6b7280]">...</span>
                  <button className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb]">7</button>
                </div>
                <button className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb]">
                  Next
                </button>
              </div>
            </div>
          </div>
          
          {/* Supabase Data Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Supabase Data Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>166 matches total:</strong> NEEDS pagination (25-50 per page)</li>
              <li>• <strong>37 teams:</strong> Searchable dropdown (UUID backend population)</li>
              <li>• <strong>8 competitions:</strong> Simple dropdown</li>
              <li>• <strong>4 seasons:</strong> Simple dropdown</li>
              <li>• <strong>Critical fields:</strong> hospitality_available, is_highlighted, gallery_idsanity, match_report_link, ticket_link</li>
              <li>• <strong>Modal Logic:</strong> ADD (all fields), EDIT (all fields but frozen: season, teams, date, venue)</li>
            </ul>
          </div>
        </div>
      </AdminCard>

      {/* AdminModal Integration */}
      <AdminModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        entityType="match"
        mode={modalState.mode}
        recordId={modalState.recordId}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}