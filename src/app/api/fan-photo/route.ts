import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

// Cloudinary upload function for single photo
async function uploadPhotoToCloudinary(photo: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'fan_submissions');
    // Note: Using same preset but API will organize into gallery folder
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
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
    console.error(`Failed to upload photo ${photo.name}:`, error);
    throw new Error(`Failed to upload photo: ${photo.name}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    
    // Extract text fields - SIMPLIFIED PERMISSIONS
    const fanName = formData.get('fanName') as string;
    const email = formData.get('email') as string;
    const context = formData.get('context') as string;
    const socialPermissions = formData.get('socialPermissions') === 'true';
    
    // Validate required fields
    if (!fanName?.trim()) {
      return NextResponse.json(
        { error: 'Your name is required' },
        { status: 400 }
      );
    }
    
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // REMOVED: Context requirement and word count validation
    // Context is now optional - no validation needed
    
    // Extract photo
    const photoFile = formData.get('photo') as File;
    
    if (!photoFile || photoFile.size === 0) {
      return NextResponse.json(
        { error: 'Photo is required' },
        { status: 400 }
      );
    }
    
    // Validate photo file
    if (photoFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: `Photo is too large. Maximum 5MB per photo.` },
        { status: 400 }
      );
    }
    
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(photoFile.type)) {
      return NextResponse.json(
        { error: `Photo is not a supported format. Please use JPG or PNG.` },
        { status: 400 }
      );
    }
    
    // Upload photo to Cloudinary
    let uploadedPhoto: any;
    try {
      uploadedPhoto = await uploadPhotoToCloudinary(photoFile);
    } catch (error) {
      console.error('Photo upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload photo. Please try again.' },
        { status: 500 }
      );
    }
    
    // Prepare Sanity document - SIMPLIFIED PERMISSIONS STRUCTURE
    const fanPhotoDoc = {
      _type: 'fanPhoto',
      fanName: fanName.trim(),
      email: email.trim(),
      context: context?.trim() || '', // Optional context
      photo: {
        _type: 'cloudinary.asset',
        public_id: uploadedPhoto.public_id,
        secure_url: uploadedPhoto.secure_url,
        width: uploadedPhoto.width,
        height: uploadedPhoto.height,
        format: uploadedPhoto.format
      },
      socialPermissions: socialPermissions, // SIMPLIFIED: Single boolean
      approvalStatus: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    // Create document in Sanity
    const result = await sanityClient.create(fanPhotoDoc);
    
    console.log('Fan photo submission created:', result._id);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your photo has been submitted and will be reviewed.',
      submissionId: result._id
    });
    
  } catch (error) {
    console.error('Fan photo API error:', error);
    
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
