"use client";
import React, { useState, useEffect } from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { AdminModal } from '../../shared/AdminModal';

type AdminMode = 'add' | 'edit' | 'delete';

interface ModalState {
  isOpen: boolean;
  mode: AdminMode;
  recordId: string | null;
}

interface MatchDataTabProps {
  initialData?: {
    matches: any[];
    pagination: any;
  };
}

export function MatchDataTab({ initialData }: MatchDataTabProps) {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: 'add',
    recordId: null
  });

  const [matches, setMatches] = useState(initialData?.matches || []);
  const [pagination, setPagination] = useState(initialData?.pagination || { page: 1, pageSize: 25, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  
  // Filter states - DEFAULT TO CURRENT SEASON
  const [filters, setFilters] = useState({
    season: 'af5027b8-c9db-48d8-9edb-ca6c71359dff', // 2025-2026 current season
    month: 'all',
    competition: 'all'
  });

  // Real seasons data from database
  const seasons = [
    { value: 'all', label: 'All Seasons' },
    { value: 'af5027b8-c9db-48d8-9edb-ca6c71359dff', label: '2025-2026', current: true },
    { value: '1cfa5afa-155a-4a79-9213-467d92692d15', label: '2024-2025', current: false },
    { value: '159e684e-da41-4cbb-869e-6f570100c5f1', label: '2023-2024', current: false },
    { value: '43a190d4-8c57-4129-b9b1-2a13e471317f', label: '2022-2023', current: false }
  ];

  // Real competitions data from database
  const competitions = [
    { value: 'all', label: 'All Competitions' },
    { value: '66131803-04b0-4d36-aacb-d32d287ccf33', label: 'Highland Football League', type: 'league' },
    { value: '9f8c9720-1494-490a-8f27-37d9d9e8e16b', label: 'Scottish FA Cup', type: 'cup' },
    { value: '3e364560-ad45-4184-adf3-ebc8b2b39676', label: 'Highland League Cup', type: 'cup' },
    { value: '6f6e26d4-7d9e-4a9e-b2c9-2ce4910282f0', label: 'Aberdeenshire Cup', type: 'cup' },
    { value: '38b4d19d-04ee-452e-b10d-658a685b3f49', label: 'Premier Sports Cup', type: 'cup' },
    { value: '08716009-2c77-42a3-9085-36146aa9c4f5', label: 'Aberdeenshire Shield', type: 'cup' },
    { value: '1a1b108d-1705-4b67-add6-057d62c97e5c', label: 'SPFL Trust Trophy', type: 'cup' },
    { value: 'a1497a5c-94cc-4d56-b73e-ff43d39076ab', label: 'Friendly', type: 'friendly' }
  ];

  // Fetch matches data
  const fetchMatches = async (page = 1, newFilters = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: '25',
        ...(newFilters.season !== 'all' && { season: newFilters.season }),
        ...(newFilters.month !== 'all' && { month: newFilters.month }),
        ...(newFilters.competition !== 'all' && { competition: newFilters.competition })
      });

      const response = await fetch(`/api/admin/matches?${params}`);
      const data = await response.json();

      if (data.success) {
        setMatches(data.matches);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount - START WITH CURRENT SEASON
  useEffect(() => {
    if (!initialData) {
      fetchMatches(1, filters); // Use current season filter from start
    }
  }, []);

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
    fetchMatches(pagination.page); // Refresh current page
    closeModal();
  };

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    fetchMatches(1, newFilters); // Reset to page 1 with new filters
  };

  const handlePageChange = (newPage: number) => {
    fetchMatches(newPage);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    return timeString.substring(0, 5); // "15:00:00" -> "15:00"
  };

  // Get visual indicator for status
  const getStatusIndicator = (match: any) => {
    if (match.status === 'completed') {
      return <span className="text-green-600 text-lg">✓</span>;
    } else if (match.status === 'scheduled') {
      return <span className="text-blue-500 text-lg">⏰</span>;
    } else {
      return <span className="text-red-500 text-lg">✗</span>;
    }
  };

  // Get visual indicator for boolean fields
  const getBooleanIndicator = (value: boolean) => {
    return value 
      ? <span className="text-green-600 text-lg">✓</span>
      : <span className="text-red-500 text-lg">✗</span>;
  };

  // Get visual indicator for optional fields
  const getOptionalIndicator = (value: any) => {
    return value 
      ? <span className="text-green-600 text-lg">✓</span>
      : <span className="text-red-500 text-lg">✗</span>;
  };

  return (
    <div className="space-y-6">
      {/* Match Data Manager */}
      <AdminCard title="Match Data Manager (✅ Complete)">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Filter Controls + Add Button - SAME ROW */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Season:</label>
                <div className="relative">
                  <select 
                    value={filters.season}
                    onChange={(e) => handleFilterChange('season', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    {seasons.map(season => (
                      <option key={season.value} value={season.value}>
                        {season.label} {season.current ? '(Current)' : ''}
                      </option>
                    ))}
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
                  <select 
                    value={filters.month}
                    onChange={(e) => handleFilterChange('month', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    <option value="all">All Months</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
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
                  <select 
                    value={filters.competition}
                    onChange={(e) => handleFilterChange('competition', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    {competitions.map(comp => (
                      <option key={comp.value} value={comp.value}>
                        {comp.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Add New Match Button - SAME ROW */}
              <div className="flex items-end">
                <button 
                  onClick={() => openModal('add')}
                  className="w-full px-4 py-3 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors"
                >
                  + Add New Match
                </button>
              </div>
            </div>
              
            {/* Match Results Table - DYNAMIC */}
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
                    {loading ? (
                      <tr>
                        <td colSpan={11} className="p-8 text-center text-[#6b7280]">
                          Loading matches...
                        </td>
                      </tr>
                    ) : matches.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="p-8 text-center text-[#6b7280]">
                          No matches found for current filters
                        </td>
                      </tr>
                    ) : (
                      matches.map((match: any) => (
                        <tr key={match.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                          <td className="p-4 align-middle">
                            <div className="text-[#374151] font-medium">{formatDate(match.match_date)}</div>
                            <div className="text-[#6b7280] text-xs">{formatTime(match.match_time)}</div>
                          </td>
                          <td className="p-4 align-middle text-[#374151]">{match.home_team_name}</td>
                          <td className="p-4 align-middle text-[#374151]">{match.away_team_name}</td>
                          <td className="p-4 align-middle text-[#374151] font-medium">
                            {match.home_score !== null && match.away_score !== null 
                              ? `${match.home_score}-${match.away_score}`
                              : '-'
                            }
                          </td>
                          <td className="p-4 align-middle text-center">
                            {getStatusIndicator(match)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            {getBooleanIndicator(match.hospitality_available)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            {getOptionalIndicator(match.ticket_link)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            {getOptionalIndicator(match.match_report_link)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            {getOptionalIndicator(match.gallery_idsanity)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            {getOptionalIndicator(match.match_sponsor_id)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center space-x-2">
                              <button 
                                onClick={() => openModal('edit', match.id)}
                                className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => openModal('delete', match.id)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
              
            {/* Pagination Controls - DYNAMIC */}
            <div className="flex items-center justify-between px-2 mt-4">
              <div className="text-sm text-[#6b7280]">
                Showing {pagination.pageSize * (pagination.page - 1) + 1}-{Math.min(pagination.pageSize * pagination.page, pagination.total)} of {pagination.total} matches
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb] disabled:opacity-50"
                >
                  Previous
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded text-sm ${
                          pagination.page === pageNum
                            ? 'bg-[#00105A] text-white'
                            : 'border border-[#e5e7eb] text-[#6b7280] hover:bg-[#f9fafb]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {pagination.totalPages > 5 && (
                    <>
                      <span className="px-2 py-1 text-sm text-[#6b7280]">...</span>
                      <button 
                        onClick={() => handlePageChange(pagination.totalPages)}
                        className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb]"
                      >
                        {pagination.totalPages}
                      </button>
                    </>
                  )}
                </div>
                <button 
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasMore}
                  className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          
          {/* User Instructions */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-3 m-0">📊 Match Management System - Live Database</h4>
            
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-3 mb-4">
              <p className="text-[#dc2626] text-sm font-medium m-0">
                🔴 IMPORTANT: All changes save instantly to the live database and cannot be reversed.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-[#00105A] text-sm mb-2 m-0">📋 HOW TO USE:</h5>
                <ul className="text-sm text-[#6b7280] space-y-1 pl-4">
                  <li>• <strong>Filter Matches:</strong> Use Season, Month, and Competition dropdowns to find specific matches</li>
                  <li>• <strong>Add New Match:</strong> Click "+ Add New Match" button to create upcoming fixtures</li>
                  <li>• <strong>Edit Match:</strong> Click "Edit" to update scores, status, links, and hospitality options</li>
                  <li>• <strong>Delete Match:</strong> Click "Delete" to permanently remove a match (use with caution)</li>
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-[#00105A] text-sm mb-2 m-0">✅ CURRENT DATA:</h5>
                <ul className="text-sm text-[#6b7280] space-y-1 pl-4">
                  <li>• <strong>{pagination.total} matches</strong> loaded from 2025-2026 season</li>
                  <li>• <strong>Showing soonest matches first</strong> with ascending date order</li>
                  <li>• <strong>Real-time data</strong> from 37 Highland League teams and 8 competitions</li>
                  <li>• <strong>Server-side pagination</strong> active (25 matches per page)</li>
                </ul>
              </div>
            </div>
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
