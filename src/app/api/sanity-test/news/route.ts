import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

export async function GET(request: Request) {
  // Check for slug parameter in query string
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  try {
    // If a slug is provided, fetch a single article
    if (slug) {
      // Query for a specific article by slug with complete data
      const query = `*[_type == "newsArticle" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        category,
        excerpt,
        mainImage,
        author,
        body,
        featured,
        isFeature,
        "relatedPlayers": relatedPlayers[]-> {
          "_id": _id,
          "name": name,
          "slug": slug.current,
          "profileImage": profileImage
        },
        gallery
      }`;
      
      const article = await sanityClient.fetch(query, { slug });
      
      if (!article) {
        return NextResponse.json({ 
          success: false, 
          error: "Article not found" 
        }, { status: 404 });
      }
      
      // Return the formatted article
      return NextResponse.json({
        success: true,
        data: {
          id: article._id,
          title: article.title,
          slug: article.slug,
          publishedAt: article.publishedAt,
          category: article.category || 'clubNews',
          mainImage: article.mainImage,
          excerpt: article.excerpt,
          body: article.body,
          author: article.author,
          isFeature: article.featured || article.isFeature || false,
          relatedPlayers: article.relatedPlayers,
          gallery: article.gallery
        }
      });
    } 
    // If no slug, return multiple articles (original behavior)
    else {
      // Query for news articles including mainImage
      const query = `*[_type == "newsArticle"][0..9] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        category,
        excerpt,
        mainImage,
        author
      }`;
      
      const data = await sanityClient.fetch(query);
      
      return NextResponse.json({
        success: true,
        data,
        notes: "This endpoint shows raw data from Sanity for debugging Cloudinary integration"
      });
    }
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
