import { supabase } from '@/integrations/supabase/client';

// Simple interfaces without complex typing
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
    // Use any to bypass TypeScript issues
    const pollResponse: any = await supabase
      .from('polls')
      .select('*')
      .eq('status', 'active')
      .single();

    if (pollResponse.error && pollResponse.error.code !== 'PGRST116') {
      throw pollResponse.error;
    }

    if (!pollResponse.data) return null;

    // Get poll options
    const optionsResponse: any = await supabase
      .from('poll_options')
      .select('*')
      .eq('poll_id', pollResponse.data.id)
      .order('option_order');

    if (optionsResponse.error) {
      throw optionsResponse.error;
    }

    return {
      ...pollResponse.data,
      options: optionsResponse.data || []
    } as SimplePoll;
  } catch (error) {
    console.error('Error fetching active poll:', error);
    return null;
  }
}

/**
 * Create browser fingerprint for duplicate prevention
 */
function getBrowserFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('Banks o Dee Poll', 2, 2);
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');
  
  return btoa(fingerprint).substring(0, 32);
}

/**
 * Generate voter hash for duplicate prevention
 */
function getVoterHash(): string {
  return getBrowserFingerprint();
}

/**
 * Check if user has already voted on a poll
 */
export async function checkIfUserVoted(pollId: string): Promise<{hasVoted: boolean, optionId: string | null}> {
  try {
    const voterHash = getVoterHash();
    
    const response: any = await supabase
      .from('poll_votes')
      .select('option_id')
      .eq('poll_id', pollId)
      .eq('voter_hash', voterHash)
      .single();

    if (response.error && response.error.code !== 'PGRST116') {
      throw response.error;
    }

    return {
      hasVoted: !!response.data,
      optionId: response.data?.option_id || null
    };
  } catch (error) {
    console.error('Error checking vote status:', error);
    return { hasVoted: false, optionId: null };
  }
}

/**
 * Submit a vote for a poll option
 */
export async function submitVote(pollId: string, optionId: string): Promise<void> {
  try {
    const voterHash = getVoterHash();
    
    const response: any = await supabase
      .from('poll_votes')
      .insert({
        poll_id: pollId,
        option_id: optionId,
        voter_hash: voterHash
      });

    if (response.error) {
      if (response.error.code === '23505') { // Unique constraint violation
        throw new Error('You have already voted on this poll');
      }
      throw response.error;
    }
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
}

/**
 * Create a new poll in Supabase with complete data from Sanity
 */
export async function createPoll(
  sanityPollId: string, 
  question: string, 
  options: string[],
  category?: string,
  endDate?: string
): Promise<string> {
  try {
    // Create poll with complete data
    const pollResponse: any = await supabase
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

    if (pollResponse.error) throw pollResponse.error;

    // Create poll options
    const optionsData = options.map((optionText, index) => ({
      poll_id: pollResponse.data.id,
      option_text: optionText,
      option_order: index,
      vote_count: 0
    }));

    const optionsResponse: any = await supabase
      .from('poll_options')
      .insert(optionsData);

    if (optionsResponse.error) throw optionsResponse.error;

    return pollResponse.data.id;
  } catch (error) {
    console.error('Error creating poll:', error);
    throw error;
  }
}
