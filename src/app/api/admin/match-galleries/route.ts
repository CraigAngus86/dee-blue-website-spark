import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Function to count words properly (from match reports API)
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Cloudinary bulk upload function
async function uploadPhotosToCloudinary(photoFiles: File[], folderName: string): Promise<any[]> {
  const results = [];
  
  for (const photoFile of photoFiles) {
    try {
      const formData = new FormData();
      formData.append('file', photoFile);
      formData.append('upload_preset', 'gallery-upload'); // ✅ CHANGED TO GALLERY PRESET
      formData.append('folder', `banksofdeefc/matches/gallery/${folderName}`);
      
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      results.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format
      });
    } catch (error) {
      console.error('Failed to upload photo:', error);
      throw new Error(`Failed to upload photo: ${photoFile.name}`);
    }
  }
  
  return results;
}

// Cloudinary single upload function (for cover image)
async function uploadImageToCloudinary(imageFile: File, folderName: string): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'gallery-upload'); // ✅ CHANGED TO GALLERY PRESET
    formData.append('folder', `banksofdeefc/matches/gallery/${folderName}`);
    
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
    console.error('Failed to upload cover image:', error);
    throw new Error('Failed to upload cover image');
  }
}

// GET: Single gallery by ID OR paginated galleries with filtering (MATCH GALLERIES ONLY)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // SINGLE GALLERY FETCHING (for EDIT mode)
    if (id) {
      const gallery = await sanityClient.getDocument(id);

      if (!gallery) {
        return NextResponse.json({ error: 'Match gallery not found' }, { status: 404 });
      }

      // Return editable gallery data
      const editableGallery = {
        ...gallery,
        seoMetaTitle: gallery.seo?.metaTitle || '',
        seoMetaDescription: gallery.seo?.metaDescription || ''
      };

      return NextResponse.json({
        success: true,
        articles: [editableGallery], // Keep same structure as match reports
        pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasMore: false }
      });
    }

    // PAGINATED GALLERIES FETCHING (for table view) - MATCH GALLERIES ONLY
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '25');
    const status = searchParams.get('status');
    const dateRange = searchParams.get('dateRange');

    // Build GROQ query with filters - ONLY MATCH GALLERIES
    let filters = ['_type == "matchGallery"']; // ONLY MATCH GALLERIES
    
    if (status && status !== 'all') {
      if (status === 'published') {
        filters.push(`defined(publishedAt) && publishedAt <= now()`);
      } else if (status === 'draft') {
        filters.push(`!defined(publishedAt)`);
      } else if (status === 'scheduled') {
        filters.push(`defined(publishedAt) && publishedAt > now()`);
      }
    }

    // Date range filtering
    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      if (dateRange === 'last7days') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filters.push(`publishedAt >= "${weekAgo.toISOString()}"`);
      } else if (dateRange === 'last30days') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filters.push(`publishedAt >= "${monthAgo.toISOString()}"`);
      } else if (dateRange === 'lastyear') {
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        filters.push(`publishedAt >= "${yearAgo.toISOString()}"`);
      }
    }

    const filterString = filters.length > 0 ? ` && ${filters.join(' && ')}` : '';
    const baseQuery = `*[_type == "matchGallery"${filterString}]`;
    
    // Get total count
    const total = await sanityClient.fetch(`count(${baseQuery})`);
    
    // Get paginated results
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const galleries = await sanityClient.fetch(
      `${baseQuery} | order(publishedAt desc, _createdAt desc)[${from}...${to}]`
    );

    return NextResponse.json({
      success: true,
      articles: galleries || [], // Keep same structure as match reports
      pagination: {
        page,
        pageSize,
        total: total || 0,
        totalPages: Math.ceil((total || 0) / pageSize),
        hasMore: total ? total > page * pageSize : false
      }
    });

  } catch (error) {
    console.error('GET match galleries error:', error);
    return NextResponse.json({ error: 'Failed to fetch match galleries' }, { status: 500 });
  }
}

// POST: Create new match gallery
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const matchId = formData.get('matchId') as string;
    const title = formData.get('title') as string;
    const folderName = formData.get('folderName') as string;
    const author = formData.get('author') as string;
    const excerpt = formData.get('excerpt') as string;
    const publishedAt = formData.get('publishedAt') as string;
    const seoMetaTitle = formData.get('seoMetaTitle') as string;
    const seoMetaDescription = formData.get('seoMetaDescription') as string;
    const coverImageFile = formData.get('coverImage') as File;
    
    // Get all photo files
    const photoFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === 'photos' && value instanceof File && value.size > 0) {
        photoFiles.push(value);
      }
    }

    // Validation
    if (!matchId?.trim()) {
      return NextResponse.json({ error: 'Match selection is required' }, { status: 400 });
    }

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Gallery title is required' }, { status: 400 });
    }

    if (!folderName?.trim()) {
      return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
    }

    // Title word count validation (max 10 words)
    const titleWordCount = countWords(title);
    if (titleWordCount > 10) {
      return NextResponse.json({ error: 'Gallery title should be maximum 10 words' }, { status: 400 });
    }

    if (!author?.trim()) {
      return NextResponse.json({ error: 'Author is required' }, { status: 400 });
    }

    if (!excerpt?.trim()) {
      return NextResponse.json({ error: 'Gallery description is required' }, { status: 400 });
    }

    // Excerpt word count validation (max 20 words)
    const excerptWordCount = countWords(excerpt);
    if (excerptWordCount > 20) {
      return NextResponse.json({ error: 'Description must be 20 words or less' }, { status: 400 });
    }

    // Photo validation
    if (photoFiles.length === 0) {
      return NextResponse.json({ error: 'At least one match photo is required' }, { status: 400 });
    }

    if (photoFiles.length > 50) {
      return NextResponse.json({ error: 'Maximum 50 photos allowed per gallery' }, { status: 400 });
    }

    // Cover image is required
    if (!coverImageFile || coverImageFile.size === 0) {
      return NextResponse.json({ error: 'Cover image is required for galleries' }, { status: 400 });
    }

    // Validate all files
    const allFiles = [...photoFiles, coverImageFile];
    for (const file of allFiles) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: `Image ${file.name} too large. Maximum 5MB per file.` }, { status: 400 });
      }
      
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        return NextResponse.json({ error: `Invalid format for ${file.name}. Use JPG or PNG.` }, { status: 400 });
      }
    }

    console.log('Creating gallery with folder name:', folderName); // Debug log

    // Upload cover image first
    let uploadedCoverImage = null;
    try {
      uploadedCoverImage = await uploadImageToCloudinary(coverImageFile, folderName);
      console.log('Cover image uploaded to:', uploadedCoverImage.public_id); // Debug log
    } catch (error) {
      return NextResponse.json({ error: 'Failed to upload cover image' }, { status: 500 });
    }

    // Upload all photos to Cloudinary
    let uploadedPhotos = [];
    try {
      uploadedPhotos = await uploadPhotosToCloudinary(photoFiles, folderName);
      console.log('Photos uploaded, count:', uploadedPhotos.length); // Debug log
      console.log('First photo path:', uploadedPhotos[0]?.public_id); // Debug log
    } catch (error) {
      return NextResponse.json({ error: 'Failed to upload photos' }, { status: 500 });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Prepare document for Sanity
    const galleryDoc = {
      _type: 'matchGallery',
      title: title.trim(),
      slug: { current: slug },
      author: author.trim(),
      excerpt: excerpt.trim(),
      folderName: folderName.trim(),
      photoCount: uploadedPhotos.length,
      publishedAt: publishedAt || null,
      matchId: matchId, // Link to Supabase match
      coverImage: uploadedCoverImage ? {
        _key: uploadedCoverImage.public_id, // ✅ ADDED _key FOR SANITY
        _type: 'cloudinary.asset',
        public_id: uploadedCoverImage.public_id,
        secure_url: uploadedCoverImage.secure_url,
        width: uploadedCoverImage.width,
        height: uploadedCoverImage.height,
        format: uploadedCoverImage.format
      } : null,
      photos: uploadedPhotos.map(photo => ({
        _key: photo.public_id, // ✅ ADDED _key FOR SANITY
        _type: 'cloudinary.asset',
        public_id: photo.public_id,
        secure_url: photo.secure_url,
        width: photo.width,
        height: photo.height,
        format: photo.format
      })),
      seo: {
        metaTitle: seoMetaTitle?.trim() || null,
        metaDescription: seoMetaDescription?.trim() || null
      }
    };

    // Create gallery in Sanity
    const result = await sanityClient.create(galleryDoc);

    // Cross-system linking: Update Supabase match with Sanity gallery ID
    try {
      const { error: supabaseError } = await supabase
        .from('match')
        .update({ gallery_idsanity: result._id })
        .eq('id', matchId);
        
      if (supabaseError) {
        console.error('Supabase linking failed (gallery still created):', supabaseError);
      } else {
        console.log('Successfully linked match gallery to Supabase match:', matchId);
      }
    } catch (linkingError) {
      console.error('Cross-system linking error (gallery still created):', linkingError);
    }

    console.log('Created match gallery in Sanity:', result._id);
    console.log('Uploaded photos count:', uploadedPhotos.length);
    console.log('Cloudinary folder:', folderName);

    return NextResponse.json({
      success: true,
      message: 'Match gallery created successfully',
      galleryId: result._id,
      matchId: matchId,
      photoCount: uploadedPhotos.length,
      folderName: folderName
    });

  } catch (error) {
    console.error('POST match gallery error:', error);
    return NextResponse.json({ error: 'Failed to create match gallery' }, { status: 500 });
  }
}

// PUT: Update existing match gallery
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Match gallery ID is required' }, { status: 400 });
    }

    // Title validation if being updated
    if (updateData.title) {
      const titleWordCount = countWords(updateData.title);
      if (titleWordCount > 10) {
        return NextResponse.json({ error: 'Gallery title should be maximum 10 words' }, { status: 400 });
      }
      
      // Update slug
      updateData.slug = {
        current: updateData.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
      };
    }

    // Excerpt validation if being updated
    if (updateData.excerpt) {
      const excerptWordCount = countWords(updateData.excerpt);
      if (excerptWordCount > 20) {
        return NextResponse.json({ error: 'Description must be 20 words or less' }, { status: 400 });
      }
    }

    // Handle SEO fields
    if (updateData.seoMetaTitle || updateData.seoMetaDescription) {
      updateData.seo = {
        metaTitle: updateData.seoMetaTitle || null,
        metaDescription: updateData.seoMetaDescription || null
      };
      delete updateData.seoMetaTitle;
      delete updateData.seoMetaDescription;
    }

    // Update gallery in Sanity
    const result = await sanityClient
      .patch(id)
      .set(updateData)
      .commit();

    return NextResponse.json({
      success: true,
      message: 'Match gallery updated successfully',
      galleryId: result._id
    });

  } catch (error) {
    console.error('PUT match gallery error:', error);
    return NextResponse.json({ error: 'Failed to update match gallery' }, { status: 500 });
  }
}

// DELETE: Delete match gallery
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Match gallery ID is required' }, { status: 400 });
    }

    // Get the gallery to find the linked match before deletion
    const gallery = await sanityClient.getDocument(id);
    
    // Remove Supabase link when deleting
    if (gallery?.matchId) {
      try {
        const { error: supabaseError } = await supabase
          .from('match')
          .update({ gallery_idsanity: null })
          .eq('id', gallery.matchId);
          
        if (supabaseError) {
          console.error('Failed to remove Supabase link (deletion will continue):', supabaseError);
        } else {
          console.log('Successfully removed match gallery link from Supabase match:', gallery.matchId);
        }
      } catch (linkingError) {
        console.error('Cross-system unlinking error (deletion will continue):', linkingError);
      }
    }

    // Delete gallery from Sanity
    await sanityClient.delete(id);

    return NextResponse.json({
      success: true,
      message: 'Match gallery deleted successfully'
    });

  } catch (error) {
    console.error('DELETE match gallery error:', error);
    return NextResponse.json({ error: 'Failed to delete match gallery' }, { status: 500 });
  }
}