
# Supabase Implementation Standards for Banks o' Dee FC

## 1. Database Structure Guidelines

### 1.1 Core Tables

#### Season and Competition Management
- **`season`** Table
  - Defines football seasons (e.g., 2023/24, 2024/25)
  - Columns:
    - `id`: Unique identifier
    - `name`: Season name (e.g., "2024/25 Season")
    - `start_date`: Season start date
    - `end_date`: Season end date
    - `status`: Possible values - 'upcoming', 'active', 'completed'
    - `is_current_season`: Boolean flag to identify the current active season
    - `created_at`: Creation timestamp
    - `updated_at`: Last update timestamp

- **`competitions`** Table
  - Lists all competitions the club participates in
  - Columns:
    - `id`: UUID primary key
    - `name`: Competition name (e.g., "Highland League", "Scottish Cup")
    - `short_name`: Abbreviated name (e.g., "HFL")
    - `type`: Competition type ('league', 'cup', 'friendly')
    - `logo_url`: URL to competition logo
    - `created_at`: Creation timestamp
    - `updated_at`: Last update timestamp

- **`season_competition`** Table
  - Links seasons to competitions
  - Allows tracking which competitions occur in which seasons
  - Columns:
    - `id`: UUID primary key
    - `season_id`: Foreign key to seasons
    - `competition_id`: Foreign key to competitions
    - `created_at`: Creation timestamp
    - `updated_at`: Last update timestamp
    - UNIQUE constraint on (season_id, competition_id)

#### Match Management
- **`match`** Table (Central Table)
  - Stores all fixtures and results
  - Columns:
    - `id`: UUID primary key
    - `season_id`: Foreign key to seasons
    - `competition_id`: Foreign key to competitions
    - `home_team_id`: Reference to home team
    - `away_team_id`: Reference to away team
    - `match_date`: Date of the match
    - `match_time`: Time of the match
    - `venue`: Match location
    - `status`: Match state ('scheduled', 'completed', 'postponed', 'cancelled')
    - `home_score`: Home team score
    - `away_score`: Away team score
    - `home_scorers`: Array of goal scorer names
    - `away_scorers`: Array of goal scorer names
    - `attendance`: Match attendance count
    - `ticket_link`: Optional link to purchase tickets
    - `match_report_link`: Optional link to match report
    - `is_highlighted`: Boolean to feature important matches
    - `created_at`: Creation timestamp
    - `updated_at`: Last update timestamp

#### Team and League Management
- **`teams`** Table
  - Stores all teams in the system
  - Columns:
    - `id`: UUID primary key
    - `name`: Team name
    - `short_name`: Abbreviated team name
    - `logo_url`: URL to team logo
    - `founded_year`: Year team was established
    - `website`: Team website URL
    - `primary_color`: Team primary color
    - `stadium_name`: Home stadium
    - `created_at`: Creation timestamp
    - `updated_at`: Last update timestamp

- **`league_table`** Table
  - Tracks league standings
  - Columns:
    - `id`: UUID primary key
    - `season_id`: Foreign key to seasons
    - `competition_id`: Foreign key to competitions
    - `team_id`: Team in the league
    - `position`: Current league position
    - `points`: Total points
    - `matches_played`: Number of matches played
    - `wins`: Number of wins
    - `draws`: Number of draws
    - `losses`: Number of losses
    - `goals_for`: Goals scored
    - `goals_against`: Goals conceded
    - `goal_difference`: Goals for minus goals against
    - `form`: Array of recent results
    - `created_at`: Creation timestamp
    - `updated_at`: Last update timestamp
    - UNIQUE constraint on (season_id, competition_id, team_id)

## 2. Views and Compatibility

### 2.1 Supporting Views
- `vw_upcoming_matches`: Shows upcoming fixtures with team and competition details
- `vw_past_matches`: Shows completed matches
- `vw_league_standings`: Current league table standings
- `matches_compatibility_view`: Legacy compatibility view
- `league_table_compatibility_view`: Legacy league table view

## 3. Row-Level Security (RLS)

### 3.1 Access Policies
- Public read access on:
  - Match data
  - League tables
  - Team information
- Write access restricted to:
  - Authenticated administrators
  - Specific roles (match reporter, league administrator)

## 4. Coding Standards

### 4.1 Data Access Patterns

#### Querying Matches
- Always filter by `season_competition_id`
- Use `is_current_season` for current season data
- Example query for upcoming matches:
  ```sql
  SELECT * FROM match 
  WHERE match_date >= CURRENT_DATE 
  AND status != 'completed'
  ```

#### Team References
- Always use `team_id` references
- Join with `teams` table to get names and logos
- Avoid storing redundant team information

### 4.2 TypeScript Interfaces

```typescript
interface Season {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isCurrentSeason: boolean;
  status: 'upcoming' | 'active' | 'completed';
}

interface Match {
  id: string;
  seasonCompetitionId: string;
  homeTeamId: number;
  awayTeamId: number;
  matchDate: Date;
  matchTime: string;
  venue: string;
  status: 'scheduled' | 'completed' | 'postponed' | 'cancelled';
  homeScore?: number;
  awayScore?: number;
}
```

## 5. Migration and Compatibility Notes

- New schema consolidates previous `matches` and `fixtures` tables
- Legacy code supported through compatibility views
- Direct queries to new structure recommended for performance
- Trigger-based updates for league tables

## 6. Best Practices

- Use parameterized queries to prevent SQL injection
- Implement proper indexing on frequently queried columns
- Regularly review and optimize database performance
- Use database transactions for complex operations
- Implement proper error handling and logging

## 7. Future Considerations

- Implement comprehensive logging
- Create automated database backup strategies
- Develop monitoring for database performance
- Regularly review and update security policies

