"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PollResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pollId: string | null;
}

interface PollResult {
  id: string;
  question: string;
  category: string;
  status: string;
  total_votes: number;
  end_date: string;
  created_at: string;
  options: Array<{
    id: string;
    option_text: string;
    vote_count: number;
    display_order: number;
  }>;
}

export function PollResultsModal({ isOpen, onClose, pollId }: PollResultsModalProps) {
  const [pollData, setPollData] = useState<PollResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch poll results
  const fetchPollResults = async () => {
    if (!pollId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/polls/results?id=${pollId}`);
      const data = await response.json();
      
      if (data.success) {
        setPollData(data.poll);
      } else {
        console.error('Failed to fetch poll results:', data.error);
      }
    } catch (error) {
      console.error('Error fetching poll results:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data when modal opens
  useEffect(() => {
    if (isOpen && pollId) {
      fetchPollResults();
    } else {
      setPollData(null);
    }
  }, [isOpen, pollId]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Format vote count (same as PollCard)
  const formatVoteCount = (count: number) => {
    if (count === 0) return '0 votes';
    if (count === 1) return '1 vote';
    return `${count} votes`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get category display name (same as PollCard)
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'competitions': 'Competition Excitement',
      'player_month': 'Player of the Month',
      'predictions': 'Match Predictions',
      'preferences': 'Club Preferences',
      'community': 'Community Questions'
    };
    return categoryMap[category] || 'Community Poll';
  };

  // Get status styling
  const getStatusStyling = (status: string) => {
    const statusMap = {
      'active': { bg: 'bg-[#FFD700]', text: 'text-[#00105A]', label: '⭐ ACTIVE' },
      'closed': { bg: 'bg-green-100', text: 'text-green-800', label: '✓ CLOSED' },
      'archived': { bg: 'bg-gray-100', text: 'text-gray-800', label: '📁 ARCHIVED' },
      'draft': { bg: 'bg-blue-100', text: 'text-blue-800', label: '📝 DRAFT' }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.closed;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb]">
              <h2 className="text-xl font-semibold text-[#00105A]">
                �� Poll Results
              </h2>
              <button onClick={onClose} className="text-[#6b7280] hover:text-[#00105A] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#00105A] border-t-transparent mx-auto mb-4"></div>
                  <p className="text-[#6b7280]">Loading poll results...</p>
                </div>
              ) : !pollData ? (
                <div className="p-8 text-center text-[#6b7280]">
                  Poll data not found
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  
                  {/* Poll Summary */}
                  <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#00105A] mb-2 m-0">
                          {pollData.question}
                        </h3>
                        <p className="text-sm text-[#6b7280] m-0">
                          {getCategoryDisplayName(pollData.category)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusStyling(pollData.status).bg} ${getStatusStyling(pollData.status).text}`}>
                        {getStatusStyling(pollData.status).label}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-[#374151]">Total Votes:</span>
                        <span className="ml-2 text-[#00105A] font-semibold">{formatVoteCount(pollData.total_votes)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#374151]">Created:</span>
                        <span className="ml-2 text-[#6b7280]">{formatDate(pollData.created_at)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#374151]">Options:</span>
                        <span className="ml-2 text-[#6b7280]">{pollData.options.length}</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#374151]">End Date:</span>
                        <span className="ml-2 text-[#6b7280]">{formatDate(pollData.end_date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Results Breakdown */}
                  <div>
                    <h4 className="text-lg font-semibold text-[#00105A] mb-4 m-0">Vote Breakdown</h4>
                    
                    {pollData.total_votes === 0 ? (
                      <div className="text-center py-8 text-[#6b7280]">
                        No votes have been cast yet
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pollData.options
                          .sort((a, b) => a.display_order - b.display_order)
                          .map((option, index) => {
                            const percentage = pollData.total_votes > 0 
                              ? Math.round((option.vote_count / pollData.total_votes) * 100)
                              : 0;
                            
                            return (
                              <div key={option.id} className="bg-white border border-[#e5e7eb] rounded-lg p-4">
                                <div className="flex justify-between items-center mb-3">
                                  <div className="flex items-center">
                                    <span className="w-8 h-8 bg-[#C5E7FF] rounded text-[#00105A] font-semibold flex items-center justify-center text-sm mr-3">
                                      {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="font-medium text-[#374151]">{option.option_text}</span>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-[#00105A]">{percentage}%</div>
                                    <div className="text-sm text-[#6b7280]">{formatVoteCount(option.vote_count)}</div>
                                  </div>
                                </div>
                                
                                {/* Progress Bar (same style as PollCard) */}
                                <div className="w-full bg-[#f3f4f6] rounded-full h-3">
                                  <div
                                    className="bg-[#00105A] h-3 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  {/* Analytics Summary */}
                  {pollData.total_votes > 0 && (
                    <div className="bg-[#f0f9ff] border border-[#C5E7FF] rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-[#00105A] mb-3 m-0">📈 Quick Analytics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-[#374151]">Leading Option:</span>
                          <span className="ml-2 text-[#00105A] font-semibold">
                            {pollData.options.reduce((max, option) => 
                              option.vote_count > max.vote_count ? option : max
                            ).option_text}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-[#374151]">Participation:</span>
                          <span className="ml-2 text-[#00105A] font-semibold">
                            {pollData.total_votes} {pollData.total_votes === 1 ? 'voter' : 'voters'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
