import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Poll ID is required'
      }, { status: 400 });
    }

    // Fetch poll with options and vote counts
    const { data: poll, error } = await supabase
      .from('polls')
      .select(`
        id,
        question,
        category,
        status,
        end_date,
        created_at,
        total_votes,
        poll_options (
          id,
          option_text,
          vote_count,
          option_order
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Failed to fetch poll:', error);
      return NextResponse.json({
        success: false,
        error: 'Poll not found'
      }, { status: 404 });
    }

    if (!poll) {
      return NextResponse.json({
        success: false,
        error: 'Poll not found'
      }, { status: 404 });
    }

    // Sort options by order
    const sortedOptions = poll.poll_options?.sort((a, b) => a.option_order - b.option_order) || [];

    const pollResult = {
      id: poll.id,
      question: poll.question,
      category: poll.category,
      status: poll.status,
      total_votes: poll.total_votes || 0,
      end_date: poll.end_date,
      created_at: poll.created_at,
      options: sortedOptions.map(option => ({
        id: option.id,
        option_text: option.option_text,
        vote_count: option.vote_count || 0,
        display_order: option.option_order
      }))
    };

    return NextResponse.json({
      success: true,
      poll: pollResult
    });

  } catch (error) {
    console.error('Error fetching poll results:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch poll results'
    }, { status: 500 });
  }
}
