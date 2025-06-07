"use client";
import React, { useState, useEffect } from 'react';
import { submitVote, checkIfUserVoted, getActivePoll } from '@/lib/supabase/polls';

interface PollCardProps {
  activePoll?: any;
}

export default function PollCard({ activePoll: initialPoll }: PollCardProps) {
  const [activePoll, setActivePoll] = useState(initialPoll);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingOptionId, setSubmittingOptionId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showPastPolls, setShowPastPolls] = useState(false);

  useEffect(() => {
    if (activePoll) {
      checkVoteStatus();
    }
  }, [activePoll]);

  // Map category values to display names
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

  // Format vote count with proper grammar
  const formatVoteCount = (count: number) => {
    if (count === 0) return '0 votes';
    if (count === 1) return '1 vote';
    return `${count} votes`;
  };

  const checkVoteStatus = async () => {
    if (!activePoll) return;
    
    try {
      const voted = await checkIfUserVoted(activePoll.id);
      setHasVoted(voted.hasVoted);
      setVotedOptionId(voted.optionId);
      setShowResults(voted.hasVoted || activePoll.status === 'closed');
    } catch (error) {
      console.error('Error checking vote status:', error);
    }
  };

  const handleVote = async (optionId: string) => {
    if (isSubmitting || hasVoted) return;
    
    setIsSubmitting(true);
    setSubmittingOptionId(optionId);
    
    try {
      // Submit vote
      await submitVote(activePoll.id, optionId);
      
      // Update local state optimistically
      setHasVoted(true);
      setVotedOptionId(optionId);
      
      // Fetch updated poll data with new counts
      const updatedPoll = await getActivePoll();
      if (updatedPoll) {
        setActivePoll(updatedPoll);
      }
      
      // Show results with smooth transition
      setShowResults(true);
      
    } catch (error) {
      console.error('Vote submission failed:', error);
      alert('Failed to submit vote. Please try again.');
    }
    
    setIsSubmitting(false);
    setSubmittingOptionId(null);
  };

  const formatEndDate = (endDate: string) => {
    return new Date(endDate).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // No active poll state
  if (!activePoll) {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl border border-[#f3f4f6] h-[480px] flex flex-col transition-all duration-300 hover:-translate-y-1">
        {/* Header - EXACT HEIGHT MATCH */}
        <div className="p-6 h-[88px] flex items-center">
          <div className="flex items-center">
            <span className="text-[2rem] font-bold text-[#00105A] mr-2">#</span>
            <div>
              <h3 className="text-[1.125rem] font-semibold text-[#00105A] leading-none m-0">JoinTheConversation</h3>
              <p className="text-[0.875rem] font-medium text-[#6b7280] leading-none m-0 mt-1">Community Poll</p>
            </div>
          </div>
        </div>
        
        {/* No Poll Message */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#C5E7FF] to-[#00105A] rounded-full flex items-center justify-center text-[1.5rem] mb-4 shadow-lg mx-auto">
              🗳️
            </div>
            <h4 className="text-[#00105A] text-lg font-semibold mb-2">No active polls right now</h4>
            <p className="text-[#6b7280] text-sm">Check back soon for our next community question!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-[#6b7280] px-6 pb-6 pt-4 border-t border-[#f3f4f6]">
          <span>Next poll coming soon</span>
          <span className="text-[#6b7280] cursor-default">View Past Polls</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl border border-[#f3f4f6] h-[480px] flex flex-col transition-all duration-300 hover:-translate-y-1">
      {/* Header with Large Hashtag - EXACT HEIGHT MATCH */}
      <div className="p-6 h-[88px] flex items-center">
        <div className="flex items-center">
          <span className="text-[2rem] font-bold text-[#00105A] mr-2">#</span>
          <div>
            <h3 className="text-[1.125rem] font-semibold text-[#00105A] leading-none m-0">JoinTheConversation</h3>
            <p className="text-[0.875rem] font-medium text-[#6b7280] leading-none m-0 mt-1">{getCategoryDisplayName(activePoll.category)}</p>
          </div>
        </div>
      </div>
      
      {/* Poll Content */}
      <div className="flex-1 overflow-hidden px-6">
        {!showPastPolls ? (
          // Current Poll Display
          <div className="h-full flex flex-col">
            {/* Question Panel with Navy Background */}
            <div className="mb-4 bg-[#00105A] rounded-lg px-4 py-3">
              <p className="text-[1rem] font-medium text-white leading-snug m-0">
                {activePoll.question}
              </p>
            </div>

            {/* Options or Results */}
            <div className="flex-1">
              {!showResults ? (
                // Voting Interface with Navy Prominence - Reduced Spacing
                <div className="space-y-2">
                  {activePoll.options?.map((option: any, index: number) => {
                    const isSubmittingThis = isSubmitting && submittingOptionId === option.id;
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleVote(option.id)}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 text-left border-2 border-[#00105A] rounded-lg hover:bg-[#C5E7FF] transition-all duration-200 disabled:opacity-50 relative"
                      >
                        <span className="inline-flex items-center">
                          <span className="w-6 h-6 border border-[#00105A] rounded-sm mr-3 flex items-center justify-center text-xs font-semibold">
                            {String.fromCharCode(65 + index)} {/* A, B, C, D, E */}
                          </span>
                          {option.option_text}
                        </span>
                        {isSubmittingThis && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-[#00105A] border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Results Display with smooth transition
                <div className="space-y-3 animate-in fade-in duration-500">
                  <div className="text-center mb-4">
                    <p className="text-[1.125rem] font-semibold text-[#00105A] m-0">
                      {formatVoteCount(activePoll.total_votes || 0)}
                    </p>
                  </div>
                  
                  {activePoll.options?.map((option: any, index: number) => {
                    const percentage = activePoll.total_votes > 0 
                      ? Math.round((option.vote_count / activePoll.total_votes) * 100)
                      : 0;
                    const isUserVote = option.id === votedOptionId;
                    
                    return (
                      <div key={option.id} className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-[#00105A] flex items-center">
                            <span className="w-5 h-5 bg-[#C5E7FF] rounded-sm mr-2 flex items-center justify-center text-xs font-semibold">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option.option_text}
                            {isUserVote && <span className="ml-2 text-[#FFD700]">✓</span>}
                          </span>
                          <span className="text-sm text-[#6b7280]">{percentage}%</span>
                        </div>
                        <div className="w-full bg-[#f3f4f6] rounded-full h-2">
                          <div
                            className="bg-[#00105A] h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Past Polls Display (placeholder for now)
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-[#00105A] mb-4">Past Polls</h4>
              <p className="text-[#6b7280]">Past polls functionality coming soon...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer - FIXED DATE FIELD */}
      <div className="flex justify-between items-center text-xs text-[#6b7280] px-6 pb-6 pt-4 border-t border-[#f3f4f6]">
        <span>
          {activePoll.status === 'active' 
            ? `Voting closes: ${formatEndDate(activePoll.end_date)}`
            : 'Poll closed'
          }
        </span>
        <button 
          onClick={() => setShowPastPolls(!showPastPolls)}
          className="text-[#6b7280] cursor-default"
        >
          {showPastPolls ? 'Current Poll' : 'View Past Polls'}
        </button>
      </div>
    </div>
  );
}
