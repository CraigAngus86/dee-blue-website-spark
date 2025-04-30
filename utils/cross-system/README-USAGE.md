
# Cross-System Reference Resolution Utilities: Usage Guide

This guide provides detailed examples for using the cross-system reference resolution utilities to connect data between Sanity CMS and Supabase in the Banks o' Dee FC website.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Player References](#player-references)
3. [Match References](#match-references)
4. [Sponsor References](#sponsor-references)
5. [Advanced Usage](#advanced-usage)
6. [Error Handling](#error-handling)
7. [Performance Optimization](#performance-optimization)
8. [Next.js Integration](#nextjs-integration)

## Basic Usage

### Resolving a Supabase Reference from Sanity

```typescript
import { resolveSupabaseReference } from '../utils/cross-system';
import { supabase } from '../lib/supabase';

// Resolve a player reference from a Sanity document
async function getPlayerFromSanityDocument(sanityDocument) {
  // Extract the Supabase ID from the document
  const playerResolver = resolveSupabaseReference(sanityDocument, 'supabaseId');
  
  // Fetch the player from Supabase
  const player = await playerResolver(
    supabase.from('people').select('*')
  );
  
  return player;
}
```

### Resolving a Sanity Reference from Supabase

```typescript
import { resolveSanityReference } from '../utils/cross-system';
import { sanityClient } from '../lib/sanity';

// Resolve a Sanity document from a Supabase record
async function getSanityDocumentFromSupabaseRecord(supabaseRecord) {
  // Extract the Sanity ID from the record
  const documentResolver = resolveSanityReference(supabaseRecord, 'sanity_id');
  
  // Fetch the Sanity document
  const document = await documentResolver(
    sanityClient.fetch('*[_id == $id][0]', { id: sanityRecord.sanity_id })
  );
  
  return document;
}
```

## Player References

### Get Player with Sanity Profile

```typescript
import { getPlayerWithProfile } from '../utils/cross-system/player';

async function displayPlayerProfile(playerId) {
  // Get player data from both systems
  const { player, profile } = await getPlayerWithProfile(playerId);
  
  if (!player) {
    console.error('Player not found');
    return;
  }
  
  console.log(`Player: ${player.name}`);
  console.log(`Position: ${player.player_position}`);
  
  if (profile) {
    // Use extended content from Sanity
    console.log(`Extended Bio: ${profile.extendedBio}`);
    console.log(`Featured Content: ${profile.featuredContent}`);
  }
}
```

### Get All Players with Profiles

```typescript
import { getAllPlayersWithProfiles } from '../utils/cross-system/player';

async function listAllPlayers() {
  const players = await getAllPlayersWithProfiles();
  
  // Process players with their profiles
  players.forEach(({ player, profile }) => {
    console.log(`${player.name} - ${player.player_position}`);
    if (profile) {
      console.log(`Has extended profile: ${profile._id}`);
    }
  });
}
```

## Match References

### Get Match with Related Content

```typescript
import { getMatchWithContent } from '../utils/cross-system/match';

async function displayMatchContent(matchId) {
  // Get match data with related content
  const { match, gallery, newsArticles } = await getMatchWithContent(matchId);
  
  if (!match) {
    console.error('Match not found');
    return;
  }
  
  console.log(`Match: ${match.home_team} vs ${match.away_team}`);
  console.log(`Date: ${match.match_date}`);
  
  // Display gallery information if available
  if (gallery) {
    console.log(`Gallery: ${gallery.title}`);
    console.log(`Images: ${gallery.images.length}`);
  }
  
  // Display related news articles
  console.log(`Related Articles: ${newsArticles.length}`);
  newsArticles.forEach(article => {
    console.log(`- ${article.title}`);
  });
}
```

### Get Upcoming Matches with Content

```typescript
import { getUpcomingMatchesWithContent } from '../utils/cross-system/match';

async function listUpcomingMatches() {
  const matches = await getUpcomingMatchesWithContent();
  
  matches.forEach(({ match, preview }) => {
    console.log(`${match.home_team} vs ${match.away_team} - ${match.match_date}`);
    
    if (preview) {
      console.log(`Match Preview: ${preview.title}`);
    }
  });
}
```

## Sponsor References

### Get Sponsor with Sanity Content

```typescript
import { getSponsorWithContent } from '../utils/cross-system/sponsor';

async function displaySponsorProfile(sponsorId) {
  // Get sponsor data from both systems
  const { sponsor, sponsorDocument } = await getSponsorWithContent(sponsorId);
  
  if (!sponsor) {
    console.error('Sponsor not found');
    return;
  }
  
  console.log(`Sponsor: ${sponsor.name}`);
  console.log(`Tier: ${sponsor.tier}`);
  
  if (sponsorDocument) {
    // Use extended content from Sanity
    console.log(`Description: ${sponsorDocument.description}`);
    console.log(`Contact: ${sponsorDocument.contactInfo}`);
    
    // Display sponsor benefits
    if (sponsorDocument.benefits) {
      console.log('Benefits:');
      sponsorDocument.benefits.forEach(benefit => {
        console.log(`- ${benefit}`);
      });
    }
  }
}
```

## Advanced Usage

### Bypassing Cache

All utility functions accept options to bypass the cache:

```typescript
import { getPlayerWithProfile } from '../utils/cross-system/player';

// Get fresh data by bypassing the cache
const { player, profile } = await getPlayerWithProfile(playerId, { skipCache: true });
```

### Including Related Content

Some utilities support including additional related content:

```typescript
import { getMatchWithContent } from '../utils/cross-system/match';

// Get match with full related content
const matchContent = await getMatchWithContent(matchId, { includeRelated: true });

console.log(`Match: ${matchContent.match.home_team} vs ${matchContent.match.away_team}`);
console.log(`News Articles: ${matchContent.newsArticles.length}`);
console.log(`Gallery Images: ${matchContent.gallery?.images.length || 0}`);
console.log(`Video Content: ${matchContent.videos.length}`);
```

### Custom Cache TTL

Configure custom cache expiration times:

```typescript
import { getPlayerWithProfile } from '../utils/cross-system/player';
import { setCacheTTL } from '../utils/cross-system/cache';

// Set a custom cache TTL (in milliseconds)
setCacheTTL(60000); // 1 minute

// Use the utilities as normal
const { player, profile } = await getPlayerWithProfile(playerId);
```

## Error Handling

The utilities include comprehensive error handling:

```typescript
import { getPlayerWithProfile } from '../utils/cross-system/player';

async function safeGetPlayer(playerId) {
  try {
    const { player, profile } = await getPlayerWithProfile(playerId);
    
    if (!player) {
      // Handle missing player
      return { error: 'Player not found' };
    }
    
    return { player, profile };
  } catch (error) {
    console.error('Error fetching player:', error);
    return { error: 'Failed to fetch player data' };
  }
}
```

## Performance Optimization

### Bulk Operations

For multiple entities, use the bulk operations:

```typescript
import { getPlayersWithProfiles } from '../utils/cross-system/player';

// Get multiple players in a single operation
const playerIds = ['player-1', 'player-2', 'player-3'];
const players = await getPlayersWithProfiles(playerIds);

// Process each player
players.forEach(({ player, profile }) => {
  if (player) {
    console.log(`Found player: ${player.name}`);
  }
});
```

### Partial Data Usage

When you only need basic data, avoid requesting related content:

```typescript
import { getMatchBasicInfo } from '../utils/cross-system/match';

// Get just the match data without related content
const match = await getMatchBasicInfo(matchId);

console.log(`${match.home_team} vs ${match.away_team}`);
```

## Next.js Integration

### Server Components

In Next.js Server Components:

```tsx
// app/players/[id]/page.tsx
import { getPlayerWithProfile } from '@/utils/cross-system/player';

export default async function PlayerPage({ params }: { params: { id: string } }) {
  const { player, profile } = await getPlayerWithProfile(params.id);
  
  if (!player) {
    return <div>Player not found</div>;
  }
  
  return (
    <div>
      <h1>{player.name}</h1>
      <p>Position: {player.player_position}</p>
      
      {profile && (
        <div>
          <h2>Extended Profile</h2>
          <p>{profile.extendedBio}</p>
        </div>
      )}
    </div>
  );
}
```

### API Routes

In Next.js API routes:

```typescript
// app/api/players/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPlayerWithProfile } from '@/utils/cross-system/player';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { player, profile } = await getPlayerWithProfile(params.id);
  
  if (!player) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }
  
  return NextResponse.json({ player, profile });
}
```

### Client Components with SWR

Using the utilities with SWR in client components:

```tsx
'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function PlayerProfile({ playerId }: { playerId: string }) {
  const { data, error } = useSWR(`/api/players/${playerId}`, fetcher);
  
  if (error) return <div>Failed to load player</div>;
  if (!data) return <div>Loading...</div>;
  
  const { player, profile } = data;
  
  return (
    <div>
      <h1>{player.name}</h1>
      {/* Display player data */}
    </div>
  );
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());
```
