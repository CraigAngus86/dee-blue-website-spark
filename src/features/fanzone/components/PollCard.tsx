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
      await submitVote(activePoll.id, optionId);
      setHasVoted(true);
      setVotedOptionId(optionId);
      
      const updatedPoll = await getActivePoll();
      if (updatedPoll) {
        setActivePoll(updatedPoll);
      }
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
      <div className="bg-white rounded-xl border border-separator shadow-sm hover:shadow-md h-[480px] flex flex-col transition-all duration-300 hover:translate-y-[-2px]">
        {/* Consistent header with Fan of Month */}
        <div className="h-[88px] flex items-center px-6 border-b border-separator">
          <div className="flex items-center">
            <div className="w-1 h-10 bg-brand-gold rounded-sm mr-4" />
            <div>
              <h3 className="text-h4 font-heading text-black tracking-tightest leading-none m-0">
                Community Poll
              </h3>
              <p className="text-small text-dark-gray leading-none m-0 mt-1">
                Join the Conversation
              </p>
            </div>
          </div>
        </div>
        
        {/* No Poll Message */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-gold text-black rounded-full flex items-center justify-center text-xl mb-4 shadow-sm mx-auto">
              🗳️
            </div>
            <h4 className="text-black text-h5 font-body mb-2">No active polls right now</h4>
            <p className="text-dark-gray text-small">Check back soon for our next community question!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-small text-dark-gray px-6 pb-6 pt-4 border-t border-separator">
          <span>Next poll coming soon</span>
          <span className="text-dark-gray cursor-default">View Past Polls</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-separator shadow-sm hover:shadow-md h-[480px] flex flex-col transition-all duration-300 hover:translate-y-[-2px]">
      {/* FIXED: Consistent header matching Fan of Month */}
      <div className="h-[88px] flex items-center px-6 border-b border-separator">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-brand-gold rounded-sm mr-4" />
          <div>
            <h3 className="text-h4 font-heading text-black tracking-tightest leading-none m-0">
              Community Poll
            </h3>
            <p className="text-small text-dark-gray leading-none m-0 mt-1">
              {getCategoryDisplayName(activePoll.category)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Poll Content */}
      <div className="flex-1 overflow-hidden px-6 pt-4">
        {!showPastPolls ? (
          <div className="h-full flex flex-col">
            {/* Question Panel */}
            <div className="mb-4 bg-black rounded-lg px-4 py-3">
              <p className="text-base font-medium text-white leading-snug m-0">
                {activePoll.question}
              </p>
            </div>

            {/* Options or Results */}
            <div className="flex-1">
              {!showResults ? (
                <div className="space-y-2">
                  {activePoll.options?.map((option: any, index: number) => {
                    const isSubmittingThis = isSubmitting && submittingOptionId === option.id;
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleVote(option.id)}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 text-left border-2 border-black rounded-lg hover:bg-brand-gold hover:border-brand-gold transition-all duration-200 disabled:opacity-50 relative font-body"
                      >
                        <span className="inline-flex items-center">
                          <span className="w-6 h-6 border border-black rounded-sm mr-3 flex items-center justify-center text-small font-semibold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option.option_text}
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
                <div className="space-y-3 animate-fade-in">
                  <div className="text-center mb-4">
                    <p className="text-h4 font-body text-black m-0">
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
                          <span className="text-small font-medium text-black flex items-center">
                            <span className="w-5 h-5 bg-brand-gold rounded-sm mr-2 flex items-center justify-center text-xs font-semibold text-black">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option.option_text}
                            {isUserVote && <span className="ml-2 text-brand-gold">✓</span>}
                          </span>
                          <span className="text-small text-dark-gray">{percentage}%</span>
                        </div>
                        <div className="w-full bg-light-gray rounded-full h-2">
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
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-h5 font-body text-black mb-4">Past Polls</h4>
              <p className="text-dark-gray text-small">Past polls functionality coming soon...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="flex justify-between items-center text-small text-dark-gray px-6 pb-6 pt-4 border-t border-separator">
        <span>
          {activePoll.status === 'active' 
            ? `Voting closes: ${formatEndDate(activePoll.end_date)}`
            : 'Poll closed'
          }
        </span>
        <button 
          onClick={() => setShowPastPolls(!showPastPolls)}
          className="text-dark-gray cursor-pointer hover:text-black transition-colors"
        >
          {showPastPolls ? 'Current Poll' : 'View Past Polls'}
        </button>
      </div>
    </div>
  );
}