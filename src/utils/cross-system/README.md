
# Cross-System Reference Resolution Utilities

This module provides utilities for resolving references between Sanity CMS and Supabase in the Banks o' Dee FC application architecture.

## Overview

The Banks o' Dee FC platform uses a hybrid data architecture:
- **Supabase**: Stores operational data (matches, players, sponsors, etc.)
- **Sanity CMS**: Manages editorial content (news, profiles, galleries, etc.)

These utilities provide a standardized way to resolve references between these systems.

## Core Concepts

1. **Standard Reference Fields**:
   - Sanity documents use `supabaseId` to reference Supabase entities
   - Supabase records may use `sanity_id` to reference Sanity documents

2. **Entity Types**:
   - Player: Links `people` table with `playerProfile` documents
   - Match: Links `match` table with `matchGallery` and news articles
   - Sponsor: Links `sponsors` table with `sponsor` documents

3. **Caching**:
   - References are cached for improved performance
   - Cache can be bypassed when fresh data is required

## Usage Examples

### Resolve Supabase Record from Sanity Document

```typescript
import { resolveSupabaseReference } from 'utils/cross-system/resolveSupabaseReference';

// Get the referenced player from a Sanity playerProfile document
const playerProfile = await client.fetch('*[_type == "playerProfile" && _id == $id][0]', { id });
const player = await resolveSupabaseReference(playerProfile, 'people');

// Or using the entity-specific helper
import { resolvePlayerFromProfile } from 'utils/cross-system/player';
const player = await resolvePlayerFromProfile(playerProfile);
```

### Resolve Sanity Document from Supabase Record

```typescript
import { resolveSanityReference } from 'utils/cross-system/resolveSanityReference';

// Get the referenced Sanity document from a Supabase record
const match = await supabase.from('match').select('*').eq('id', matchId).single();
const matchGallery = await resolveSanityReference(match, 'matchGallery');

// Or using the entity-specific helper
import { resolveMatchGalleryFromMatch } from 'utils/cross-system/match';
const matchGallery = await resolveMatchGalleryFromMatch(match);
```

## API Documentation

See individual module documentation for complete API details.
