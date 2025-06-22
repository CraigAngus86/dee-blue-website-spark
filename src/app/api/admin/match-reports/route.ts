import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Function to count words properly (from news API)
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Rich text conversion helpers (simplified for match reports - no body content)
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

// Cloudinary upload function (copy from news API)
async function uploadImageToCloudinary(imageFile: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'news-upload');
    formData.append('folder', 'banksodeefc/news');
    
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
    console.error('Failed to upload image:', error);
    throw new Error('Failed to upload image');
  }
}

// GET: Single article by ID OR paginated articles with filtering (MATCH REPORTS ONLY)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // SINGLE ARTICLE FETCHING (for EDIT mode)
    if (id) {
      const article = await sanityClient.getDocument(id);

      if (!article) {
        return NextResponse.json({ error: 'Match report not found' }, { status: 404 });
      }

      // Return editable article data
      const editableArticle = {
        ...article,
        seoMetaTitle: article.seo?.metaTitle || '',
        seoMetaDescription: article.seo?.metaDescription || ''
      };

      return NextResponse.json({
        success: true,
        articles: [editableArticle],
        pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasMore: false }
      });
    }

    // PAGINATED ARTICLES FETCHING (for table view) - MATCH REPORTS ONLY
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '25');
    const status = searchParams.get('status');
    const dateRange = searchParams.get('dateRange');

    // Build GROQ query with filters - ONLY MATCH REPORTS
    let filters = ['category == "matchReport"']; // ONLY MATCH REPORTS
    
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
    const baseQuery = `*[_type == "newsArticle"${filterString}]`;
    
    // Get total count
    const total = await sanityClient.fetch(`count(${baseQuery})`);
    
    // Get paginated results
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const articles = await sanityClient.fetch(
      `${baseQuery} | order(publishedAt desc, _createdAt desc)[${from}...${to}]`
    );

    return NextResponse.json({
      success: true,
      articles: articles || [],
      pagination: {
        page,
        pageSize,
        total: total || 0,
        totalPages: Math.ceil((total || 0) / pageSize),
        hasMore: total ? total > page * pageSize : false
      }
    });

  } catch (error) {
    console.error('GET match reports error:', error);
    return NextResponse.json({ error: 'Failed to fetch match reports' }, { status: 500 });
  }
}

// POST: Create new match report
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const matchId = formData.get('matchId') as string;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const excerpt = formData.get('excerpt') as string;
    const publishedAt = formData.get('publishedAt') as string;
    const seoMetaTitle = formData.get('seoMetaTitle') as string;
    const seoMetaDescription = formData.get('seoMetaDescription') as string;
    const mainImageFile = formData.get('mainImage') as File;

    // Validation
    if (!matchId?.trim()) {
      return NextResponse.json({ error: 'Match selection is required' }, { status: 400 });
    }

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Report headline is required' }, { status: 400 });
    }

    // Title word count validation (max 10 words)
    const titleWordCount = countWords(title);
    if (titleWordCount > 10) {
      return NextResponse.json({ error: 'Headline should be maximum 10 words' }, { status: 400 });
    }

    if (!author?.trim()) {
      return NextResponse.json({ error: 'Author is required' }, { status: 400 });
    }

    if (!excerpt?.trim()) {
      return NextResponse.json({ error: 'Report summary is required' }, { status: 400 });
    }

    // Excerpt word count validation (max 20 words)
    const excerptWordCount = countWords(excerpt);
    if (excerptWordCount > 20) {
      return NextResponse.json({ error: 'Summary must be 20 words or less' }, { status: 400 });
    }

    // Main image is required for match reports
    if (!mainImageFile || mainImageFile.size === 0) {
      return NextResponse.json({ error: 'Main image is required for match reports' }, { status: 400 });
    }

    // Handle image upload
    let uploadedImage = null;
    if (mainImageFile && mainImageFile.size > 0) {
      // Validate image
      if (mainImageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Image too large. Maximum 5MB.' }, { status: 400 });
      }
      
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(mainImageFile.type)) {
        return NextResponse.json({ error: 'Invalid image format. Use JPG or PNG.' }, { status: 400 });
      }

      try {
        uploadedImage = await uploadImageToCloudinary(mainImageFile);
      } catch (error) {
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
      }
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Prepare document for Sanity
    const articleDoc = {
      _type: 'newsArticle',
      title: title.trim(),
      slug: { current: slug },
      category: 'matchReport', // Auto-set category
      author: author.trim(),
      excerpt: excerpt.trim(),
      body: textToBlocks(''), // Empty body for match reports
      publishedAt: publishedAt || null,
      matchId: matchId, // Link to Supabase match
      mainImage: uploadedImage ? {
        _type: 'cloudinary.asset',
        public_id: uploadedImage.public_id,
        secure_url: uploadedImage.secure_url,
        width: uploadedImage.width,
        height: uploadedImage.height,
        format: uploadedImage.format
      } : null,
      seo: {
        metaTitle: seoMetaTitle?.trim() || null,
        metaDescription: seoMetaDescription?.trim() || null
      }
    };

    // Create article in Sanity
    const result = await sanityClient.create(articleDoc);

    // Cross-system linking: Update Supabase match with Sanity ID
    try {
      const { error: supabaseError } = await supabase
        .from('match')
        .update({ match_report_link: result._id })
        .eq('id', matchId);
        
      if (supabaseError) {
        console.error('Supabase linking failed (article still created):', supabaseError);
      } else {
        console.log('Successfully linked match report to Supabase match:', matchId);
      }
    } catch (linkingError) {
      console.error('Cross-system linking error (article still created):', linkingError);
    }

    console.log('Created match report in Sanity:', result._id);
    console.log('Match ID for linking:', matchId);

    return NextResponse.json({
      success: true,
      message: 'Match report created successfully',
      articleId: result._id,
      matchId: matchId
    });

  } catch (error) {
    console.error('POST match report error:', error);
    return NextResponse.json({ error: 'Failed to create match report' }, { status: 500 });
  }
}

// PUT: Update existing match report - NOW USES FORMDATA
export async function PUT(request: NextRequest) {
  console.log('PUT /api/admin/match-reports called');
  try {
    // CHANGE: Use FormData instead of JSON (like POST method)
    const formData = await request.formData();
    console.log('PUT FormData received');
    
    // Extract ID and fields (same pattern as POST)
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const excerpt = formData.get('excerpt') as string;
    const publishedAt = formData.get('publishedAt') as string;
    const seoMetaTitle = formData.get('seoMetaTitle') as string;
    const seoMetaDescription = formData.get('seoMetaDescription') as string;
    const mainImageFile = formData.get('mainImage') as File;

    console.log('Extracted fields:', { id, title, author });

    if (!id) {
      return NextResponse.json({ error: 'Match report ID is required' }, { status: 400 });
    }

    // Prepare update object
    let updateData: any = {};

    // Title validation and update
    if (title && title.trim()) {
      const titleWordCount = countWords(title);
      if (titleWordCount > 10) {
        return NextResponse.json({ error: 'Headline should be maximum 10 words' }, { status: 400 });
      }
      
      updateData.title = title.trim();
      updateData.slug = {
        current: title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
      };
    }

    // Other field updates
    if (author && author.trim()) updateData.author = author.trim();
    if (publishedAt !== undefined) updateData.publishedAt = publishedAt || null;

    // Excerpt validation and update
    if (excerpt && excerpt.trim()) {
      const excerptWordCount = countWords(excerpt);
      if (excerptWordCount > 20) {
        return NextResponse.json({ error: 'Summary must be 20 words or less' }, { status: 400 });
      }
      updateData.excerpt = excerpt.trim();
    }

    // Handle new image upload if provided
    if (mainImageFile && mainImageFile.size > 0) {
      // Validate image
      if (mainImageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Image too large. Maximum 5MB.' }, { status: 400 });
      }
      
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(mainImageFile.type)) {
        return NextResponse.json({ error: 'Invalid image format. Use JPG or PNG.' }, { status: 400 });
      }

      try {
        const uploadedImage = await uploadImageToCloudinary(mainImageFile);
        updateData.mainImage = {
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

    // Handle SEO fields
    if (seoMetaTitle !== undefined || seoMetaDescription !== undefined) {
      updateData.seo = {
        metaTitle: seoMetaTitle?.trim() || null,
        metaDescription: seoMetaDescription?.trim() || null
      };
    }

    // Ensure category remains matchReport
    updateData.category = 'matchReport';

    console.log('About to update Sanity with:', updateData);

    // Update article in Sanity
    const result = await sanityClient
      .patch(id)
      .set(updateData)
      .commit();

    console.log('Sanity update successful:', result._id);

    return NextResponse.json({
      success: true,
      message: 'Match report updated successfully',
      articleId: result._id
    });

  } catch (error) {
    console.error('PUT match report error details:', error);
    return NextResponse.json({ error: 'Failed to update match report' }, { status: 500 });
  }
}

// DELETE: Delete match report
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Match report ID is required' }, { status: 400 });
    }

    // Get the article to find the linked match before deletion
    const article = await sanityClient.getDocument(id);
    
    // Remove Supabase link when deleting
    if (article?.matchId) {
      try {
        const { error: supabaseError } = await supabase
          .from('match')
          .update({ match_report_link: null })
          .eq('id', article.matchId);
          
        if (supabaseError) {
          console.error('Failed to remove Supabase link (deletion will continue):', supabaseError);
        } else {
          console.log('Successfully removed match report link from Supabase match:', article.matchId);
        }
      } catch (linkingError) {
        console.error('Cross-system unlinking error (deletion will continue):', linkingError);
      }
    }

    // Delete article from Sanity
    await sanityClient.delete(id);

    return NextResponse.json({
      success: true,
      message: 'Match report deleted successfully'
    });

  } catch (error) {
    console.error('DELETE match report error:', error);
    return NextResponse.json({ error: 'Failed to delete match report' }, { status: 500 });
  }
}
