"use client";

import React, { useState, useEffect } from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { AdminModal } from '../../shared/AdminModal';
import { PollResultsModal } from '../modals/PollResultsModal';

type AdminMode = 'add' | 'edit' | 'delete';

interface ModalState {
  isOpen: boolean;
  mode: AdminMode;
  recordId: string | null;
}

interface ResultsModalState {
  isOpen: boolean;
  pollId: string | null;
}

interface Poll {
  id: string;
  sanity_poll_id: string;
  question: string;
  status: 'draft' | 'active' | 'closed' | 'archived';
  category: string;
  end_date: string;
  created_at: string;
  option_count: number;
  live_total_votes: number;
  seconds_remaining?: number;
}

interface StatusCounts {
  draft: number;
  active: number;
  closed: number;
  archived: number;
}

export function PollManagementTab() {
  // Modal state management (following NewsManagementTab pattern)
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: 'add',
    recordId: null
  });

  // Results modal state management
  const [resultsModalState, setResultsModalState] = useState<ResultsModalState>({
    isOpen: false,
    pollId: null
  });

  // State management
  const [polls, setPolls] = useState<Poll[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    draft: 0, active: 0, closed: 0, archived: 0
  });
  const [activePoll, setActivePoll] = useState<Poll | null>(null);
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  // Modal functions (following NewsManagementTab pattern)
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
    console.log('Poll operation successful - refreshing table...');
    fetchPolls(); // Refresh current data
    closeModal();
  };

  // Results modal functions
  const openResultsModal = (pollId: string) => {
    setResultsModalState({
      isOpen: true,
      pollId
    });
  };

  const closeResultsModal = () => {
    setResultsModalState({
      isOpen: false,
      pollId: null
    });
  };

  // Fetch polls data
  const fetchPolls = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        category,
        status
      });
      
      const response = await fetch(`/api/admin/polls?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setPolls(data.polls);
        setStatusCounts(data.statusCounts);
        
        // Find active poll
        const currentActive = data.polls.find((poll: Poll) => poll.status === 'active');
        setActivePoll(currentActive || null);
      }
    } catch (error) {
      console.error('Failed to fetch polls:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update poll status
  const updatePollStatus = async (pollId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/polls', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pollId, status: newStatus })
      });
      
      const data = await response.json();
      if (data.success) {
        fetchPolls(); // Refresh the list
      } else {
        alert(`Failed to update poll: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to update poll status:', error);
      alert('Failed to update poll status');
    }
  };

  // Delete poll
  const deletePoll = async (pollId: string) => {
    if (!confirm('Are you sure you want to delete this poll? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/polls?id=${pollId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      if (data.success) {
        fetchPolls(); // Refresh the list
        if (data.warnings) {
          alert(`Poll deleted. Warning: ${data.warnings.join(', ')}`);
        }
      } else {
        alert(`Failed to delete poll: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to delete poll:', error);
      alert('Failed to delete poll');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Get category display name
  const getCategoryDisplayName = (cat: string) => {
    const categoryMap: { [key: string]: string } = {
      'competitions': 'Competition Excitement',
      'player_month': 'Player of Month',
      'predictions': 'Match Predictions',
      'preferences': 'Club Preferences',
      'community': 'Community Questions'
    };
    return categoryMap[cat] || cat;
  };

  // Get status icon
  const getStatusIcon = (pollStatus: string) => {
    const icons = {
      draft: '📝',
      active: '⭐',
      closed: '✓',
      archived: '📁'
    };
    return icons[pollStatus as keyof typeof icons] || '❓';
  };

  // Get time remaining for active poll
  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffMs = end.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Expired';
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days`;
    return `${hours} hours`;
  };

  // Load data on component mount and filter changes
  useEffect(() => {
    fetchPolls();
  }, [category, status]);

  // Auto-refresh active poll every minute
  useEffect(() => {
    if (activePoll) {
      const interval = setInterval(fetchPolls, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }
  }, [activePoll]);

  return (
    <div className="space-y-6">
      <AdminCard title="📊 Poll Creation & Management (📅 Low Priority) - Monthly engagement campaigns">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Active Poll Status */}
            {activePoll && (
              <div className="mb-6">
                <h4 className="font-medium text-[#00105A] mb-4 m-0">⭐ Current Active Poll:</h4>
                <div className="p-4 bg-[#FFD700] bg-opacity-20 border border-[#FFD700] rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-[#00105A]">{activePoll.question}</div>
                    <span className="px-2 py-1 rounded text-xs bg-[#FFD700] text-[#00105A] font-medium">⭐ ACTIVE</span>
                  </div>
                  <div className="text-sm text-[#6b7280] mb-3">
                    Category: {getCategoryDisplayName(activePoll.category)}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">Total Votes:</span> {activePoll.live_total_votes}
                    </div>
                    <div>
                      <span className="font-medium">Ends:</span> {formatDate(activePoll.end_date)}
                    </div>
                    <div>
                      <span className="font-medium">Options:</span> {activePoll.option_count}
                    </div>
                    <div>
                      <span className="font-medium">Time Left:</span> {getTimeRemaining(activePoll.end_date)}
                    </div>
                  </div>
                  <div className="mt-3">
                    <button 
                      onClick={() => openResultsModal(activePoll.id)}
                      className="px-4 py-2 bg-[#00105A] text-white rounded text-sm font-medium hover:bg-opacity-90"
                    >
                      View Results
                    </button>
                    <button 
                      onClick={() => updatePollStatus(activePoll.id, 'closed')}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
                    >
                      Close Early
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Poll Status Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📊 Poll Status Overview:</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">{statusCounts.draft}</div>
                  <div className="text-sm text-[#6b7280]">Draft</div>
                  <div className="w-full bg-[#f3f4f6] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">{statusCounts.active}</div>
                  <div className="text-sm text-[#6b7280]">Active</div>
                  <div className="w-full bg-[#FFD700] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">{statusCounts.closed}</div>
                  <div className="text-sm text-[#6b7280]">Closed</div>
                  <div className="w-full bg-[#C5E7FF] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">{statusCounts.archived}</div>
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
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    <option value="all">All Categories</option>
                    <option value="player_month">Player of Month</option>
                    <option value="predictions">Match Predictions</option>
                    <option value="competitions">Competition Preferences</option>
                    <option value="community">Community Topics</option>
                    <option value="preferences">Club Preferences</option>
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
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                    <option value="archived">Archived</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-end">
                <button 
                  onClick={() => openModal('add')}
                  className="px-4 py-3 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors w-full"
                >
                  + Create New Poll
                </button>
              </div>
            </div>

            {/* Poll Management Table */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white">
              <div className="overflow-auto">
                {loading ? (
                  <div className="text-center py-8 text-[#6b7280]">Loading polls...</div>
                ) : polls.length === 0 ? (
                  <div className="text-center py-8 text-[#6b7280]">No polls found for current filters</div>
                ) : (
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
                      {polls.map((poll) => (
                        <tr key={poll.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                          <td className="p-4 align-middle text-[#374151] font-medium">{poll.question}</td>
                          <td className="p-4 align-middle text-center">
                            <span className="px-2 py-1 rounded text-xs bg-[#C5E7FF] text-[#00105A] font-medium">
                              {getCategoryDisplayName(poll.category)}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <span className={`text-lg ${
                              poll.status === 'active' ? 'text-[#FFD700]' :
                              poll.status === 'closed' ? 'text-green-600' :
                              poll.status === 'draft' ? 'text-blue-500' :
                              'text-[#6b7280]'
                            }`}>
                              {getStatusIcon(poll.status)}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center text-[#374151] font-medium">
                            {poll.status === 'draft' ? '-' : poll.live_total_votes}
                          </td>
                          <td className="p-4 align-middle text-[#6b7280]">
                            {poll.status === 'draft' ? 'Draft' : formatDate(poll.end_date)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center space-x-2">
                              {poll.status === 'draft' && (
                                <>
                                  <button 
                                    onClick={() => openModal('edit', poll.id)}
                                    className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => updatePollStatus(poll.id, 'active')}
                                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                                  >
                                    Publish
                                  </button>
                                  <button 
                                    onClick={() => openModal('delete', poll.id)}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                              {poll.status === 'active' && (
                                <>
                                  <button 
                                    onClick={() => openResultsModal(poll.id)}
                                    className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                                  >
                                    Results
                                  </button>
                                  <button 
                                    onClick={() => updatePollStatus(poll.id, 'closed')}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                  >
                                    Close
                                  </button>
                                </>
                              )}
                              {(poll.status === 'closed' || poll.status === 'archived') && (
                                <>
                                  <button 
                                    onClick={() => openResultsModal(poll.id)}
                                    className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                                  >
                                    Results
                                  </button>
                                  <button 
                                    onClick={() => updatePollStatus(poll.id, 'archived')}
                                    className="text-[#6b7280] hover:text-[#374151] text-sm font-medium"
                                  >
                                    Archive
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Poll Lifecycle:</strong> draft → active → closed → archived status workflow</li>
              <li>• <strong>Active Constraint:</strong> Only one poll active at a time (⭐ current poll indicator)</li>
              <li>• <strong>Supabase Integration:</strong> Real-time vote monitoring via live vote counts</li>
              <li>• <strong>Categories:</strong> competitions, player of month, predictions, preferences, community</li>
              <li>• <strong>Poll Creation:</strong> Question (200 char), 2-6 answer options (50 char each)</li>
              <li>• <strong>Scheduling:</strong> Start/end date management with early closure capabilities</li>
              <li>• <strong>Results Tracking:</strong> Real-time vote count and percentage calculations</li>
            </ul>
          </div>
        </div>
      </AdminCard>

      {/* AdminModal Integration (following NewsManagementTab pattern) */}
      <AdminModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        entityType="poll"
        mode={modalState.mode}
        recordId={modalState.recordId}
        onSuccess={handleModalSuccess}
      />

      {/* Results Modal Integration */}
      <PollResultsModal
        isOpen={resultsModalState.isOpen}
        onClose={closeResultsModal}
        pollId={resultsModalState.pollId}
      />
    </div>
  );
}
