import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

// Debug function to check environment variables
function debugEnvironmentVariables() {
  const envCheck = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? 'SET' : 'MISSING',
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET ? 'SET' : 'MISSING', 
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION ? 'SET' : 'MISSING',
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN ? 'SET' : 'MISSING',
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'undefined'
  };
  
  console.log('🔍 Environment Variables Check:', envCheck);
  
  // Check for critical missing variables
  const missing = Object.entries(envCheck)
    .filter(([key, value]) => value === 'MISSING')
    .map(([key]) => key);
    
  if (missing.length > 0) {
    console.log('❌ Missing Environment Variables:', missing);
    return { valid: false, missing };
  }
  
  console.log('✅ All Environment Variables Present');
  return { valid: true, missing: [] };
}

// Cloudinary upload function using upload presets
async function uploadPhotosToCloudinary(photos: File[]): Promise<any[]> {
  console.log('📤 Starting Cloudinary upload for', photos.length, 'photos');
  
  const uploadedPhotos = [];
  
  for (const photo of photos) {
    try {
      console.log(`📷 Uploading photo: ${photo.name} (${photo.size} bytes)`);
      
      const formData = new FormData();
      formData.append('file', photo);
      formData.append('upload_preset', 'fan_submissions');
      
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      console.log('🌐 Cloudinary URL:', cloudinaryUrl);
      
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });
      
      console.log('📤 Cloudinary response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Cloudinary upload failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Cloudinary upload failed: ${response.statusText} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log('✅ Photo uploaded successfully:', result.public_id);
      
      uploadedPhotos.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format
      });
    } catch (error) {
      console.error(`❌ Failed to upload photo ${photo.name}:`, error);
      throw new Error(`Failed to upload photo: ${photo.name} - ${error.message}`);
    }
  }
  
  console.log('✅ All photos uploaded successfully');
  return uploadedPhotos;
}

export async function POST(req: NextRequest) {
  console.log('🚀 Fan submission API called');
  
  try {
    // Debug environment variables first
    const envCheck = debugEnvironmentVariables();
    if (!envCheck.valid) {
      return NextResponse.json(
        { 
          error: 'Server configuration error: Missing environment variables',
          missing: envCheck.missing,
          details: 'Environment variables not configured in production'
        },
        { status: 500 }
      );
    }
    
    // Test Sanity client initialization
    try {
      console.log('🔧 Testing Sanity client initialization...');
      // Simple test query to verify Sanity connection
      await sanityClient.fetch('*[_type == "fanOfMonth"][0...1]');
      console.log('✅ Sanity client working');
    } catch (sanityError) {
      console.error('❌ Sanity client error:', sanityError);
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          details: process.env.NODE_ENV === 'development' ? sanityError.message : 'Sanity authentication failed'
        },
        { status: 500 }
      );
    }
    
    console.log('📝 Parsing form data...');
    
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
    
    console.log('📋 Form data extracted:', {
      fanName: fanName?.slice(0, 20) + '...',
      email: email?.slice(0, 10) + '...',
      category,
      storyLength: story?.length,
      hasPhone: !!phone,
      hasSupporterSince: !!supporterSince,
      socialPermissions
    });
    
    // Validate required fields
    if (!fanName?.trim()) {
      console.log('❌ Validation failed: Fan name missing');
      return NextResponse.json(
        { error: 'Fan name is required' },
        { status: 400 }
      );
    }
    
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('❌ Validation failed: Invalid email');
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    if (!category) {
      console.log('❌ Validation failed: Category missing');
      return NextResponse.json(
        { error: 'Category selection is required' },
        { status: 400 }
      );
    }
    
    if (!story?.trim() || story.trim().length < 100) {
      console.log('❌ Validation failed: Story too short');
      return NextResponse.json(
        { error: 'Story must be at least 100 characters long' },
        { status: 400 }
      );
    }
    
    console.log('✅ Form validation passed');
    
    // Extract photos
    const photoFiles: File[] = [];
    const photoEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith('photo_'));
    
    console.log('📷 Found', photoEntries.length, 'photo entries');
    
    for (const [, file] of photoEntries) {
      if (file instanceof File && file.size > 0) {
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          console.log('❌ Photo validation failed: File too large');
          return NextResponse.json(
            { error: `Photo ${file.name} is too large. Maximum 5MB per photo.` },
            { status: 400 }
          );
        }
        
        // Validate file type
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
          console.log('❌ Photo validation failed: Invalid format');
          return NextResponse.json(
            { error: `Photo ${file.name} is not a supported format. Please use JPG or PNG.` },
            { status: 400 }
          );
        }
        
        photoFiles.push(file);
      }
    }
    
    console.log('✅ Photo validation passed:', photoFiles.length, 'valid photos');
    
    // Upload photos to Cloudinary if any exist
    let uploadedPhotos: any[] = [];
    if (photoFiles.length > 0) {
      try {
        uploadedPhotos = await uploadPhotosToCloudinary(photoFiles);
      } catch (error) {
        console.error('❌ Photo upload error:', error);
        return NextResponse.json(
          { error: 'Failed to upload photos. Please try again.', details: error.message },
          { status: 500 }
        );
      }
    }
    
    console.log('📄 Creating Sanity document...');
    
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
        _key: `photo-${Date.now()}-${index}`,
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
    
    console.log('📄 Document prepared, creating in Sanity...');
    
    // Create document in Sanity
    const result = await sanityClient.create(fanSubmissionDoc);
    
    console.log('✅ Fan submission created successfully:', result._id);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your submission has been received and will be reviewed.',
      submissionId: result._id
    });
    
  } catch (error) {
    console.error('❌ Fan submission API error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const envCheck = debugEnvironmentVariables();
  
  return NextResponse.json({
    message: 'Fan submission API is running',
    environment: envCheck,
    timestamp: new Date().toISOString()
  });
}
