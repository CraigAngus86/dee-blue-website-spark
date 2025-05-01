
# Banks o' Dee FC Website Architecture

## System Overview

The Banks o' Dee FC website is built using a hybrid architecture that combines structured data from Supabase with editorial content from Sanity CMS, integrated into a React-based frontend transitioning to Next.js. This multi-system approach provides both operational efficiency and content flexibility.

## Core Architecture Components

### 1. Data Management Systems

#### Supabase (Operational Database)
- **Primary role**: Handles structured data, authentication, and operational aspects
- **Data stored**: Match data, team information, league tables, user accounts, etc.
- **Key features**: Real-time updates, row-level security, authentication

#### Sanity CMS (Content Management)
- **Primary role**: Provides flexible content management for editorial staff
- **Data stored**: News articles, rich media content, player profiles, etc.
- **Key features**: Content versioning, previews, draft/publish workflow

### 2. Cross-System Reference Resolution

A key architectural feature is the reference resolution system that maintains relationships between entities across both systems:

- **Supabase → Sanity**: Uses `sanity_id` fields in Supabase tables
- **Sanity → Supabase**: Uses `supabaseId` fields in Sanity documents

This bi-directional reference system allows data to be maintained in its optimal location while preserving relationships.

### 3. Content Preview System

The preview system allows content editors to view unpublished Sanity content before it goes live:

- **Authentication**: Secure token-based preview access
- **Preview API**: Structured endpoints for different content types
- **Preview Control**: Utilities for entering/exiting preview mode
- **UI Components**: Visual indicators for preview state

### 4. Asset Management with Cloudinary

Media assets are managed through Cloudinary:

- **Structured organization**: Folder hierarchy based on content type
- **Transformation presets**: Standard image processing operations
- **Bi-directional integration**: Connected to both Sanity and the frontend

## Data Flow Architecture

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Supabase  │◄─────►│   Frontend  │◄─────►│  Sanity CMS │
└─────┬───────┘       └──────┬──────┘       └─────┬───────┘
      │                      │                    │
      │                      ▼                    │
      │               ┌─────────────┐             │
      └───────────────► Cross-System ◄─────────────┘
                      │  Reference  │
                      │ Resolution  │
                      └─────────────┘
                            │
                            ▼
                      ┌─────────────┐
                      │  Cloudinary │
                      │    Assets   │
                      └─────────────┘
```

## Directory Structure

```
/
├── src/                       # Frontend application code
│   ├── components/            # React components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Shared utilities
│   │   ├── cloudinary/        # Cloudinary integration
│   │   └── ...
│   └── ...
├── utils/                     # Backend utilities
│   ├── cross-system/          # Cross-system reference resolution
│   ├── sanity-preview/        # Sanity preview utilities
│   └── ...
├── sanity-studio/             # Sanity CMS configuration
│   ├── schemas/               # Content models
│   ├── preview.js             # Preview configuration
│   └── ...
└── docs/                      # Project documentation
```

## Technical Decisions

### 1. Reference Resolution Strategy

We implemented a modular approach to reference resolution with these key features:

- **Entity-specific helpers**: Specialized functions for common entities
- **Caching layer**: Performance optimization with time-based expiration
- **Error handling**: Comprehensive error management strategies
- **Type safety**: Full TypeScript type checking

### 2. Preview System Architecture

The preview system uses a token-based approach:

1. **Secret validation**: Secure token verification
2. **Dynamic URL generation**: Content-type specific preview URLs
3. **Isolated preview environment**: Separate from production
4. **Future Next.js integration**: Structured for easy adoption

### 3. Performance Considerations

- **In-memory caching**: Reduces redundant database queries
- **Optimized asset delivery**: Cloudinary transformation pipeline
- **Selective loading**: Only fetch related content when needed

## Integration with Next.js

The current implementation is designed for seamless integration with Next.js:

### Server Components

Cross-system utilities can be directly used in Server Components:

```typescript
// Example Next.js Server Component
export default async function PlayerProfile({ id }) {
  const { player, profile } = await getPlayerWithProfile(id);
  return <PlayerProfileComponent player={player} profile={profile} />;
}
```

### API Routes

Preview functionality is structured as API route handlers:

```typescript
// Example Next.js API route
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const documentId = searchParams.get('id');
  
  if (!validatePreviewSecret(request, process.env.PREVIEW_SECRET)) {
    return new Response(JSON.stringify({ message: 'Invalid secret' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Process preview request...
}
```

## Error Handling Strategy

The architecture implements a comprehensive error handling approach:

1. **Graceful degradation**: Fall back to available data when relationships fail
2. **Informative logging**: Detailed error information for debugging
3. **User feedback**: Clear messaging for content editors
4. **Typed returns**: Null or empty arrays for missing data

## Security Considerations

- **Environment variables**: Secrets stored as environment variables
- **Token validation**: Secure preview access
- **Access control**: Row-level security in Supabase
- **API protection**: Authenticated endpoints

## Future Considerations

1. **Persistent caching**: Replace in-memory cache with Redis
2. **Webhook integration**: Real-time cache invalidation
3. **Batch operations**: Optimize reference resolution
4. **Enhanced preview**: Visual diff comparisons
