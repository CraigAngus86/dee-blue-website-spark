import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

// GET: Single fan of month by ID OR paginated submissions with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // SINGLE FAN OF MONTH FETCHING (for detailed view if needed)
    if (id) {
      const fanOfMonth = await sanityClient.getDocument(id);

      if (!fanOfMonth) {
        return NextResponse.json({ error: 'Fan of the Month submission not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        fanOfMonth: [fanOfMonth],
        pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasMore: false }
      });
    }

    // PAGINATED FAN OF MONTH FETCHING (for review cards)
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10'); // Fewer per page as they're larger cards
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    // Build GROQ query with filters
    let filters: string[] = [];
    
    if (category && category !== 'all') {
      filters.push(`category == "${category}"`);
    }
    
    if (status && status !== 'all') {
      if (status === 'pending') {
        filters.push(`status == "pending"`);
      } else if (status === 'featured') {
        filters.push(`status == "featured"`);
      } else if (status === 'archive') {
        filters.push(`status == "approved" || status == "declined"`);
      }
    }

    const filterString = filters.length > 0 ? ` && ${filters.join(' && ')}` : '';
    const baseQuery = `*[_type == "fanOfMonth"${filterString}]`;
    
    // Get total count
    const total = await sanityClient.fetch(`count(${baseQuery})`);
    
    // Get paginated results with all needed fields
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const fanOfMonth = await sanityClient.fetch(
      `${baseQuery} {
        _id,
        fanName,
        email,
        phone,
        category,
        supporterSince,
        story,
        photos[] {
          public_id,
          secure_url
        },
        socialPermissions,
        status,
        submittedAt,
        reviewNotes
      } | order(submittedAt desc)[${from}...${to}]`
    );

    // Get category counts for overview cards
    const categoryCounts = await sanityClient.fetch(`{
      "loyalLegend": count(*[_type == "fanOfMonth" && category == "loyal_legend"]),
      "risingTogether": count(*[_type == "fanOfMonth" && category == "rising_together"]),
      "communityChampion": count(*[_type == "fanOfMonth" && category == "community_champion"]),
      "matchDayMagic": count(*[_type == "fanOfMonth" && category == "match_day_magic"]),
      "nextGeneration": count(*[_type == "fanOfMonth" && category == "next_generation"])
    }`);

    return NextResponse.json({
      success: true,
      fanOfMonth: fanOfMonth || [],
      categoryCounts,
      pagination: {
        page,
        pageSize,
        total: total || 0,
        totalPages: Math.ceil((total || 0) / pageSize),
        hasMore: total ? total > page * pageSize : false
      }
    });

  } catch (error) {
    console.error('GET fan of month error:', error);
    return NextResponse.json({ error: 'Failed to fetch Fan of the Month submissions' }, { status: 500 });
  }
}

// PUT: Update fan of month status (feature/archive)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, reviewNotes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Fan of the Month ID is required' }, { status: 400 });
    }

    if (!status || !['pending', 'approved', 'featured', 'declined'].includes(status)) {
      return NextResponse.json({ 
        error: 'Valid status is required (pending, approved, featured, declined)' 
      }, { status: 400 });
    }

    // Prepare update data
    const updateData: any = {
      status
    };

    // Add review notes if provided
    if (reviewNotes !== undefined) {
      updateData.reviewNotes = reviewNotes;
    }

    // Update fan of month in Sanity
    const result = await sanityClient
      .patch(id)
      .set(updateData)
      .commit();

    return NextResponse.json({
      success: true,
      message: `Fan of the Month submission ${status} successfully`,
      fanOfMonthId: result._id
    });

  } catch (error) {
    console.error('PUT fan of month error:', error);
    return NextResponse.json({ error: 'Failed to update Fan of the Month status' }, { status: 500 });
  }
}