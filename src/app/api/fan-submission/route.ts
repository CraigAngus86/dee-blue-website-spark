import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

// Cloudinary upload function using upload presets
async function uploadPhotosToCloudinary(photos: File[]): Promise<any[]> {
  const uploadedPhotos = [];
  
  for (const photo of photos) {
    try {
      const formData = new FormData();
      formData.append('file', photo);
      formData.append('upload_preset', 'fan_submissions');
      // Fix: Don't add folder here - let preset handle it
      
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
      uploadedPhotos.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format
      });
    } catch (error) {
      console.error(`Failed to upload photo ${photo.name}:`, error);
      throw new Error(`Failed to upload photo: ${photo.name}`);
    }
  }
  
  return uploadedPhotos;
}

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    
    // Extract text fields
    const fanName = formData.get('fanName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const category = formData.get('category') as string;
    const story = formData.get('story') as string;
    const supporterSince = formData.get('supporterSince') as string;
    const socialPermissions = formData.get('socialPermissions') === 'true';
    
    // Validate required fields
    if (!fanName?.trim()) {
      return NextResponse.json(
        { error: 'Fan name is required' },
        { status: 400 }
      );
    }
    
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category selection is required' },
        { status: 400 }
      );
    }
    
    if (!story?.trim() || story.trim().length < 100) {
      return NextResponse.json(
        { error: 'Story must be at least 100 characters long' },
        { status: 400 }
      );
    }
    
    // Extract photos
    const photoFiles: File[] = [];
    const photoEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith('photo_'));
    
    for (const [, file] of photoEntries) {
      if (file instanceof File && file.size > 0) {
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: `Photo ${file.name} is too large. Maximum 5MB per photo.` },
            { status: 400 }
          );
        }
        
        // Validate file type
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
          return NextResponse.json(
            { error: `Photo ${file.name} is not a supported format. Please use JPG or PNG.` },
            { status: 400 }
          );
        }
        
        photoFiles.push(file);
      }
    }
    
    // Upload photos to Cloudinary if any exist
    let uploadedPhotos: any[] = [];
    if (photoFiles.length > 0) {
      try {
        uploadedPhotos = await uploadPhotosToCloudinary(photoFiles);
      } catch (error) {
        console.error('Photo upload error:', error);
        return NextResponse.json(
          { error: 'Failed to upload photos. Please try again.' },
          { status: 500 }
        );
      }
    }
    
    // Prepare Sanity document with proper _key for photos
    const fanSubmissionDoc = {
      _type: 'fanOfMonth',
      fanName: fanName.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      category,
      story: story.trim(),
      supporterSince: supporterSince ? parseInt(supporterSince) : null,
      socialPermissions,
      photos: uploadedPhotos.map((photo, index) => ({
        _key: `photo-${Date.now()}-${index}`, // Fix: Add unique keys
        _type: 'cloudinary.asset',
        public_id: photo.public_id,
        secure_url: photo.secure_url,
        width: photo.width,
        height: photo.height,
        format: photo.format
      })),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    // Create document in Sanity
    const result = await sanityClient.create(fanSubmissionDoc);
    
    console.log('Fan submission created:', result._id);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your submission has been received and will be reviewed.',
      submissionId: result._id
    });
    
  } catch (error) {
    console.error('Fan submission API error:', error);
    
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
