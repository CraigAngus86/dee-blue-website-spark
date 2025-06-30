import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

// Function to count words properly (from news API)
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Rich text conversion helpers (from news API)
function blocksToText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks
    .filter(block => block._type === 'block' && block.children)
    .map(block => 
      block.children
        .filter((child: any) => child._type === 'span' && child.text)
        .map((child: any) => child.text)
        .join('')
    )
    .join('\n\n');
}

function textToBlocks(text: string): any[] {
  if (!text || typeof text !== 'string') return [];
  
  const paragraphs = text.trim().split('\n\n').filter(p => p.trim());
  
  return paragraphs.map(paragraph => ({
    _type: 'block',
    _key: Math.random().toString(36).substr(2, 9),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).substr(2, 9),
        text: paragraph.trim(),
        marks: []
      }
    ]
  }));
}

// Cloudinary upload function (adapted from sponsor API)
async function uploadImageToCloudinary(imageFile: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'player-upload');
    formData.append('folder', 'banksodeefc/people');
    
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
    
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format
    };
  } catch (error) {
    console.error('Failed to upload staff image:', error);
    throw new Error('Failed to upload staff image');
  }
}

// GET: Single staff by ID OR paginated staff with filtering (STAFF ONLY)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // SINGLE STAFF FETCHING (for EDIT mode)
    if (id) {
      const query = `*[_type == "playerProfile" && _id == $id && personType == "staff"][0] {
        _id,
        firstName,
        lastName,
        playerName,
        staffType,
        staffRole,
        nationality,
        profileImage,
        extendedBio,
        socialMedia,
        careerHistory,
        accolades,
        personalFacts,
        gallery
      }`;

      const staff = await sanityClient.fetch(query, { id });

      if (!staff) {
        return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
      }

      // Convert rich text blocks to plain text for editing
      const editableStaff = {
        ...staff,
        extendedBio: blocksToText(staff.extendedBio)
      };

      return NextResponse.json({
        success: true,
        staff: [editableStaff],
        pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasMore: false }
      });
    }

    // PAGINATED STAFF FETCHING (for table view) - STAFF ONLY
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '25');
    const staffType = searchParams.get('staffType');
    const staffRole = searchParams.get('staffRole');

    // Build GROQ query with filters - STAFF ONLY
    let filters = ['personType == "staff"']; // ONLY STAFF
    
    if (staffType && staffType !== 'all') {
      filters.push(`staffType == "${staffType}"`);
    }
    
    if (staffRole && staffRole !== 'all') {
      filters.push(`staffRole == "${staffRole}"`);
    }

    const filterString = filters.length > 0 ? ` && ${filters.join(' && ')}` : '';
    const baseQuery = `*[_type == "playerProfile"${filterString}]`;
    
    // Get total count
    const total = await sanityClient.fetch(`count(${baseQuery})`);
    
    // Get paginated results with specific field selection (like player API)
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const query = `${baseQuery} | order(lastName asc, firstName asc)[${from}...${to}] {
      _id,
      firstName,
      lastName,
      playerName,
      staffType,
      staffRole,
      nationality,
      profileImage,
      extendedBio
    }`;
    
    const staff = await sanityClient.fetch(query);

    // Get staff type counts for overview
    const staffCounts = await sanityClient.fetch(`{
      "manager": count(*[_type == "playerProfile" && personType == "staff" && staffType == "manager"]),
      "coach": count(*[_type == "playerProfile" && personType == "staff" && staffType == "coach"]),
      "staff": count(*[_type == "playerProfile" && personType == "staff" && staffType == "staff"])
    }`);

    return NextResponse.json({
      success: true,
      staff: staff || [],
      staffCounts,
      pagination: {
        page,
        pageSize,
        total: total || 0,
        totalPages: Math.ceil((total || 0) / pageSize),
        hasMore: total ? total > page * pageSize : false
      }
    });

  } catch (error) {
    console.error('GET staff error:', error);
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
  }
}

// POST: Create new staff member (STAFF ONLY)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract fields from staff schema
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const nationality = formData.get('nationality') as string;
    const staffType = formData.get('staffType') as string;
    const staffRole = formData.get('staffRole') as string;
    const extendedBio = formData.get('extendedBio') as string;
    const profileImageFile = formData.get('profileImage') as File;

    // Social media fields
    const twitterHandle = formData.get('twitter') as string;
    const facebookHandle = formData.get('facebook') as string;
    const instagramHandle = formData.get('instagram') as string;
    const linkedinHandle = formData.get('linkedin') as string;
    const websiteUrl = formData.get('website') as string;

    // Validation
    if (!firstName?.trim()) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 });
    }

    if (!lastName?.trim()) {
      return NextResponse.json({ error: 'Last name is required' }, { status: 400 });
    }

    if (!staffType) {
      return NextResponse.json({ error: 'Staff type is required' }, { status: 400 });
    }

    if (!staffRole) {
      return NextResponse.json({ error: 'Staff role is required' }, { status: 400 });
    }

    // Profile image required for new staff
    if (!profileImageFile || profileImageFile.size === 0) {
      return NextResponse.json({ error: 'Staff photo is required' }, { status: 400 });
    }

    // Image file validation
    if (profileImageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image file too large. Maximum 5MB.' }, { status: 400 });
    }
    
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(profileImageFile.type)) {
      return NextResponse.json({ error: 'Invalid image format. Use JPG or PNG.' }, { status: 400 });
    }

    // Upload image to Cloudinary
    let uploadedImage = null;
    try {
      uploadedImage = await uploadImageToCloudinary(profileImageFile);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to upload staff image' }, { status: 500 });
    }

    // Prepare document for Sanity
    const staffDoc = {
      _type: 'playerProfile',
      personType: 'staff',
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      playerName: `${firstName.trim()} ${lastName.trim()}`,
      nationality: nationality?.trim() || 'Scotland',
      staffType,
      staffRole,
      extendedBio: extendedBio ? textToBlocks(extendedBio.trim()) : [],
      profileImage: uploadedImage ? {
        _key: uploadedImage.public_id,
        _type: 'cloudinary.asset',
        public_id: uploadedImage.public_id,
        secure_url: uploadedImage.secure_url,
        width: uploadedImage.width,
        height: uploadedImage.height,
        format: uploadedImage.format
      } : null,
      socialMedia: {
        twitter: twitterHandle?.trim() || null,
        facebook: facebookHandle?.trim() || null,
        instagram: instagramHandle?.trim() || null,
        linkedin: linkedinHandle?.trim() || null,
        website: websiteUrl?.trim() || null
      },
      careerHistory: [],
      accolades: [],
      personalFacts: [],
      gallery: []
    };

    // Create staff in Sanity
    const result = await sanityClient.create(staffDoc);

    return NextResponse.json({
      success: true,
      message: 'Staff member created successfully',
      staffId: result._id
    });

  } catch (error) {
    console.error('POST staff error:', error);
    return NextResponse.json({ error: 'Failed to create staff member' }, { status: 500 });
  }
}

// PUT: Update existing staff member (STAFF ONLY)
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;

    if (!id) {
      return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
    }

    // Get current staff data
    const currentStaff = await sanityClient.getDocument(id);
    if (!currentStaff || currentStaff.personType !== 'staff') {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }

    // Prepare update object
    let updateData: any = {};

    // Extract fields
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const nationality = formData.get('nationality') as string;
    const staffType = formData.get('staffType') as string;
    const staffRole = formData.get('staffRole') as string;
    const extendedBio = formData.get('extendedBio') as string;
    const profileImageFile = formData.get('profileImage') as File;

    // Social media fields
    const twitterHandle = formData.get('twitter') as string;
    const facebookHandle = formData.get('facebook') as string;
    const instagramHandle = formData.get('instagram') as string;
    const linkedinHandle = formData.get('linkedin') as string;
    const websiteUrl = formData.get('website') as string;

    // Build update object
    if (firstName && firstName.trim()) {
      updateData.firstName = firstName.trim();
    }
    if (lastName && lastName.trim()) {
      updateData.lastName = lastName.trim();
    }
    if (firstName && lastName) {
      updateData.playerName = `${firstName.trim()} ${lastName.trim()}`;
    }
    if (nationality !== undefined) updateData.nationality = nationality?.trim() || 'Scotland';
    if (staffType) updateData.staffType = staffType;
    if (staffRole) updateData.staffRole = staffRole;
    if (extendedBio !== undefined) {
      updateData.extendedBio = extendedBio ? textToBlocks(extendedBio.trim()) : [];
    }

    // Handle social media updates
    const socialMediaUpdate: any = {};
    if (twitterHandle !== undefined) socialMediaUpdate.twitter = twitterHandle?.trim() || null;
    if (facebookHandle !== undefined) socialMediaUpdate.facebook = facebookHandle?.trim() || null;
    if (instagramHandle !== undefined) socialMediaUpdate.instagram = instagramHandle?.trim() || null;
    if (linkedinHandle !== undefined) socialMediaUpdate.linkedin = linkedinHandle?.trim() || null;
    if (websiteUrl !== undefined) socialMediaUpdate.website = websiteUrl?.trim() || null;

    if (Object.keys(socialMediaUpdate).length > 0) {
      updateData.socialMedia = {
        ...currentStaff.socialMedia,
        ...socialMediaUpdate
      };
    }

    // Handle new image upload if provided (OPTIONAL in edit mode)
    if (profileImageFile && profileImageFile.size > 0) {
      // Validate image
      if (profileImageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Image file too large. Maximum 5MB.' }, { status: 400 });
      }
      
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(profileImageFile.type)) {
        return NextResponse.json({ error: 'Invalid image format. Use JPG or PNG.' }, { status: 400 });
      }

      try {
        const uploadedImage = await uploadImageToCloudinary(profileImageFile);
        updateData.profileImage = {
          _key: uploadedImage.public_id,
          _type: 'cloudinary.asset',
          public_id: uploadedImage.public_id,
          secure_url: uploadedImage.secure_url,
          width: uploadedImage.width,
          height: uploadedImage.height,
          format: uploadedImage.format
        };
      } catch (error) {
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
      }
    }

    // Update staff in Sanity
    const result = await sanityClient
      .patch(id)
      .set(updateData)
      .commit();

    return NextResponse.json({
      success: true,
      message: 'Staff member updated successfully',
      staffId: result._id
    });

  } catch (error) {
    console.error('PUT staff error:', error);
    return NextResponse.json({ error: 'Failed to update staff member' }, { status: 500 });
  }
}

// DELETE: Delete staff member (STAFF ONLY)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
    }

    // Verify it's a staff member before deletion
    const staff = await sanityClient.getDocument(id);
    if (!staff || staff.personType !== 'staff') {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }

    // Delete staff from Sanity
    await sanityClient.delete(id);

    return NextResponse.json({
      success: true,
      message: 'Staff member deleted successfully'
    });

  } catch (error) {
    console.error('DELETE staff error:', error);
    return NextResponse.json({ error: 'Failed to delete staff member' }, { status: 500 });
  }
}