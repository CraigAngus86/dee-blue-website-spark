
# Cloudinary Integration Guide for Banks o' Dee FC

This guide explains how image uploads with Cloudinary are implemented across the application, especially how Sanity Studio integration works.

## Architecture Overview

Our Cloudinary integration follows a consistent approach for all uploads:

1. **Client-side uploads** (from React components) use the `useCloudinaryUpload` hook
2. **Sanity Studio uploads** use the customized cloudinary-asset-source plugin
3. **Both approaches** call the same server API endpoint: `/api/cloudinary/upload`

This ensures all uploads are processed consistently and follow the same organization structure in Cloudinary.

## Upload Flow

### Direct Uploads (React Components)

1. User selects a file in a component using `useCloudinaryUpload` hook
2. File is sent to `/api/cloudinary/upload` as FormData with metadata
3. Server uploads to Cloudinary using server-side SDK
4. Result is returned to client with image URLs and metadata

### Sanity Studio Uploads

1. User selects an image in Sanity Studio
2. Customized cloudinary-asset-source plugin intercepts the upload
3. File is sent to our `/api/cloudinary/upload` endpoint with document context
4. Server uploads to Cloudinary using server-side SDK
5. URL and metadata are stored in Sanity document

## Folder Structure

Images are organized in Cloudinary according to content type and entity ID:

- News: `banksofdeefc/news/article-{id}`
- Players: `banksofdeefc/people/person-{id}`
- Matches: `banksofdeefc/matches/match-{id}`
- Sponsors: `banksofdeefc/sponsors/sponsor-{id}`
- Stadium: `banksofdeefc/stadium`

## Configuration Requirements

For uploads to work properly, these environment variables must be set:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dlkpaw2a0
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

The `NEXT_PUBLIC_` prefix makes the cloud name available to browser code, while the API key and secret are only used server-side.

## Troubleshooting

### Common Issues

1. **Upload fails silently**
   - Check browser console for errors
   - Verify network requests in developer tools
   - Ensure API route is returning proper responses

2. **Images not showing up in Cloudinary**
   - Check server logs for upload errors
   - Verify API key and secret are correctly set
   - Test direct upload with the `/test-cloudinary` page

3. **CORS errors**
   - Ensure Cloudinary CORS settings include your domain
   - Check that the upload is going through your API route, not directly to Cloudinary

4. **Sanity Studio upload issues**
   - Check that customUploadEndpoint is correctly set in plugin config
   - Verify plugin is receiving and passing the right metadata
   - Test with simple image files first

### Debug Steps

1. Enable verbose logging in the Sanity Cloudinary plugin
2. Check server logs during upload attempts
3. Test uploads outside Sanity using the test page
4. Verify Cloudinary dashboard for successful uploads
