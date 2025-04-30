
# Sanity Preview System

This module provides utilities for implementing Sanity CMS preview functionality for the Banks o' Dee FC website.

## Overview

The Sanity Preview System allows content editors to preview unpublished content before it goes live on the website. It includes:

- Secure token-based authentication
- Preview API for different content types
- Preview mode control utilities
- Integration with Sanity Studio

## Directory Structure

```
utils/sanity-preview/
├── README.md                  # This documentation file
├── validatePreviewSecret.ts   # Secret validation utility
├── previewController.ts       # Preview mode controller
├── index.ts                   # Main entry point
└── api/                       # API handlers
    ├── preview.ts             # Main preview handler
    ├── exit-preview.ts        # Exit preview handler
    ├── news.ts                # News article preview
    ├── player.ts              # Player profile preview
    └── sponsor.ts             # Sponsor preview
```

## Environment Variables

This system requires the following environment variables:

```
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
SANITY_PREVIEW_SECRET=your-secure-random-string
```

## Usage

### Validating Preview Requests

```typescript
import { validatePreviewSecret } from 'utils/sanity-preview';

// In an API handler
function previewHandler(req, res) {
  if (!validatePreviewSecret(req, process.env.SANITY_PREVIEW_SECRET)) {
    return res.status(401).json({ message: 'Invalid preview token' });
  }
  
  // Continue with preview handling
}
```

### Enabling Preview Mode

```typescript
import { enablePreviewMode } from 'utils/sanity-preview';

// In an API handler
async function enterPreviewMode(req, res) {
  const previewData = enablePreviewMode(req, process.env.SANITY_PREVIEW_SECRET);
  
  if (!previewData) {
    return res.status(401).json({ message: 'Invalid preview request' });
  }
  
  // In Next.js, you would set preview data
  // res.setPreviewData(previewData);
  
  // Redirect to the preview page
  res.redirect(req.query.slug || '/');
}
```

### Disabling Preview Mode

```typescript
import { disablePreviewMode } from 'utils/sanity-preview';

// In an API handler
function exitPreviewMode(req, res) {
  disablePreviewMode();
  
  // In Next.js, you would clear preview data
  // res.clearPreviewData();
  
  // Redirect back to the page
  res.redirect(req.query.slug || '/');
}
```

### Content Type-Specific Preview

```typescript
import { newsPreviewHandler } from 'utils/sanity-preview/api/news';

// In a news article preview handler
async function previewNewsArticle(req, res) {
  await newsPreviewHandler(req, res);
}
```

## Integration with Sanity Studio

Add this to your Sanity Studio configuration:

```javascript
// sanity-studio/resolveProductionUrl.js
export default function resolveProductionUrl(document) {
  const previewSecret = process.env.SANITY_PREVIEW_SECRET;
  const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';
  
  let path;
  
  if (document._type === 'newsArticle') {
    path = `/api/preview?secret=${previewSecret}&id=${document._id}&slug=/news/${document.slug.current}`;
  } else if (document._type === 'playerProfile') {
    path = `/api/preview?secret=${previewSecret}&id=${document._id}&slug=/players/${document.supabaseId}`;
  } else if (document._type === 'sponsor') {
    path = `/api/preview?secret=${previewSecret}&id=${document._id}&slug=/sponsors/${document.supabaseId}`;
  } else {
    return '';
  }
  
  return `${previewUrl}${path}`;
}
```

## Next.js Integration

In a Next.js application, implement these API routes:

```typescript
// pages/api/preview.js
export default async function preview(req, res) {
  // Validate the preview request
  if (!validatePreviewSecret(req, process.env.SANITY_PREVIEW_SECRET)) {
    return res.status(401).json({ message: 'Invalid preview token' });
  }
  
  // Enable preview mode with the data
  res.setPreviewData({
    documentId: req.query.id,
    slug: req.query.slug,
  });
  
  // Redirect to the path
  res.redirect(req.query.slug || '/');
}
```

```typescript
// pages/api/exit-preview.js
export default async function exitPreview(req, res) {
  // Exit preview mode
  res.clearPreviewData();
  
  // Redirect to the path
  res.redirect(req.query.slug || '/');
}
```

## Security Considerations

- Always validate the preview token with `validatePreviewSecret`
- Generate a strong random preview secret
- Store the preview secret in environment variables
- Only enable preview mode for authenticated users in Sanity Studio
- Preview tokens should have a limited lifetime

## Error Handling

The preview system includes comprehensive error handling:

- Invalid preview secrets return 401 Unauthorized responses
- Missing documents return 404 Not Found responses
- API errors return 500 Internal Server Error responses

## Performance Considerations

- Preview mode may bypass caching mechanisms
- Consider implementing a separate caching strategy for preview content
- Monitor performance differences between preview and published content

## Further Documentation

- [Sanity Preview Documentation](https://www.sanity.io/docs/preview-content-on-site)
- [Next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
