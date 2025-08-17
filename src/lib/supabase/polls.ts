import { supabase } from '@/lib/supabase/client';

// Simple interfaces
export interface SimplePoll {
  id: string;
  sanity_poll_id: string;
  question: string;
  status: string;
  total_votes: number;
  category?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  options: SimplePollOption[];
}

export interface SimplePollOption {
  id: string;
  option_text: string;
  vote_count: number;
  option_order: number;
}

/**
 * Get active poll with options from Supabase
 */
export async function getActivePoll(): Promise<SimplePoll | null> {
  try {
    const { data: pollData, error: pollError } = await supabase
      .from('polls')
      .select('*')
      .eq('status', 'active')
      .single();

    if (pollError && pollError.code !== 'PGRST116') {
      throw pollError;
    }

    if (!pollData) return null;

    const { data: optionsData, error: optionsError } = await supabase
      .from('poll_options')
      .select('*')
      .eq('poll_id', pollData.id)
      .order('option_order');

    if (optionsError) {
      throw optionsError;
    }

    return {
      ...pollData,
      options: optionsData || []
    } as SimplePoll;
  } catch (error) {
    console.error('Error fetching active poll:', error);
    return null;
  }
}

// ✅ UPDATED: Session-based voter identification
function getVoterHash(): string {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    // Fallback for server-side rendering
    return 'ssr-fallback-' + Math.random().toString(36).substring(2);
  }

  // Get or create session ID
  let sessionId = localStorage.getItem('baynounah_poll_session');
  
  if (!sessionId) {
    // Generate unique session ID
    sessionId = 'poll_' + Date.now() + '_' + Math.random().toString(36).substring(2);
    localStorage.setItem('baynounah_poll_session', sessionId);
  }
  
  return sessionId;
}

export async function checkIfUserVoted(pollId: string): Promise<{hasVoted: boolean, optionId: string | null}> {
  try {
    const voterHash = getVoterHash();
    const { data, error } = await supabase
      .from('poll_votes')
      .select('option_id')
      .eq('poll_id', pollId)
      .eq('voter_hash', voterHash)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return {
      hasVoted: !!data,
      optionId: data?.option_id || null
    };
  } catch (error) {
    console.error('Error checking vote status:', error);
    return { hasVoted: false, optionId: null };
  }
}

export async function submitVote(pollId: string, optionId: string): Promise<void> {
  try {
    const voterHash = getVoterHash();
    
    const { error } = await supabase
      .from('poll_votes')
      .insert({
        poll_id: pollId,
        option_id: optionId,
        voter_hash: voterHash
      });

    if (error) {
      if (error.code === '23505') {
        throw new Error('You have already voted on this poll');
      }
      throw error;
    }
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
}

export async function createPoll(
  sanityPollId: string,
  question: string,
  options: string[],
  category?: string,
  endDate?: string
): Promise<string> {
  try {
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert({
        sanity_poll_id: sanityPollId,
        question: question,
        status: 'active',
        category: category || null,
        end_date: endDate || null
      })
      .select()
      .single();

    if (pollError) throw pollError;

    const optionsData = options.map((optionText, index) => ({
      poll_id: poll.id,
      option_text: optionText,
      option_order: index,
      vote_count: 0
    }));

    const { error: optionsError } = await supabase
      .from('poll_options')
      .insert(optionsData);

    if (optionsError) throw optionsError;

    return poll.id;
  } catch (error) {
    console.error('Error creating poll:', error);
    throw error;
  }
}