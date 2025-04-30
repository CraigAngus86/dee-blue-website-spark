
# Sanity Preview System

This module provides utilities for implementing a preview system for Sanity CMS content. The preview system allows editors to preview unpublished content before making it live.

## Architecture

The preview system consists of several components:

1. **Sanity Studio Configuration**: Sets up preview URLs and UI in the Studio
2. **Preview Authentication**: Validates preview requests using a secret
3. **Preview Data Handling**: Manages preview session data
4. **API Handlers**: Handle preview requests for different content types
5. **Preview UI Components**: Enhance the editor experience

## Setup

### 1. Environment Configuration

Create a `.env.local` file in your project root with the following values:

```
SANITY_PREVIEW_SECRET=your-secret-key-here
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
```

Replace `your-secret-key-here` with a secure random string.

### 2. Sanity Studio Configuration

The `resolveProductionUrl.js` file in the Sanity Studio configuration is already set up to generate preview URLs with proper authentication. It handles different document types (news articles, player profiles, etc.) and passes the appropriate parameters.

### 3. Preview Secret Handling

The `validatePreviewSecret.ts` utility securely validates preview requests against a known secret.

## Usage

### For Content Editors

1. In Sanity Studio, open the document you wish to preview
2. Click on the "Preview" tab in the editor panel
3. The preview pane will show a preview of how the content will appear on the site
4. Use the preview controls to exit preview mode when finished

### For Developers

#### Entering Preview Mode

```typescript
import { enablePreviewMode } from 'utils/sanity-preview';

// In a Next.js API route handler
export default function preview(req, res) {
  const previewSecret = process.env.SANITY_PREVIEW_SECRET;
  const previewData = enablePreviewMode(req, previewSecret);
  
  if (!previewData) {
    return res.status(401).json({ message: 'Invalid preview secret' });
  }
  
  // Set preview data in cookies (Next.js specific)
  res.setPreviewData(previewData);
  
  // Redirect to the content
  res.redirect(req.query.slug || '/');
}
```

#### Exiting Preview Mode

```typescript
import { disablePreviewMode } from 'utils/sanity-preview';

// In a Next.js API route handler
export default function exitPreview(req, res) {
  disablePreviewMode();
  
  // Clear preview data from cookies (Next.js specific)
  res.clearPreviewData();
  
  // Redirect back to the content
  res.redirect(req.query.slug || '/');
}
```

#### Checking Preview Mode

```typescript
import { isPreviewModeActive } from 'utils/sanity-preview';

// In a page component or middleware
function MyPage({ preview }) {
  if (preview) {
    // Show preview indicator
  }
  
  // Render page content
}

// Get server-side props (Next.js specific)
export async function getServerSideProps({ preview }) {
  return {
    props: {
      preview: !!preview
    }
  };
}
```

## Integration with Next.js

This preview system is designed to be integrated with Next.js in the future. The API handlers and utilities provided here can be used directly in Next.js API routes and server-side rendering functions.

### API Routes for Next.js

Create the following API routes in your Next.js project:

1. `/api/preview`: Main entry point for previews
2. `/api/exit-preview`: Exit preview mode
3. `/api/preview/news`: News article preview handler
4. `/api/preview/player`: Player profile preview handler
5. `/api/preview/sponsor`: Sponsor preview handler

The implementation for these routes is provided in the `/api` subdirectory.

## Security Considerations

- The preview secret should be a secure random string
- Always validate the preview secret before entering preview mode
- Use HTTPS for all preview requests
- Implement rate limiting for preview endpoints
- Consider using short-lived preview sessions

## Customization

You can customize the preview system by modifying the following:

- `resolveProductionUrl.js`: Change how preview URLs are generated
- `preview.js`: Customize the preview UI in Sanity Studio
- API handlers: Modify how content is fetched for preview

## Troubleshooting

Common issues:

1. **Preview URLs not working**: Check that `SANITY_STUDIO_PREVIEW_URL` is set correctly in Sanity Studio
2. **Invalid secret errors**: Ensure the same secret is used in both Sanity Studio and your API routes
3. **Content not found**: Verify that the content query is correct and handles draft content

## References

- [Sanity Preview Documentation](https://www.sanity.io/docs/preview-content-on-site)
- [Next.js Preview Mode Documentation](https://nextjs.org/docs/advanced-features/preview-mode)
