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

  // No active poll state - Baynounah branded
  if (!activePoll) {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl border border-separator flex flex-col transition-all duration-300 hover:-translate-y-1">
        {/* Header - Baynounah styling */}
        <div className="p-6 flex items-center min-h-[80px] border-b border-separator">
          <div className="flex items-center">
            <div className="w-1 h-10 bg-brand-gold rounded-sm mr-4" />
            <div>
              <h3 className="text-h4 font-heading text-brand-black leading-none m-0" style={{letterSpacing: '0.02em'}}>Community Poll</h3>
              <p className="text-small text-text-muted leading-none m-0 mt-1">Join the Conversation</p>
            </div>
          </div>
        </div>
        
        {/* No Poll Message */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-brand-gold/70 rounded-full flex items-center justify-center mb-4 shadow-lg mx-auto">
              <Vote className="w-8 h-8 text-brand-black" />
            </div>
            <h4 className="text-brand-black text-lg font-semibold mb-2">No active polls right now</h4>
            <p className="text-text-muted text-sm">Check back soon for our next community question!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-text-muted px-6 pb-6 pt-4 border-t border-separator">
          <span>Next poll coming soon</span>
          <span className="text-text-muted cursor-default">View Past Polls</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl border border-separator flex flex-col transition-all duration-300 hover:-translate-y-1">
      {/* Header - Baynounah branded */}
      <div className="p-6 min-h-[80px] flex items-center border-b border-separator">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-brand-gold rounded-sm mr-4" />
          <div>
            <h3 className="text-h4 font-heading text-brand-black leading-none m-0" style={{letterSpacing: '0.02em'}}>Community Poll</h3>
            <p className="text-small text-text-muted leading-none m-0 mt-1">{getCategoryDisplayName(activePoll.category)}</p>
          </div>
        </div>
      </div>
      
      {/* Poll Content */}
      <div className="flex-1 px-6 pb-6">
        {!showPastPolls ? (
          // Current Poll Display
          <div className="h-full flex flex-col">
            {/* Question Panel with Black Background */}
            <div className="mb-6 bg-brand-black rounded-lg px-4 py-4 mt-6">
              <p className="text-base font-medium text-white leading-snug m-0">
                {activePoll.question}
              </p>
            </div>

            {/* Options or Results */}
            <div className="flex-1">
              {!showResults ? (
                // Voting Interface - Baynounah branded
                <div className="space-y-4">
                  {activePoll.options?.map((option: any, index: number) => {
                    const isSubmittingThis = isSubmitting && submittingOptionId === option.id;
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleVote(option.id)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-4 text-left border-2 border-brand-black rounded-lg hover:bg-brand-gold hover:border-brand-gold transition-all duration-200 disabled:opacity-50 relative min-h-[48px] flex items-center"
                      >
                        <span className="inline-flex items-center w-full">
                          <span className="w-8 h-8 border border-brand-black rounded-sm mr-4 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1 text-base">{option.option_text}</span>
                        </span>
                        {isSubmittingThis && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Results Display - Baynounah styled
                <div className="space-y-4 animate-fade-in">
                  <div className="text-center mb-6">
                    <p className="text-h5 font-body text-brand-black m-0">
                      {formatVoteCount(activePoll.total_votes || 0)}
                    </p>
                  </div>
                  
                  {activePoll.options?.map((option: any, index: number) => {
                    const percentage = activePoll.total_votes > 0 
                      ? Math.round((option.vote_count / activePoll.total_votes) * 100)
                      : 0;
                    const isUserVote = option.id === votedOptionId;
                    
                    return (
                      <div key={option.id} className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-base font-medium text-brand-black flex items-center">
                            <span className="w-6 h-6 bg-brand-gold rounded-sm mr-3 flex items-center justify-center text-sm font-semibold text-brand-black">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1">{option.option_text}</span>
                            {isUserVote && <span className="ml-2 text-brand-gold">✓</span>}
                          </span>
                          <span className="text-base text-text-muted ml-2">{percentage}%</span>
                        </div>
                        <div className="w-full bg-surface-2 rounded-full h-3">
                          <div
                            className="bg-brand-gold h-3 rounded-full transition-all duration-1000 ease-out"
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
          <div className="h-full flex items-center justify-center py-12">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-brand-black mb-4">Past Polls</h4>
              <p className="text-text-muted">Past polls functionality coming soon...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-text-muted px-6 pb-6 pt-4 border-t border-separator">
        <span>
          {activePoll.status === 'active' 
            ? `Voting closes: ${formatEndDate(activePoll.end_date)}`
            : 'Poll closed'
          }
        </span>
        <button 
          onClick={() => setShowPastPolls(!showPastPolls)}
          className="text-text-muted cursor-pointer hover:text-brand-black transition-colors"
        >
          {showPastPolls ? 'Current Poll' : 'View Past Polls'}
        </button>
      </div>
    </div>
  );
}