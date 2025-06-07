import { NextRequest, NextResponse } from 'next/server';
import { createPoll } from '@/lib/supabase/polls';
import { fetchSanityData } from '@/lib/sanity/sanityClient';

export async function POST(request: NextRequest) {
  try {
    const { sanityPollId } = await request.json();

    if (!sanityPollId) {
      return NextResponse.json(
        { error: 'Missing required field: sanityPollId' },
        { status: 400 }
      );
    }

    // Fetch complete poll data from Sanity
    const query = `*[_type == "fanPoll" && _id == $pollId][0] {
      _id,
      question,
      pollOptions,
      category,
      endDate,
      status
    }`;

    const sanityPoll = await fetchSanityData(query, { pollId: sanityPollId }, false);

    if (!sanityPoll) {
      return NextResponse.json(
        { error: 'Poll not found in Sanity' },
        { status: 404 }
      );
    }

    // Validate poll data
    if (!sanityPoll.question || !sanityPoll.pollOptions || sanityPoll.pollOptions.length < 2) {
      return NextResponse.json(
        { error: 'Invalid poll data: missing question or insufficient options' },
        { status: 400 }
      );
    }

    // Extract option texts from Sanity format
    const optionTexts = sanityPoll.pollOptions.map((option: any) => option.text);

    // Create poll in Supabase with complete data
    const pollId = await createPoll(
      sanityPollId, 
      sanityPoll.question, 
      optionTexts,
      sanityPoll.category,
      sanityPoll.endDate
    );

    return NextResponse.json({ 
      success: true, 
      pollId: pollId,
      message: 'Poll created successfully with live Sanity data',
      optionCount: optionTexts.length,
      category: sanityPoll.category
    });

  } catch (error) {
    console.error('Error creating poll:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve active poll
export async function GET() {
  try {
    const { getActivePoll } = await import('@/lib/supabase/polls');
    const activePoll = await getActivePoll();
    
    return NextResponse.json({ 
      success: true, 
      poll: activePoll 
    });
    
  } catch (error) {
    console.error('Error fetching active poll:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active poll' },
      { status: 500 }
    );
  }
}
