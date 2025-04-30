
# Sanity Preview Guide for Banks o' Dee FC

This guide explains how to work with the Sanity preview functionality implemented for the Banks o' Dee FC website. It covers setup, usage, and integration with Next.js for content editors and developers.

## Overview

The Sanity preview system allows content editors to see how unpublished content will appear before it goes live. This implementation is designed to:

1. Provide a secure preview environment
2. Support multiple content types (news, players, sponsors)
3. Integrate seamlessly with the existing Sanity Studio
4. Prepare for future Next.js implementation

## For Content Editors

### How to Use Preview Mode

1. **In Sanity Studio**: Open any document you're editing
2. **Click the "Preview" button**: Located in the top-right of the document editor
3. **View the preview**: A new browser tab will open showing your content as it would appear on the website
4. **Exit preview mode**: Close the tab or click "Exit Preview" in the preview banner

### Preview Content Types

The following content types support preview:

- **News Articles**: Preview full article layout with images and content blocks
- **Player Profiles**: Preview player details and statistics
- **Sponsor Pages**: Preview sponsor information and placements

### Best Practices

- Preview is most useful after making significant changes
- Remember that some relationships (like related content) may show published versions in preview
- Images uploaded but not published will appear in preview
- If preview looks incorrect, save your changes and try again

## For Developers

### Setup and Configuration

#### Environment Variables

Create a `.env.local` file in your project root with:

```
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
SANITY_PREVIEW_SECRET=your-secure-random-string
```

#### Preview Secret Generation

For security, generate a random string for your preview secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Preview Architecture

The preview system consists of these key components:

1. **Secret Validation**: `validatePreviewSecret.ts` - Validates incoming preview requests
2. **Preview Controller**: `previewController.ts` - Manages preview state
3. **Preview API Handlers**: Handle content-specific preview requests
4. **Sanity Studio Integration**: `resolveProductionUrl.js` - Generates preview URLs

### Preview Flow

1. Editor clicks "Preview" in Sanity Studio
2. `resolveProductionUrl.js` generates a preview URL with authentication token
3. Browser opens the preview URL
4. Preview API validates the token and fetches draft content
5. Content is displayed with a preview banner
6. Editor can exit preview mode via the banner

### Next.js Integration

When integrating with Next.js, follow these steps:

1. **Configure Preview API Routes**:

```typescript
// app/api/preview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validatePreviewSecret } from '@/utils/sanity-preview/validatePreviewSecret';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const documentId = searchParams.get('id');
  const slug = searchParams.get('slug');

  // Validate the preview request
  if (!secret || !validatePreviewSecret({ query: { secret } }, process.env.SANITY_PREVIEW_SECRET!)) {
    return NextResponse.json({ message: 'Invalid preview secret' }, { status: 401 });
  }

  // Enable preview mode
  const response = NextResponse.redirect(new URL(slug || '/', request.url));
  
  // Set cookies
  response.cookies.set('sanity-preview', 'true', { path: '/' });
  response.cookies.set('sanity-document-id', documentId || '', { path: '/' });
  
  return response;
}
```

2. **Configure Exit Preview API Route**:

```typescript
// app/api/exit-preview/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the path to redirect to after exiting preview
  const path = request.nextUrl.searchParams.get('path') || '/';
  
  // Create response with redirect
  const response = NextResponse.redirect(new URL(path, request.url));
  
  // Clear preview cookies
  response.cookies.delete('sanity-preview');
  response.cookies.delete('sanity-document-id');
  
  return response;
}
```

3. **Create Preview Components**:

```tsx
// components/PreviewBanner.tsx
'use client';

export default function PreviewBanner({ path }: { path: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-2 flex justify-between z-50">
      <span>Preview Mode</span>
      <a 
        href={`/api/exit-preview?path=${encodeURIComponent(path)}`}
        className="underline"
      >
        Exit Preview
      </a>
    </div>
  );
}
```

4. **Add Preview Provider to Layout**:

```tsx
// app/layout.tsx
import { cookies } from 'next/headers';
import PreviewBanner from '@/components/PreviewBanner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const isPreview = cookieStore.get('sanity-preview')?.value === 'true';
  
  return (
    <html lang="en">
      <body>
        {children}
        {isPreview && <PreviewBanner path={'/your-current-path'} />}
      </body>
    </html>
  );
}
```

5. **Fetch Draft Content in Pages**:

```tsx
// app/news/[slug]/page.tsx
import { getNewsArticle } from '@/utils/sanity-client';
import { cookies } from 'next/headers';

export default async function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const isPreview = cookieStore.get('sanity-preview')?.value === 'true';
  
  const article = await getNewsArticle(params.slug, isPreview);
  
  if (!article) {
    return <div>Article not found</div>;
  }
  
  return (
    <article>
      <h1>{article.title}</h1>
      {/* Article content */}
    </article>
  );
}
```

### Troubleshooting

If preview isn't working correctly, check these common issues:

1. **Preview URL is incorrect**: Verify `SANITY_STUDIO_PREVIEW_URL` points to your development or staging environment
2. **Secret mismatch**: Ensure the secret in `.env.local` matches the one in Sanity Studio
3. **Missing document ID or slug**: Check that these are being passed correctly in the URL
4. **CORS issues**: Ensure your preview environment allows requests from Sanity Studio
5. **Content not refreshing**: Clear browser cookies and try again

### Security Considerations

- The preview secret should be a secure random string
- Never expose the preview secret in client-side code
- All preview requests should validate the secret
- Preview mode should only be available in development and staging environments
