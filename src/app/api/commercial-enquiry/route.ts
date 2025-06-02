import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

export async function POST(req: NextRequest) {
  try {
    // Parse JSON data
    const formData = await req.json();
    
    // Extract and validate required fields
    const {
      name,
      company,
      email,
      phone,
      interestType,
      sponsorshipType,
      budgetRange,
      durationInterest,
      packageInterest,
      groupSize,
      preferredMatches,
      message,
      hearAboutUs,
      preferredContact,
      submittedAt,
      source,
      matchContext
    } = formData;

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!company?.trim()) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    if (!interestType) {
      return NextResponse.json(
        { error: 'Interest type is required' },
        { status: 400 }
      );
    }

    // Conditional validation based on interest type
    if (interestType === 'sponsorship' || interestType === 'both') {
      if (!sponsorshipType) {
        return NextResponse.json(
          { error: 'Sponsorship type is required for sponsorship enquiries' },
          { status: 400 }
        );
      }
      if (!budgetRange) {
        return NextResponse.json(
          { error: 'Budget range is required for sponsorship enquiries' },
          { status: 400 }
        );
      }
    }

    if (interestType === 'hospitality' || interestType === 'both') {
      if (!packageInterest) {
        return NextResponse.json(
          { error: 'Package interest is required for hospitality enquiries' },
          { status: 400 }
        );
      }
      if (!groupSize) {
        return NextResponse.json(
          { error: 'Group size is required for hospitality enquiries' },
          { status: 400 }
        );
      }
    }

    // Prepare Sanity document
    const commercialEnquiryDoc = {
      _type: 'commercialEnquiry',
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      interestType,
      
      // Sponsorship fields
      sponsorshipType: sponsorshipType || null,
      budgetRange: budgetRange || null,
      durationInterest: durationInterest || null,
      
      // Hospitality fields
      packageInterest: packageInterest || null,
      groupSize: groupSize || null,
      preferredMatches: preferredMatches || null,
      
      // Additional information
      message: message?.trim() || null,
      hearAboutUs: hearAboutUs || null,
      preferredContact: preferredContact || 'email',
      
      // Metadata
      source: source || 'commercial_page',
      matchContext: matchContext || null,
      status: 'pending',
      priority: getPriority(interestType, budgetRange),
      submittedAt: submittedAt || new Date().toISOString(),
      
      // Auto-generated summary for admin review
      enquirySummary: generateEnquirySummary({
        company,
        interestType,
        sponsorshipType,
        packageInterest,
        budgetRange,
        groupSize
      })
    };

    // Create document in Sanity
    const result = await sanityClient.create(commercialEnquiryDoc);

    console.log('Commercial enquiry created:', result._id);

    // Prepare response data
    const responseData = {
      success: true,
      message: 'Thank you for your enquiry! Our commercial team will contact you within 24 hours.',
      enquiryId: result._id,
      expectedResponse: getExpectedResponseTime(interestType, budgetRange)
    };

    // TODO: Add email notification here if needed
    // await sendCommercialEnquiryNotification(commercialEnquiryDoc);

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Commercial enquiry API error:', error);

    // Check if it's a validation error from Sanity
    if (error.message?.includes('validation')) {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your inputs and try again.' },
        { status: 400 }
      );
    }

    // Check if it's a network/connection error
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return NextResponse.json(
        { error: 'Connection error. Please check your internet connection and try again.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

// Helper function to determine enquiry priority
function getPriority(interestType: string, budgetRange: string): string {
  if (interestType === 'both') return 'high';
  if (budgetRange === 'over3000') return 'high';
  if (budgetRange === '1000-3000') return 'medium';
  return 'standard';
}

// Helper function to generate admin-friendly summary
function generateEnquirySummary(data: {
  company: string;
  interestType: string;
  sponsorshipType?: string;
  packageInterest?: string;
  budgetRange?: string;
  groupSize?: string;
}): string {
  const { company, interestType, sponsorshipType, packageInterest, budgetRange, groupSize } = data;
  
  let summary = `${company} - `;
  
  if (interestType === 'sponsorship') {
    summary += `Sponsorship enquiry (${sponsorshipType || 'unspecified'})`;
    if (budgetRange) summary += ` - Budget: ${budgetRange}`;
  } else if (interestType === 'hospitality') {
    summary += `Hospitality enquiry (${packageInterest || 'unspecified'})`;
    if (groupSize) summary += ` - Group: ${groupSize}`;
  } else if (interestType === 'both') {
    summary += `Combined sponsorship & hospitality enquiry`;
    if (budgetRange) summary += ` - Budget: ${budgetRange}`;
  } else {
    summary += `General commercial enquiry`;
  }
  
  return summary;
}

// Helper function to set expected response time
function getExpectedResponseTime(interestType: string, budgetRange: string): string {
  if (interestType === 'both' || budgetRange === 'over3000') {
    return 'within 4 hours';
  }
  return 'within 24 hours';
}
