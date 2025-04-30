
# Cross-System Reference Resolution Usage Guide

This document provides examples and best practices for using the cross-system reference resolution utilities.

## Integration Examples

### Resolving a Player Profile with Extended Content

```typescript
import { getPlayerWithProfile } from 'utils/cross-system/player';

async function displayPlayerProfile(playerId: string) {
  const { player, profile } = await getPlayerWithProfile(playerId);
  
  if (!player) {
    return <div>Player not found</div>;
  }
  
  return (
    <div>
      <h1>{player.name}</h1>
      <p>Jersey Number: {player.jersey_number}</p>
      <p>Position: {player.player_position}</p>
      
      {/* Using Sanity content when available */}
      {profile && (
        <div>
          {profile.profileImage && <img src={urlFor(profile.profileImage).url()} alt={player.name} />}
          {profile.extendedBio && <PortableText value={profile.extendedBio} />}
        </div>
      )}
    </div>
  );
}
```

### Finding Match Content in a Webhook Handler

```typescript
import { getMatchWithContent } from 'utils/cross-system/match';

// Example webhook handler for match updates
export async function handleMatchUpdate(matchId: string) {
  const { match, gallery, newsArticles } = await getMatchWithContent(matchId);
  
  if (!match) {
    console.log('Match not found');
    return;
  }
  
  console.log(`Processing match update for: ${match.home_team_id} vs ${match.away_team_id}`);
  
  // Check if we need to create a gallery in Sanity
  if (!gallery && match.status === 'completed') {
    await createMatchGallery(match);
  }
  
  // Check if we need to update related news articles
  if (newsArticles.length > 0) {
    await updateMatchReferencesInNews(match, newsArticles);
  }
}
```

### Displaying Sponsor Information

```typescript
import { getSponsorWithContent } from 'utils/cross-system/sponsor';

async function displaySponsor(sponsorId: string) {
  const { sponsor, sponsorDocument } = await getSponsorWithContent(sponsorId);
  
  if (!sponsor) {
    return <div>Sponsor not found</div>;
  }
  
  return (
    <div>
      <h1>{sponsor.name}</h1>
      <p>Tier: {sponsor.tier}</p>
      
      {/* Basic sponsor info from Supabase */}
      {sponsor.logo_url && <img src={sponsor.logo_url} alt={sponsor.name} />}
      {sponsor.description && <p>{sponsor.description}</p>}
      {sponsor.website && <a href={sponsor.website}>Visit website</a>}
      
      {/* Enhanced content from Sanity when available */}
      {sponsorDocument && (
        <div>
          {sponsorDocument.body && <PortableText value={sponsorDocument.body} />}
          {sponsorDocument.testimonial && (
            <blockquote>
              <p>{sponsorDocument.testimonial.quote}</p>
              <cite>{sponsorDocument.testimonial.attribution}</cite>
            </blockquote>
          )}
        </div>
      )}
    </div>
  );
}
```

## Best Practices

### 1. Use Entity-Specific Helpers

When possible, use the entity-specific helper functions instead of the generic resolution utilities:

```typescript
// ✅ Do this: 
import { resolvePlayerFromProfile } from 'utils/cross-system/player';
const player = await resolvePlayerFromProfile(profile);

// ❌ Instead of:
import { resolveSupabaseReference } from 'utils/cross-system/resolveSupabaseReference';
const player = await resolveSupabaseReference(profile, 'people');
```

### 2. Cache Consideration

The utilities include caching by default. To bypass the cache for fresh data:

```typescript
// Force a fresh fetch from the database
const { player, profile } = await getPlayerWithProfile(playerId, { skipCache: true });
```

### 3. Error Handling

These utilities include internal error handling but you should still implement appropriate error handling in your application:

```typescript
try {
  const result = await getSponsorWithContent(sponsorId);
  // Process result
} catch (error) {
  console.error('Failed to fetch sponsor:', error);
  // Implement appropriate fallback UI or behavior
}
```

### 4. TypeScript Support

Take advantage of the included TypeScript types for better development experience:

```typescript
import { SupabasePerson, SanityPlayerProfile } from 'utils/cross-system/types';

function processPlayer(player: SupabasePerson, profile: SanityPlayerProfile | null) {
  // TypeScript will provide type hints and validation
}
```

## Common Patterns

### Checking References in Both Systems

When implementing features that span both systems, check for the existence of references in both:

```typescript
// Example: Reconciling player references
async function reconcilePlayerReferences() {
  // Get all players from Supabase
  const { data: players } = await supabase.from('people').select('*');
  
  // For each player, check if they have a Sanity profile
  for (const player of players) {
    const profile = await resolveProfileFromPlayer(player);
    
    if (!profile) {
      console.log(`Player ${player.name} does not have a Sanity profile`);
      // Consider creating one programmatically
    }
  }
}
```

### Handling Missing References

When dealing with references that might not exist in the other system:

```typescript
// Example: Safely displaying match content with fallbacks
async function displayMatchDetails(matchId: string) {
  const { match, gallery, newsArticles } = await getMatchWithContent(matchId);
  
  if (!match) {
    return <NotFoundPage />;
  }
  
  return (
    <MatchDetailsPage
      match={match}
      // Provide fallbacks for optional content
      gallery={gallery || { photos: [] }}
      hasMatchReport={newsArticles.some(article => article.category === 'matchReport')}
    />
  );
}
```
