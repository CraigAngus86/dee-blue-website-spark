export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      community_initiatives: {
        Row: {
          created_at: string | null
          date: string
          description: string
          end_date: string | null
          id: string
          impact_summary: string | null
          location: string
          participants_count: number | null
          status: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          description: string
          end_date?: string | null
          id?: string
          impact_summary?: string | null
          location: string
          participants_count?: number | null
          status?: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string
          end_date?: string | null
          id?: string
          impact_summary?: string | null
          location?: string
          participants_count?: number | null
          status?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      competitions: {
        Row: {
          id: number
          logo: string | null
          name: string
        }
        Insert: {
          id?: number
          logo?: string | null
          name: string
        }
        Update: {
          id?: number
          logo?: string | null
          name?: string
        }
        Relationships: []
      }
      db_data_access_patterns: {
        Row: {
          created_at: string | null
          needs_compatibility_view: boolean | null
          page_or_component: string
          priority: number
          query_pattern: string
          table_name: string
        }
        Insert: {
          created_at?: string | null
          needs_compatibility_view?: boolean | null
          page_or_component: string
          priority: number
          query_pattern: string
          table_name: string
        }
        Update: {
          created_at?: string | null
          needs_compatibility_view?: boolean | null
          page_or_component?: string
          priority?: number
          query_pattern?: string
          table_name?: string
        }
        Relationships: []
      }
      db_migration_counts: {
        Row: {
          backup_record_count: number
          backup_table_name: string | null
          migrated_record_count: number | null
          migrated_table_name: string | null
          record_count: number
          table_name: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          backup_record_count: number
          backup_table_name?: string | null
          migrated_record_count?: number | null
          migrated_table_name?: string | null
          record_count: number
          table_name: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          backup_record_count?: number
          backup_table_name?: string | null
          migrated_record_count?: number | null
          migrated_table_name?: string | null
          record_count?: number
          table_name?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      db_migration_rollback: {
        Row: {
          created_at: string | null
          is_tested: boolean | null
          rollback_script: string
          step_name: string
        }
        Insert: {
          created_at?: string | null
          is_tested?: boolean | null
          rollback_script: string
          step_name: string
        }
        Update: {
          created_at?: string | null
          is_tested?: boolean | null
          rollback_script?: string
          step_name?: string
        }
        Relationships: []
      }
      db_optimization_progress: {
        Row: {
          completed_at: string | null
          is_completed: boolean | null
          notes: string | null
          step_name: string
          verification_passed: boolean | null
        }
        Insert: {
          completed_at?: string | null
          is_completed?: boolean | null
          notes?: string | null
          step_name: string
          verification_passed?: boolean | null
        }
        Update: {
          completed_at?: string | null
          is_completed?: boolean | null
          notes?: string | null
          step_name?: string
          verification_passed?: boolean | null
        }
        Relationships: []
      }
      fan_content: {
        Row: {
          content: string | null
          created_at: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          moderated_by: string | null
          moderation_date: string | null
          moderation_notes: string | null
          status: string
          submitted_by: string
          submitted_on: string | null
          title: string
          type: string
          updated_at: string | null
          user_reputation: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          moderated_by?: string | null
          moderation_date?: string | null
          moderation_notes?: string | null
          status?: string
          submitted_by: string
          submitted_on?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_reputation?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          moderated_by?: string | null
          moderation_date?: string | null
          moderation_notes?: string | null
          status?: string
          submitted_by?: string
          submitted_on?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_reputation?: number | null
        }
        Relationships: []
      }
      fan_polls: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          is_featured: boolean | null
          published_at: string | null
          start_date: string | null
          status: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_featured?: boolean | null
          published_at?: string | null
          start_date?: string | null
          status?: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_featured?: boolean | null
          published_at?: string | null
          start_date?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      fixtures: {
        Row: {
          away_score: number | null
          away_team: string
          competition: string
          created_at: string | null
          date: string
          date_passed: boolean | null
          home_score: number | null
          home_team: string
          id: string
          import_date: string | null
          is_completed: boolean | null
          is_latest_result: boolean | null
          is_next_match: boolean | null
          season: string | null
          source: string | null
          ticket_link: string | null
          time: string
          updated_at: string | null
          venue: string | null
        }
        Insert: {
          away_score?: number | null
          away_team: string
          competition: string
          created_at?: string | null
          date: string
          date_passed?: boolean | null
          home_score?: number | null
          home_team: string
          id?: string
          import_date?: string | null
          is_completed?: boolean | null
          is_latest_result?: boolean | null
          is_next_match?: boolean | null
          season?: string | null
          source?: string | null
          ticket_link?: string | null
          time: string
          updated_at?: string | null
          venue?: string | null
        }
        Update: {
          away_score?: number | null
          away_team?: string
          competition?: string
          created_at?: string | null
          date?: string
          date_passed?: boolean | null
          home_score?: number | null
          home_team?: string
          id?: string
          import_date?: string | null
          is_completed?: boolean | null
          is_latest_result?: boolean | null
          is_next_match?: boolean | null
          season?: string | null
          source?: string | null
          ticket_link?: string | null
          time?: string
          updated_at?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      highland_league_table_backup_20250427: {
        Row: {
          created_at: string | null
          drawn: number | null
          form: string[] | null
          goalDifference: number | null
          goalsAgainst: number | null
          goalsFor: number | null
          id: number | null
          logo: string | null
          lost: number | null
          played: number | null
          points: number | null
          position: number | null
          team: string | null
          won: number | null
        }
        Insert: {
          created_at?: string | null
          drawn?: number | null
          form?: string[] | null
          goalDifference?: number | null
          goalsAgainst?: number | null
          goalsFor?: number | null
          id?: number | null
          logo?: string | null
          lost?: number | null
          played?: number | null
          points?: number | null
          position?: number | null
          team?: string | null
          won?: number | null
        }
        Update: {
          created_at?: string | null
          drawn?: number | null
          form?: string[] | null
          goalDifference?: number | null
          goalsAgainst?: number | null
          goalsFor?: number | null
          id?: number | null
          logo?: string | null
          lost?: number | null
          played?: number | null
          points?: number | null
          position?: number | null
          team?: string | null
          won?: number | null
        }
        Relationships: []
      }
      image_folders: {
        Row: {
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
          path: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          parent_id?: string | null
          path: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          path?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_folders_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "image_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      league_standings: {
        Row: {
          created_at: string | null
          drawn: number
          form: string[]
          goal_difference: number
          goals_against: number
          goals_for: number
          id: string
          lost: number
          played: number
          points: number
          position: number | null
          season_competition_id: string
          team_id: string | null
          updated_at: string | null
          won: number
        }
        Insert: {
          created_at?: string | null
          drawn?: number
          form?: string[]
          goal_difference?: number
          goals_against?: number
          goals_for?: number
          id?: string
          lost?: number
          played?: number
          points?: number
          position?: number | null
          season_competition_id: string
          team_id?: string | null
          updated_at?: string | null
          won?: number
        }
        Update: {
          created_at?: string | null
          drawn?: number
          form?: string[]
          goal_difference?: number
          goals_against?: number
          goals_for?: number
          id?: string
          lost?: number
          played?: number
          points?: number
          position?: number | null
          season_competition_id?: string
          team_id?: string | null
          updated_at?: string | null
          won?: number
        }
        Relationships: []
      }
      match: {
        Row: {
          away_score: number | null
          away_team_id: string
          competition_id: string | null
          created_at: string | null
          date: string
          home_score: number | null
          home_team_id: string
          id: string
          import_date: string | null
          is_home: boolean | null
          is_latest_result: boolean | null
          is_next_match: boolean | null
          season_id: string | null
          source: string | null
          status: string | null
          ticket_link: string | null
          time: string | null
          updated_at: string | null
          venue: string | null
        }
        Insert: {
          away_score?: number | null
          away_team_id: string
          competition_id?: string | null
          created_at?: string | null
          date: string
          home_score?: number | null
          home_team_id: string
          id?: string
          import_date?: string | null
          is_home?: boolean | null
          is_latest_result?: boolean | null
          is_next_match?: boolean | null
          season_id?: string | null
          source?: string | null
          status?: string | null
          ticket_link?: string | null
          time?: string | null
          updated_at?: string | null
          venue?: string | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: string
          competition_id?: string | null
          created_at?: string | null
          date?: string
          home_score?: number | null
          home_team_id?: string
          id?: string
          import_date?: string | null
          is_home?: boolean | null
          is_latest_result?: boolean | null
          is_next_match?: boolean | null
          season_id?: string | null
          source?: string | null
          status?: string | null
          ticket_link?: string | null
          time?: string | null
          updated_at?: string | null
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_away_team"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          author: string | null
          category: string
          content: string
          created_at: string
          id: string
          image_url: string | null
          is_featured: boolean
          publish_date: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category: string
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          publish_date?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          publish_date?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      news_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      scrape_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          items_added: number | null
          items_found: number | null
          items_updated: number | null
          source: string
          status: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          items_added?: number | null
          items_found?: number | null
          items_updated?: number | null
          source: string
          status: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          items_added?: number | null
          items_found?: number | null
          items_updated?: number | null
          source?: string
          status?: string
        }
        Relationships: []
      }
      season_competitions: {
        Row: {
          competition_id: string
          created_at: string | null
          id: string
          is_league: boolean | null
          name: string
          season_id: string
          updated_at: string | null
        }
        Insert: {
          competition_id: string
          created_at?: string | null
          id?: string
          is_league?: boolean | null
          name: string
          season_id: string
          updated_at?: string | null
        }
        Update: {
          competition_id?: string
          created_at?: string | null
          id?: string
          is_league?: boolean | null
          name?: string
          season_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "season_competitions_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      season_tickets: {
        Row: {
          available: boolean | null
          benefits: string[] | null
          category: string | null
          created_at: string | null
          description: string
          id: string
          name: string
          price: number
          savings_amount: number | null
          season_id: string | null
          updated_at: string | null
        }
        Insert: {
          available?: boolean | null
          benefits?: string[] | null
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          name: string
          price: number
          savings_amount?: number | null
          season_id?: string | null
          updated_at?: string | null
        }
        Update: {
          available?: boolean | null
          benefits?: string[] | null
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          name?: string
          price?: number
          savings_amount?: number | null
          season_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      seasons: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          is_current: boolean | null
          name: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          is_current?: boolean | null
          name: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          is_current?: boolean | null
          name?: string
          start_date?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      sponsor_display_settings: {
        Row: {
          carousel_speed: number | null
          display_mode: string | null
          id: string
          max_logos_homepage: number | null
          randomize_order: boolean | null
          show_on_homepage: boolean | null
          show_tier_headings: boolean | null
          sponsors_per_row: number | null
          updated_at: string | null
        }
        Insert: {
          carousel_speed?: number | null
          display_mode?: string | null
          id?: string
          max_logos_homepage?: number | null
          randomize_order?: boolean | null
          show_on_homepage?: boolean | null
          show_tier_headings?: boolean | null
          sponsors_per_row?: number | null
          updated_at?: string | null
        }
        Update: {
          carousel_speed?: number | null
          display_mode?: string | null
          id?: string
          max_logos_homepage?: number | null
          randomize_order?: boolean | null
          show_on_homepage?: boolean | null
          show_tier_headings?: boolean | null
          sponsors_per_row?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sponsorship_tiers: {
        Row: {
          benefits: string | null
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          order_position: number
          updated_at: string | null
        }
        Insert: {
          benefits?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          order_position?: number
          updated_at?: string | null
        }
        Update: {
          benefits?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          order_position?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string | null
          experience: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          jersey_number: number | null
          member_type: string
          name: string
          nationality: string | null
          position: string | null
          previous_clubs: string[] | null
          stats: Json | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          experience?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          jersey_number?: number | null
          member_type: string
          name: string
          nationality?: string | null
          position?: string | null
          previous_clubs?: string[] | null
          stats?: Json | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          experience?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          jersey_number?: number | null
          member_type?: string
          name?: string
          nationality?: string | null
          position?: string | null
          previous_clubs?: string[] | null
          stats?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          id: string
          logo: string | null
          name: string
        }
        Insert: {
          id?: string
          logo?: string | null
          name: string
        }
        Update: {
          id?: string
          logo?: string | null
          name?: string
        }
        Relationships: []
      }
      ticket_types: {
        Row: {
          available: boolean | null
          category: string | null
          created_at: string | null
          description: string
          id: string
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          available?: boolean | null
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          available?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      vw_fixtures: {
        Row: {
          away_score: number | null
          away_team: string | null
          competition: string | null
          created_at: string | null
          date: string | null
          date_passed: boolean | null
          home_score: number | null
          home_team: string | null
          id: string | null
          import_date: string | null
          is_completed: boolean | null
          is_latest_result: boolean | null
          is_next_match: boolean | null
          season: string | null
          source: string | null
          ticket_link: string | null
          time: string | null
          updated_at: string | null
          venue: string | null
        }
        Insert: {
          away_score?: number | null
          away_team?: never
          competition?: never
          created_at?: string | null
          date?: string | null
          date_passed?: never
          home_score?: number | null
          home_team?: never
          id?: string | null
          import_date?: string | null
          is_completed?: never
          is_latest_result?: boolean | null
          is_next_match?: boolean | null
          season?: never
          source?: string | null
          ticket_link?: string | null
          time?: string | null
          updated_at?: string | null
          venue?: string | null
        }
        Update: {
          away_score?: number | null
          away_team?: never
          competition?: never
          created_at?: string | null
          date?: string | null
          date_passed?: never
          home_score?: number | null
          home_team?: never
          id?: string | null
          import_date?: string | null
          is_completed?: never
          is_latest_result?: boolean | null
          is_next_match?: boolean | null
          season?: never
          source?: string | null
          ticket_link?: string | null
          time?: string | null
          updated_at?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      vw_highland_league_table: {
        Row: {
          created_at: string | null
          drawn: number | null
          form: string[] | null
          goal_difference: number | null
          goals_against: number | null
          goals_for: number | null
          id: string | null
          lost: number | null
          played: number | null
          points: number | null
          position: number | null
          season_competition_id: string | null
          team_id: string | null
          updated_at: string | null
          won: number | null
        }
        Insert: {
          created_at?: string | null
          drawn?: number | null
          form?: string[] | null
          goal_difference?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: string | null
          lost?: number | null
          played?: number | null
          points?: number | null
          position?: number | null
          season_competition_id?: string | null
          team_id?: string | null
          updated_at?: string | null
          won?: number | null
        }
        Update: {
          created_at?: string | null
          drawn?: number | null
          form?: string[] | null
          goal_difference?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: string | null
          lost?: number | null
          played?: number | null
          points?: number | null
          position?: number | null
          season_competition_id?: string | null
          team_id?: string | null
          updated_at?: string | null
          won?: number | null
        }
        Relationships: []
      }
      vw_matches: {
        Row: {
          away_score: number | null
          away_team_id: string | null
          competition_id: string | null
          date: string | null
          home_score: number | null
          home_team_id: string | null
          id: number | null
          is_home: boolean | null
          season: string | null
          status: string | null
          time: string | null
          venue: string | null
        }
        Insert: {
          away_score?: number | null
          away_team_id?: never
          competition_id?: never
          date?: string | null
          home_score?: number | null
          home_team_id?: never
          id?: never
          is_home?: boolean | null
          season?: never
          status?: string | null
          time?: string | null
          venue?: string | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: never
          competition_id?: never
          date?: string | null
          home_score?: number | null
          home_team_id?: never
          id?: never
          is_home?: boolean | null
          season?: never
          status?: string | null
          time?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      vw_upcoming_matches: {
        Row: {
          away_team: string | null
          away_team_logo: string | null
          competition: string | null
          competition_short: string | null
          home_team: string | null
          home_team_logo: string | null
          id: string | null
          match_date: string | null
          match_time: string | null
          season: string | null
          ticket_link: string | null
          venue: string | null
        }
        Insert: {
          away_team?: string | null
          away_team_logo?: never
          competition?: string | null
          competition_short?: never
          home_team?: string | null
          home_team_logo?: never
          id?: string | null
          match_date?: string | null
          match_time?: string | null
          season?: string | null
          ticket_link?: string | null
          venue?: never
        }
        Update: {
          away_team?: string | null
          away_team_logo?: never
          competition?: string | null
          competition_short?: never
          home_team?: string | null
          home_team_logo?: never
          id?: string | null
          match_date?: string | null
          match_time?: string | null
          season?: string | null
          ticket_link?: string | null
          venue?: never
        }
        Relationships: []
      }
    }
    Functions: {
      get_next_match: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          season: string
          competition: string
          competition_short: string
          home_team: string
          away_team: string
          home_team_logo: string
          away_team_logo: string
          match_date: string
          match_time: string
          venue: string
          ticket_link: string
        }[]
      }
      md5_to_away_team: {
        Args: { team_id: string }
        Returns: string
      }
      md5_to_competition: {
        Args: { comp_id: string }
        Returns: string
      }
      md5_to_home_team: {
        Args: { team_id: string }
        Returns: string
      }
      md5_to_team_name: {
        Args: { team_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
