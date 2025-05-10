# Data Responsibility and Source of Truth

This document defines which system is the source of truth for different types of data in the Banks o' Dee FC website.

## Sanity CMS (Source of Truth)

Sanity CMS is the source of truth for content-focused, editorial data:

- **Team Members**
  - Player profiles
  - Staff profiles
  - Player biographies
  - Profile metadata

- **News & Editorial**
  - All news articles (across different categories)
  - Match reports
  - Club announcements
  - News metadata

- **Stadium & Club**
  - Stadium information
  - Club history
  - About pages
  - Facility details

- **Fan Engagement Content**
  - Fan of the Month features
  - Approved user-generated content metadata
  - Fan gallery curation and moderation
  - Poll results and management

- **Commercial**
  - Sponsor information
  - Partnership details
  - Commercial packages descriptions

## Supabase (Source of Truth)

Supabase is the source of truth for operational, transaction-critical data:

- **Matches & Competitions**
  - Fixtures
  - Results
  - Competitions
  - League tables
  - Seasons

- **Bookings Reference Data**
  - Transaction records (minimal data)
  - Simple booking status tracking

## Cloudinary (Source of Truth)

Cloudinary is the source of truth for all media assets:

- **Player/Staff Images**
  - Profile photos
  - Action shots
  - Integrated with Sanity via the Cloudinary plugin

- **News & Editorial Images**
  - Featured images
  - Gallery images
  - Article imagery

- **User-Generated Content**
  - Fan-submitted photos
  - Fan of the Month imagery
  - Match day fan photos
  - Uploaded directly to Cloudinary with presets

## Implementation Strategy

Our implementation will follow these principles:

1. **Simplified References:** Sanity documents can reference external IDs (Supabase, Cloudinary) where needed.

2. **Next.js Server Components:** Use server components to fetch and compose data from multiple sources.

3. **Direct Integration:** Connect directly to each system's API rather than building complex cross-system utilities.

4. **Image Optimization:** Use Cloudinary for all image storage and transformations.

5. **UGC Flow:** User uploads go to Cloudinary → metadata stored in Sanity → moderation in Sanity → display approved content.

6. **Fan Zone:** Implemented as a homepage section, not a separate page, displaying Fan of the Month, polls, and galleries.
