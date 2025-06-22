import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createSanityClient } from '@sanity/client';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const sanityClient = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false
});

// GET: Fetch polls with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const id = searchParams.get('id');

    // Single poll fetch for edit mode
    if (id) {
      const { data: poll, error } = await supabase
        .from('polls')
        .select(`
          id,
          question,
          category,
          status,
          end_date,
          created_at,
          poll_options (
            id,
            option_text,
            option_order
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      return NextResponse.json({
        success: true,
        polls: [poll],
        pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasMore: false }
      });
    }

    // Filtered poll list
    let query = supabase
      .from('polls')
      .select(`
        id,
        sanity_poll_id,
        question,
        status,
        category,
        end_date,
        created_at,
        poll_options (vote_count),
        total_votes:poll_votes(count)
      `, { count: 'exact' });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    query = query.order('created_at', { ascending: false });

    const { data: polls, error, count } = await query;

    if (error) throw error;

    // Process polls data
    const processedPolls = polls?.map(poll => ({
      id: poll.id,
      sanity_poll_id: poll.sanity_poll_id,
      question: poll.question,
      status: poll.status,
      category: poll.category,
      end_date: poll.end_date,
      created_at: poll.created_at,
      option_count: poll.poll_options?.length || 0,
      live_total_votes: poll.total_votes?.[0]?.count || 0
    })) || [];

    // Calculate status counts
    const statusCounts = {
      draft: processedPolls.filter(p => p.status === 'draft').length,
      active: processedPolls.filter(p => p.status === 'active').length,
      closed: processedPolls.filter(p => p.status === 'closed').length,
      archived: processedPolls.filter(p => p.status === 'archived').length
    };

    return NextResponse.json({
      success: true,
      polls: processedPolls,
      statusCounts
    });

  } catch (error) {
    console.error('Failed to fetch polls:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch polls'
    }, { status: 500 });
  }
}

// POST: Create new poll (AdminModal workflow)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Received poll data:', body);
    
    // Check if this is AdminModal data vs existing Sanity workflow
    if (body.sanityPollId) {
      return NextResponse.json({
        success: false,
        error: 'Sanity poll activation not implemented'
      }, { status: 501 });
    } else {
      return handleDirectPollCreation(body);
    }

  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create poll'
    }, { status: 500 });
  }
}

// Handle direct poll creation from AdminModal
async function handleDirectPollCreation(pollData: any) {
  const { question, category, options, end_date, status } = pollData;

  console.log('Processing poll creation:', { question, category, options, end_date, status });

  // Validate required fields
  if (!question || !category || !options || !end_date) {
    return NextResponse.json({
      success: false,
      error: 'Missing required fields: question, category, options, and end_date'
    }, { status: 400 });
  }

  // Validate options array
  if (!Array.isArray(options) || options.length < 2) {
    return NextResponse.json({
      success: false,
      error: 'At least 2 options are required'
    }, { status: 400 });
  }

  // Clean and validate options
  const cleanOptions = options
    .filter(option => option && option.trim())
    .map((text, index) => ({ text: text.trim(), order: index }));

  if (cleanOptions.length < 2) {
    return NextResponse.json({
      success: false,
      error: 'At least 2 non-empty options are required'
    }, { status: 400 });
  }

  try {
    // 1. Create Sanity document first
    const sanityDoc = await sanityClient.create({
      _type: 'fanPoll',
      question: question.trim(),
      category,
      status: status || 'active',
      startDate: new Date().toISOString(),
      endDate: end_date,
      pollOptions: cleanOptions.map(opt => ({ text: opt.text })),
      isCurrentPoll: false
    });

    console.log('Created Sanity document:', sanityDoc._id);

    // 2. Create Supabase poll record
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert({
        sanity_poll_id: sanityDoc._id,
        question: question.trim(),
        category,
        status: status || 'active',
        end_date,
        total_votes: 0
      })
      .select()
      .single();

    if (pollError) throw pollError;

    console.log('Created Supabase poll:', poll.id);

    // 3. Create poll options in Supabase
    const optionsToInsert = cleanOptions.map(opt => ({
      poll_id: poll.id,
      option_text: opt.text,
      vote_count: 0,
      option_order: opt.order
    }));

    const { error: optionsError } = await supabase
      .from('poll_options')
      .insert(optionsToInsert);

    if (optionsError) throw optionsError;

    console.log('Created poll options:', optionsToInsert.length);

    // 4. Update Sanity document with Supabase ID
    await sanityClient
      .patch(sanityDoc._id)
      .set({ supabasePollId: poll.id })
      .commit();

    console.log('Poll creation successful - Sanity ID:', sanityDoc._id, 'Supabase ID:', poll.id);

    return NextResponse.json({
      success: true,
      pollId: poll.id,
      sanityId: sanityDoc._id,
      message: 'Poll created successfully',
      optionCount: cleanOptions.length
    });

  } catch (error) {
    console.error('Poll creation failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create poll'
    }, { status: 500 });
  }
}

// PUT: Update poll status
export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: id and status'
      }, { status: 400 });
    }

    // Update in Supabase
    const { error } = await supabase
      .from('polls')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Poll status updated successfully'
    });

  } catch (error) {
    console.error('Failed to update poll:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update poll status'
    }, { status: 500 });
  }
}

// DELETE: Delete poll
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Poll ID is required'
      }, { status: 400 });
    }

    // Get poll info for cleanup
    const { data: poll } = await supabase
      .from('polls')
      .select('sanity_poll_id')
      .eq('id', id)
      .single();

    // Delete from Supabase (cascade will handle options and votes)
    const { error } = await supabase
      .from('polls')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Optionally delete from Sanity too
    if (poll?.sanity_poll_id) {
      try {
        await sanityClient.delete(poll.sanity_poll_id);
      } catch (sanityError) {
        console.warn('Failed to delete Sanity document:', sanityError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Poll deleted successfully'
    });

  } catch (error) {
    console.error('Failed to delete poll:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete poll'
    }, { status: 500 });
  }
}
