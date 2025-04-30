
# Banks o' Dee FC Website - Project Handover Document

This document provides key information for developers taking over the Banks o' Dee FC website project, particularly focused on the next phase of migrating to Next.js.

## Project Overview

The Banks o' Dee FC website is a sports club website that uses a hybrid data architecture:

- **Supabase**: For operational data (matches, players, league tables)
- **Sanity CMS**: For editorial content (news articles, rich content)
- **Cloudinary**: For media asset management
- **Frontend**: Currently React-based, transitioning to Next.js

## Completed Backend Infrastructure

### Cross-System Reference Resolution

We've implemented a standalone utility system that resolves references between Sanity CMS and Supabase:

- **Location**: `utils/cross-system/`
- **Core functionality**: Bidirectional reference resolution between systems
- **Key files**:
  - `resolveSupabaseReference.ts`: Resolves references from Sanity to Supabase
  - `resolveSanityReference.ts`: Resolves references from Supabase to Sanity
  - `cache.ts`: In-memory caching layer
  - Entity helpers: `player.ts`, `match.ts`, `sponsor.ts`

### Sanity Preview Functionality

A secure preview system for Sanity content that allows editors to review unpublished content:

- **Location**: `utils/sanity-preview/`
- **Core functionality**: Secure preview URLs, token validation, preview control
- **Key files**:
  - `validatePreviewSecret.ts`: Security validation for preview tokens
  - `previewController.ts`: Controls preview mode state
  - API handlers: `preview.ts`, `exit-preview.ts`, entity-specific handlers

### Cloudinary Integration

A comprehensive asset management system using Cloudinary:

- **Location**: `src/lib/cloudinary/` and `src/hooks/`
- **Core functionality**: Asset transformation, upload workflows, React hooks
- **Key files**:
  - `transform.ts`: Image transformation utilities
  - `upload.ts`: Upload parameter generators
  - `useCloudinaryImage.ts`: React hooks for Cloudinary

## Environment Variables

To set up the development environment, the following environment variables are required:

### Sanity CMS

```
SANITY_STUDIO_API_PROJECT_ID=your-project-id
SANITY_STUDIO_API_DATASET=production
SANITY_PREVIEW_SECRET=your-preview-secret
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
SANITY_WEBHOOK_SECRET=your-webhook-secret
```

### Supabase

```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_URL=your-db-connection-string
```

### Cloudinary

```
CLOUDINARY_CLOUD_NAME=dlkpaw2a0
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/banks-o-dee-fc/website.git
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env.local` file in the root directory
   - Add the environment variables listed above

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Set up Sanity Studio**
   ```bash
   cd sanity-studio
   npm install
   npm run dev
   ```

## Next.js Integration Path

### Integration Approach

The project is structured for easy migration to Next.js:

1. **App Router Structure**
   - Create a standard Next.js App Router project
   - Move components to `app/components`
   - Set up API routes in `app/api`

2. **Reference Resolution Integration**
   - Move `utils/cross-system` to the Next.js project
   - Use in Server Components for data fetching
   - Import in API routes for backend operations

3. **Preview System Integration**
   - Configure Next.js preview mode
   - Add preview API routes
   - Implement `setPreviewData` and `clearPreviewData`

4. **Cloudinary Integration**
   - Move `src/lib/cloudinary` to the Next.js project
   - Set up Image component with Cloudinary loader
   - Configure optimization settings

### Step-by-Step Migration Guide

1. **Create Next.js project**
   ```bash
   npx create-next-app banks-o-dee-next
   cd banks-o-dee-next
   ```

2. **Copy utilities**
   ```bash
   mkdir -p utils
   cp -r ../banks-o-dee/utils/cross-system utils/
   cp -r ../banks-o-dee/utils/sanity-preview utils/
   ```

3. **Set up Cloudinary**
   ```bash
   mkdir -p src/lib
   cp -r ../banks-o-dee/src/lib/cloudinary src/lib/
   ```

4. **Copy hooks**
   ```bash
   mkdir -p src/hooks
   cp -r ../banks-o-dee/src/hooks/useCloudinaryImage.ts src/hooks/
   cp -r ../banks-o-dee/src/hooks/useCloudinaryUpload.ts src/hooks/
   ```

5. **Configure preview API routes**
   ```bash
   mkdir -p app/api/preview
   # Create preview endpoints
   ```

## Potential Challenges and Mitigations

### 1. Data Consistency

**Challenge**: Ensuring consistent data references between systems.

**Mitigation**:
- Use the cross-system utilities consistently
- Implement data validation in API routes
- Add logging for reference resolution failures

### 2. Preview Performance

**Challenge**: Preview mode may introduce performance overhead.

**Mitigation**:
- Optimize preview data fetching
- Implement more aggressive caching for non-preview content
- Consider incremental static regeneration for published content

### 3. Asset Migration

**Challenge**: Ensuring all assets are properly migrated to Cloudinary.

**Mitigation**:
- Create a migration script for existing assets
- Implement fallback paths for missing assets
- Add monitoring for asset loading failures

### 4. Authentication Flow

**Challenge**: Integrating Supabase authentication with Next.js.

**Mitigation**:
- Use the Supabase Auth Helpers for Next.js
- Implement proper middleware for protected routes
- Add server-side session validation

## Contact Information

For questions or assistance with the project, contact:

- **Technical Lead**: [name@banksofdeefc.com]
- **Project Manager**: [manager@banksofdeefc.com]
- **Content Admin**: [content@banksofdeefc.com]

## Additional Resources

- [Project GitHub Repository](https://github.com/banks-o-dee-fc/website)
- [Technical Documentation](./docs/)
- [Sanity CMS Documentation](https://www.sanity.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
