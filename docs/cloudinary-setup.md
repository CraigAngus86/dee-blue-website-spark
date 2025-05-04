
# Cloudinary Setup Guide for Banks o' Dee FC

This guide explains how to set up and verify your Cloudinary configuration for the Banks o' Dee FC website.

## Prerequisites
- Cloudinary account (free tier is sufficient for development)
- Access to Cloudinary dashboard

## 1. Create a Cloudinary account
If you don't already have one, sign up at [cloudinary.com](https://cloudinary.com/users/register/free)

## 2. Get your Cloudinary credentials
From your Cloudinary dashboard, locate:
- Cloud Name: `dlkpaw2a0`
- API Key
- API Secret

## 3. Configure upload presets
Upload presets help control the upload parameters. Create these presets in your Cloudinary dashboard:

1. Go to Settings > Upload
2. Click "Add upload preset"
3. Create the following presets:
   - `player-upload` - For player profile images
   - `news-upload` - For news article images
   - `match-gallery-upload` - For match photos
   - `sponsor-upload` - For sponsor logos
   - `stadium-upload` - For stadium images
   - `banks-o-dee` - Default preset for other uploads

For each preset, configure:
- Set "Signing Mode" to "Unsigned" for development (change to signed for production)
- Enable "Use filename or externally defined public ID" option
- Set folder to corresponding folders (e.g., `banksofdeefc/news/`)
- Enable auto-tagging and categorization if desired

## 4. Folder Structure
Our application uses the following Cloudinary folder structure:
```
banksofdeefc/ (main folder)
  ├── news/ (with article-{id} subfolders)
  ├── people/
  │     ├── person-{id}/ (player images)
  │     └── staff/ (staff images)
  ├── matches/
  │     ├── match-{id}/gallery/ (match photos)
  ├── stadium/ (stadium images)
  ├── sponsors/ (with sponsor-{id} subfolders)
  └── other/ (miscellaneous images)
```

## 5. Environment Variables
Make sure these environment variables are set in your application:

For Next.js:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dlkpaw2a0
CLOUDINARY_API_KEY=336893478695244
CLOUDINARY_API_SECRET=AUF4vnt0LCLEZdy6J4jv3L3081o
```

For Sanity Studio:
```
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=dlkpaw2a0
CLOUDINARY_API_KEY=336893478695244
CLOUDINARY_API_SECRET=AUF4vnt0LCLEZdy6J4jv3L3081o
```

## 6. Verify Setup
To verify your Cloudinary setup:
1. Go to your Cloudinary Media Library
2. Create the main folders manually if they don't exist
3. Try uploading a test image using the application
4. Check that it appears in the correct folder with appropriate metadata

## Troubleshooting
- If uploads fail, check the browser console for error messages
- Verify API keys and secrets are correctly set
- Check network tab for API response details
- Ensure the upload presets are properly configured
- Look at the server logs for backend errors

## Additional Configuration
- Enable auto-tagging or AI content analysis in Cloudinary if desired
- Set up image transformations for responsive images
- Configure image optimization settings
