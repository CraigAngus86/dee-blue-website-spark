import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

// GET: Single fan photo by ID OR paginated fan photos with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // SINGLE FAN PHOTO FETCHING (for detailed view if needed)
    if (id) {
      const fanPhoto = await sanityClient.getDocument(id);

      if (!fanPhoto) {
        return NextResponse.json({ error: 'Fan photo not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        fanPhotos: [fanPhoto],
        pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasMore: false }
      });
    }

    // PAGINATED FAN PHOTOS FETCHING (for moderation grid)
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20'); // Grid view, more per page
    const status = searchParams.get('status');
    const dateRange = searchParams.get('dateRange');

    // Build GROQ query with filters
    let filters: string[] = [];
    
    if (status && status !== 'all') {
      filters.push(`approvalStatus == "${status}"`);
    }

    // Date range filtering
    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      if (dateRange === 'today') {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        filters.push(`submittedAt >= "${today.toISOString()}"`);
      } else if (dateRange === 'thisweek') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filters.push(`submittedAt >= "${weekAgo.toISOString()}"`);
      } else if (dateRange === 'thismonth') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filters.push(`submittedAt >= "${monthAgo.toISOString()}"`);
      }
    }

    const filterString = filters.length > 0 ? ` && ${filters.join(' && ')}` : '';
    const baseQuery = `*[_type == "fanPhoto"${filterString}]`;
    
    // Get total count
    const total = await sanityClient.fetch(`count(${baseQuery})`);
    
    // Get paginated results with all needed fields
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const fanPhotos = await sanityClient.fetch(
      `${baseQuery} {
        _id,
        fanName,
        email,
        photo {
          public_id,
          secure_url
        },
        context,
        approvalStatus,
        submittedAt,
        approvedAt,
        socialPermissions,
        reviewNotes,
        displayOrder
      } | order(submittedAt desc)[${from}...${to}]`
    );

    // Get status counts for overview cards
    const statusCounts = await sanityClient.fetch(`{
      "pending": count(*[_type == "fanPhoto" && approvalStatus == "pending"]),
      "approved": count(*[_type == "fanPhoto" && approvalStatus == "approved"]),
      "featured": count(*[_type == "fanPhoto" && approvalStatus == "featured"]),
      "declined": count(*[_type == "fanPhoto" && approvalStatus == "declined"])
    }`);

    return NextResponse.json({
      success: true,
      fanPhotos: fanPhotos || [],
      statusCounts,
      pagination: {
        page,
        pageSize,
        total: total || 0,
        totalPages: Math.ceil((total || 0) / pageSize),
        hasMore: total ? total > page * pageSize : false
      }
    });

  } catch (error) {
    console.error('GET fan photos error:', error);
    return NextResponse.json({ error: 'Failed to fetch fan photos' }, { status: 500 });
  }
}

// PUT: Update fan photo status (approve/feature/decline)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, approvalStatus, reviewNotes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Fan photo ID is required' }, { status: 400 });
    }

    if (!approvalStatus || !['pending', 'approved', 'featured', 'declined'].includes(approvalStatus)) {
      return NextResponse.json({ 
        error: 'Valid approval status is required (pending, approved, featured, declined)' 
      }, { status: 400 });
    }

    // Prepare update data
    const updateData: any = {
      approvalStatus
    };

    // Add approval timestamp if approving or featuring
    if (approvalStatus === 'approved' || approvalStatus === 'featured') {
      updateData.approvedAt = new Date().toISOString();
    }

    // Add review notes if provided
    if (reviewNotes !== undefined) {
      updateData.reviewNotes = reviewNotes;
    }

    // Update fan photo in Sanity
    const result = await sanityClient
      .patch(id)
      .set(updateData)
      .commit();

    return NextResponse.json({
      success: true,
      message: `Fan photo ${approvalStatus} successfully`,
      fanPhotoId: result._id
    });

  } catch (error) {
    console.error('PUT fan photos error:', error);
    return NextResponse.json({ error: 'Failed to update fan photo status' }, { status: 500 });
  }
}