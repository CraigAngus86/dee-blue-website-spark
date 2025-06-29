import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

// GET: Single enquiry by ID OR paginated enquiries with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // SINGLE ENQUIRY FETCHING (for EDIT mode)
    if (id) {
      const enquiry = await sanityClient.getDocument(id);

      if (!enquiry) {
        return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        enquiries: [enquiry],
        pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasMore: false }
      });
    }

    // PAGINATED ENQUIRIES FETCHING (for table view)
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '25');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const source = searchParams.get('source');
    const dateRange = searchParams.get('dateRange');

    // Build GROQ query with filters
    let filters: string[] = [];
    
    if (status && status !== 'all') {
      filters.push(`status == "${status}"`);
    }
    
    if (priority && priority !== 'all') {
      filters.push(`priority == "${priority}"`);
    }

    if (source && source !== 'all') {
      filters.push(`source == "${source}"`);
    }

    // Date range filtering
    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      if (dateRange === 'last7days') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filters.push(`submittedAt >= "${weekAgo.toISOString()}"`);
      } else if (dateRange === 'last30days') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filters.push(`submittedAt >= "${monthAgo.toISOString()}"`);
      } else if (dateRange === 'lastyear') {
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        filters.push(`submittedAt >= "${yearAgo.toISOString()}"`);
      }
    }

    const filterString = filters.length > 0 ? ` && ${filters.join(' && ')}` : '';
    const baseQuery = `*[_type == "commercialEnquiry"${filterString}]`;
    
    // Get total count
    const total = await sanityClient.fetch(`count(${baseQuery})`);
    
    // Get paginated results
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const enquiries = await sanityClient.fetch(
      `${baseQuery} | order(submittedAt desc, _createdAt desc)[${from}...${to}]`
    );

    return NextResponse.json({
      success: true,
      enquiries: enquiries || [],
      pagination: {
        page,
        pageSize,
        total: total || 0,
        totalPages: Math.ceil((total || 0) / pageSize),
        hasMore: total ? total > page * pageSize : false
      }
    });

  } catch (error) {
    console.error('GET business-enquiries error:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

// POST: Create new enquiry
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract fields from commercialEnquiry schema
    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const preferredContact = formData.get('preferredContact') as string;
    const interestType = formData.get('interestType') as string;
    const sponsorshipType = formData.get('sponsorshipType') as string;
    const budgetRange = formData.get('budgetRange') as string;
    const durationInterest = formData.get('durationInterest') as string;
    const packageInterest = formData.get('packageInterest') as string;
    const groupSize = formData.get('groupSize') as string;
    const preferredMatches = formData.get('preferredMatches') as string;
    const message = formData.get('message') as string;
    const hearAboutUs = formData.get('hearAboutUs') as string;
    const status = formData.get('status') as string;
    const priority = formData.get('priority') as string;
    const assignedTo = formData.get('assignedTo') as string;
    const followUpDate = formData.get('followUpDate') as string;
    const source = formData.get('source') as string;
    const matchContext = formData.get('matchContext') as string;

    // Validation
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Contact name is required' }, { status: 400 });
    }

    if (!company?.trim()) {
      return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
    }

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    if (!interestType) {
      return NextResponse.json({ error: 'Interest type is required' }, { status: 400 });
    }

    // Generate enquiry summary
    const enquirySummary = `${interestType} enquiry from ${company} - ${name}`;

    // Prepare document for Sanity
    const enquiryDoc = {
      _type: 'commercialEnquiry',
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      preferredContact: preferredContact || 'email',
      interestType,
      sponsorshipType: sponsorshipType || null,
      budgetRange: budgetRange || null,
      durationInterest: durationInterest || null,
      packageInterest: packageInterest || null,
      groupSize: groupSize || null,
      preferredMatches: preferredMatches || null,
      message: message?.trim() || null,
      hearAboutUs: hearAboutUs || null,
      status: status || 'pending',
      priority: priority || 'standard',
      enquirySummary,
      assignedTo: assignedTo?.trim() || null,
      followUpDate: followUpDate || null,
      source: source || 'commercial_page',
      matchContext: matchContext?.trim() || null,
      submittedAt: new Date().toISOString()
    };

    // Create enquiry in Sanity
    const result = await sanityClient.create(enquiryDoc);

    return NextResponse.json({
      success: true,
      message: 'Enquiry created successfully',
      enquiryId: result._id
    });

  } catch (error) {
    console.error('POST business-enquiries error:', error);
    return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
  }
}

// PUT: Update existing enquiry
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });
    }

    // Prepare update object
    let updateData: any = {};

    // Extract and validate fields for update
    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const preferredContact = formData.get('preferredContact') as string;
    const interestType = formData.get('interestType') as string;
    const sponsorshipType = formData.get('sponsorshipType') as string;
    const budgetRange = formData.get('budgetRange') as string;
    const durationInterest = formData.get('durationInterest') as string;
    const packageInterest = formData.get('packageInterest') as string;
    const groupSize = formData.get('groupSize') as string;
    const preferredMatches = formData.get('preferredMatches') as string;
    const message = formData.get('message') as string;
    const hearAboutUs = formData.get('hearAboutUs') as string;
    const status = formData.get('status') as string;
    const priority = formData.get('priority') as string;
    const assignedTo = formData.get('assignedTo') as string;
    const followUpDate = formData.get('followUpDate') as string;
    const matchContext = formData.get('matchContext') as string;

    // Build update object
    if (name && name.trim()) updateData.name = name.trim();
    if (company && company.trim()) updateData.company = company.trim();
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
      }
      updateData.email = email.trim();
    }
    if (phone !== undefined) updateData.phone = phone?.trim() || null;
    if (preferredContact) updateData.preferredContact = preferredContact;
    if (interestType) updateData.interestType = interestType;
    if (sponsorshipType !== undefined) updateData.sponsorshipType = sponsorshipType || null;
    if (budgetRange !== undefined) updateData.budgetRange = budgetRange || null;
    if (durationInterest !== undefined) updateData.durationInterest = durationInterest || null;
    if (packageInterest !== undefined) updateData.packageInterest = packageInterest || null;
    if (groupSize !== undefined) updateData.groupSize = groupSize || null;
    if (preferredMatches !== undefined) updateData.preferredMatches = preferredMatches || null;
    if (message !== undefined) updateData.message = message?.trim() || null;
    if (hearAboutUs !== undefined) updateData.hearAboutUs = hearAboutUs || null;
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo?.trim() || null;
    if (followUpDate !== undefined) updateData.followUpDate = followUpDate || null;
    if (matchContext !== undefined) updateData.matchContext = matchContext?.trim() || null;

    // Update enquiry summary if key fields changed
    if (updateData.interestType || updateData.company || updateData.name) {
      // Fetch current data to build new summary
      const current = await sanityClient.getDocument(id);
      if (current) {
        const newInterestType = updateData.interestType || current.interestType;
        const newCompany = updateData.company || current.company;
        const newName = updateData.name || current.name;
        updateData.enquirySummary = `${newInterestType} enquiry from ${newCompany} - ${newName}`;
      }
    }

    // Update enquiry in Sanity
    const result = await sanityClient
      .patch(id)
      .set(updateData)
      .commit();

    return NextResponse.json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiryId: result._id
    });

  } catch (error) {
    console.error('PUT business-enquiries error:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

// DELETE: Delete enquiry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });
    }

    // Delete enquiry from Sanity
    await sanityClient.delete(id);

    return NextResponse.json({
      success: true,
      message: 'Enquiry deleted successfully'
    });

  } catch (error) {
    console.error('DELETE business-enquiries error:', error);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
