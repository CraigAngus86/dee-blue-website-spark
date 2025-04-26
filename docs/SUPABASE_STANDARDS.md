
# Supabase Implementation Standards for Banks o' Dee FC

## Database Structure

### Core Tables

#### Season and Competition Management
- `season` - Defines football seasons (e.g., 2023/24, 2024/25)
  - Includes start_date, end_date, status (completed, active, upcoming)
  - One season is marked as current (is_current_season)
- `competitions` - All competitions the club participates in
  - Highland League, Scottish Cup, etc.
- `season_competition` - Links seasons to competitions
  - Each competition in a season can have unique settings
  - Used to filter matches by both season and competition

#### Match Management
- `match` - The central table for all fixtures and results
  - Links to season_competition
  - References home_team_id and away_team_id
  - Stores complete match info (date, time, venue, scores)
  - Status field indicates match state (scheduled, completed, postponed, cancelled)
  - Support for ticket links and match reports
  - Optimized with appropriate indexes

#### Team and League Tables
- `teams` - All teams in the system
  - Includes name and logo URL
- `league_table` - League standings information
  - Linked to season_competition for per-season league tables
  - Tracks position, points, form, goals, etc.
  - Automatically updated via triggers when match results change

### Supporting Views

- `vw_upcoming_matches` - Shows upcoming fixtures with team and competition details
- `matches_compatibility_view` - Compatibility view for legacy code using the old schema
- `fixtures_compatibility_view` - Compatibility view for legacy code using the old schema
- `highland_league_table_compatibility_view` - Compatibility view for league tables

### Row-Level Security (RLS)
- Public read access on match data and league tables
- Write access restricted to authenticated administrators

## Coding Standards

### Data Access Patterns

1. **Query by Season and Competition**
   - Always filter match data by season_competition_id when retrieving matches
   - Use season.is_current_season to get current season data

2. **Date-Based Filtering**
   - Use match_date field with proper indexing
   - For upcoming matches: `WHERE match_date >= CURRENT_DATE AND status != 'completed'`
   - For past matches: `WHERE status = 'completed' OR match_date < CURRENT_DATE`

3. **Team References**
   - Always use team_id references rather than storing team names directly
   - Join with teams table to get names and logos

### TypeScript Interfaces

```typescript
// Season interfaces
interface Season {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isCurrentSeason: boolean;
  status: 'upcoming' | 'active' | 'completed';
}

// Match interface
interface Match {
  id: string;
  seasonCompetitionId: string;
  homeTeamId: number;
  awayTeamId: number;
  matchDate: Date;
  matchTime: string;
  venue: string;
  status: 'scheduled' | 'completed' | 'postponed' | 'cancelled';
  isCompleted: boolean;
  homeScore?: number;
  awayScore?: number;
  ticketLink?: string;
  matchReportLink?: string;
  round?: string;
  isHighlighted: boolean;
}
```

## Migration Notes

- The new schema consolidates the previous `matches` and `fixtures` tables
- Legacy code continues to work through compatibility views
- Querying the new structure directly is more efficient than using compatibility views
- All match data is now consistently stored in a single table with proper foreign keys
