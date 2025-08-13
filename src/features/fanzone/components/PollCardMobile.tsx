"use client";
import React, { useState, useEffect } from 'react';
import { submitVote, checkIfUserVoted, getActivePoll } from '@/lib/supabase/polls';
import { Vote } from 'lucide-react';

interface PollCardMobileProps {
  activePoll?: any;
}

export default function PollCardMobile({ activePoll: initialPoll }: PollCardMobileProps) {
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

  // No active poll state - Baynounah branded with consistent header
  if (!activePoll) {
    return (
      <div className="bg-white rounded-xl border border-separator shadow-sm hover:shadow-md flex flex-col transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Header - Consistent 72px height for mobile */}
        <div className="h-[72px] flex items-center justify-between px-4 border-b border-separator bg-gradient-to-r from-white to-[#F8F6F3]">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-brand-gold rounded-sm mr-3" />
            <div>
              <h3 className="text-h5 font-heading text-brand-black tracking-tightest leading-none m-0">
                Community Poll
              </h3>
              <p className="text-xs text-text-muted leading-none m-0 mt-1">
                Join the Conversation
              </p>
            </div>
          </div>
        </div>
        
        {/* No Poll Message */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-gold to-brand-gold/70 rounded-full flex items-center justify-center mb-3 shadow-lg mx-auto animate-pulse">
              <Vote className="w-7 h-7 text-brand-black" />
            </div>
            <h4 className="text-brand-black text-base font-semibold mb-2">No active polls right now</h4>
            <p className="text-text-muted text-xs">Check back soon for our next community question!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-[10px] text-text-muted px-4 pb-3 pt-3 border-t border-separator">
          <span>Next poll coming soon</span>
          <span className="text-text-muted">View Past Polls</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-separator shadow-sm hover:shadow-md flex flex-col transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Header - Consistent 72px height for mobile */}
      <div className="h-[72px] flex items-center justify-between px-4 border-b border-separator bg-gradient-to-r from-white to-[#F8F6F3]">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-brand-gold rounded-sm mr-3" />
          <div>
            <h3 className="text-h5 font-heading text-brand-black tracking-tightest leading-none m-0">
              Community Poll
            </h3>
            <p className="text-xs text-text-muted leading-none m-0 mt-1">
              {getCategoryDisplayName(activePoll.category)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Poll Content */}
      <div className="flex-1 px-4 pb-4">
        {!showPastPolls ? (
          // Current Poll Display
          <div className="h-full flex flex-col">
            {/* Question Panel with Black Background */}
            <div className="mb-4 bg-brand-black rounded-lg px-3 py-3 mt-4">
              <p className="text-sm font-medium text-white leading-snug m-0">
                {activePoll.question}
              </p>
            </div>

            {/* Options or Results */}
            <div className="flex-1">
              {!showResults ? (
                // Voting Interface - Mobile optimized
                <div className="space-y-3">
                  {activePoll.options?.map((option: any, index: number) => {
                    const isSubmittingThis = isSubmitting && submittingOptionId === option.id;
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleVote(option.id)}
                        disabled={isSubmitting}
                        className="w-full px-3 py-3 text-left border-2 border-black rounded-lg hover:bg-brand-gold hover:border-brand-gold transition-all duration-200 disabled:opacity-50 relative min-h-[44px] flex items-center text-sm"
                      >
                        <span className="inline-flex items-center w-full">
                          <span className="w-6 h-6 border border-black rounded-sm mr-3 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1">{option.option_text}</span>
                        </span>
                        {isSubmittingThis && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Results Display - Mobile optimized
                <div className="space-y-3 animate-fade-in">
                  <div className="text-center mb-4">
                    <p className="text-base font-body text-brand-black m-0">
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
                          <span className="text-xs font-medium text-brand-black flex items-center flex-1">
                            <span className="w-5 h-5 bg-brand-gold rounded-sm mr-2 flex items-center justify-center text-[10px] font-semibold text-brand-black flex-shrink-0">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1 line-clamp-2">{option.option_text}</span>
                            {isUserVote && <span className="ml-1 text-brand-gold">✓</span>}
                          </span>
                          <span className="text-xs text-text-muted ml-2 flex-shrink-0">{percentage}%</span>
                        </div>
                        <div className="w-full bg-surface-2 rounded-full h-2">
                          <div
                            className="bg-brand-gold h-2 rounded-full transition-all duration-1000 ease-out"
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
          <div className="h-full flex items-center justify-center py-8">
            <div className="text-center">
              <h4 className="text-base font-semibold text-brand-black mb-3">Past Polls</h4>
              <p className="text-text-muted text-xs">Past polls functionality coming soon...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="flex justify-between items-center text-[10px] text-text-muted px-4 pb-3 pt-3 border-t border-separator">
        <span>
          {activePoll.status === 'active' 
            ? `Closes: ${formatEndDate(activePoll.end_date)}`
            : 'Poll closed'
          }
        </span>
        <button 
          onClick={() => setShowPastPolls(!showPastPolls)}
          className="text-text-muted hover:text-brand-black transition-colors"
        >
          {showPastPolls ? 'Current Poll' : 'Past Polls'}
        </button>
      </div>
    </div>
  );
}