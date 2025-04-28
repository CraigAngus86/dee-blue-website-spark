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
      competitions: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          short_name: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          short_name?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          short_name?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      league_table: {
        Row: {
          competition_id: string
          created_at: string | null
          draws: number | null
          form: string[] | null
          goal_difference: number | null
          goals_against: number | null
          goals_for: number | null
          id: string
          losses: number | null
          matches_played: number | null
          points: number | null
          position: number
          season_id: string | null
          team_id: string
          updated_at: string | null
          wins: number | null
        }
        Insert: {
          competition_id: string
          created_at?: string | null
          draws?: number | null
          form?: string[] | null
          goal_difference?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: string
          losses?: number | null
          matches_played?: number | null
          points?: number | null
          position: number
          season_id?: string | null
          team_id: string
          updated_at?: string | null
          wins?: number | null
        }
        Update: {
          competition_id?: string
          created_at?: string | null
          draws?: number | null
          form?: string[] | null
          goal_difference?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: string
          losses?: number | null
          matches_played?: number | null
          points?: number | null
          position?: number
          season_id?: string | null
          team_id?: string
          updated_at?: string | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_league_table_competition"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_league_table_season"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_league_table_team"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "league_table_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "league_table_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "league_table_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      match: {
        Row: {
          attendance: number | null
          away_score: number | null
          away_scorers: string[] | null
          away_team_id: string
          competition_id: string
          created_at: string | null
          home_score: number | null
          home_scorers: string[] | null
          home_team_id: string
          hospitality_available: boolean | null
          id: string
          is_highlighted: boolean | null
          match_date: string
          match_report_link: string | null
          match_sponsor_id: string | null
          match_time: string | null
          season_id: string | null
          status: string | null
          ticket_link: string | null
          ticketco_event_id: string | null
          updated_at: string | null
          venue: string | null
        }
        Insert: {
          attendance?: number | null
          away_score?: number | null
          away_scorers?: string[] | null
          away_team_id: string
          competition_id: string
          created_at?: string | null
          home_score?: number | null
          home_scorers?: string[] | null
          home_team_id: string
          hospitality_available?: boolean | null
          id?: string
          is_highlighted?: boolean | null
          match_date: string
          match_report_link?: string | null
          match_sponsor_id?: string | null
          match_time?: string | null
          season_id?: string | null
          status?: string | null
          ticket_link?: string | null
          ticketco_event_id?: string | null
          updated_at?: string | null
          venue?: string | null
        }
        Update: {
          attendance?: number | null
          away_score?: number | null
          away_scorers?: string[] | null
          away_team_id?: string
          competition_id?: string
          created_at?: string | null
          home_score?: number | null
          home_scorers?: string[] | null
          home_team_id?: string
          hospitality_available?: boolean | null
          id?: string
          is_highlighted?: boolean | null
          match_date?: string
          match_report_link?: string | null
          match_sponsor_id?: string | null
          match_time?: string | null
          season_id?: string | null
          status?: string | null
          ticket_link?: string | null
          ticketco_event_id?: string | null
          updated_at?: string | null
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_match_away_team"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_match_competition"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_match_home_team"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_match_season"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_match_sponsor_id_fkey"
            columns: ["match_sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
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
      people: {
        Row: {
          academy_player: boolean | null
          bio: string | null
          created_at: string | null
          did_you_know: string | null
          first_name: string
          id: string
          image_url: string | null
          jersey_number: number | null
          joined_date: string | null
          last_name: string
          member_type: string
          name: string
          nationality: string
          player_position: string | null
          position: string
          social_media: Json | null
          sponsor_id: string | null
          staff_role: string | null
          updated_at: string | null
        }
        Insert: {
          academy_player?: boolean | null
          bio?: string | null
          created_at?: string | null
          did_you_know?: string | null
          first_name: string
          id?: string
          image_url?: string | null
          jersey_number?: number | null
          joined_date?: string | null
          last_name: string
          member_type: string
          name: string
          nationality?: string
          player_position?: string | null
          position: string
          social_media?: Json | null
          sponsor_id?: string | null
          staff_role?: string | null
          updated_at?: string | null
        }
        Update: {
          academy_player?: boolean | null
          bio?: string | null
          created_at?: string | null
          did_you_know?: string | null
          first_name?: string
          id?: string
          image_url?: string | null
          jersey_number?: number | null
          joined_date?: string | null
          last_name?: string
          member_type?: string
          name?: string
          nationality?: string
          player_position?: string | null
          position?: string
          social_media?: Json | null
          sponsor_id?: string | null
          staff_role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "people_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      season_competition: {
        Row: {
          competition_id: string | null
          created_at: string | null
          id: string
          season_id: string | null
          updated_at: string | null
        }
        Insert: {
          competition_id?: string | null
          created_at?: string | null
          id?: string
          season_id?: string | null
          updated_at?: string | null
        }
        Update: {
          competition_id?: string | null
          created_at?: string | null
          id?: string
          season_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_season_competition_competition"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_season_competition_season"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "season_competition_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "season_competition_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      seasons: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          is_current_season: boolean | null
          name: string
          start_date: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          is_current_season?: boolean | null
          name: string
          start_date: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          is_current_season?: boolean | null
          name?: string
          start_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          logo_dark_url: string | null
          logo_url: string | null
          name: string
          sanity_id: string | null
          tier: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          logo_dark_url?: string | null
          logo_url?: string | null
          name: string
          sanity_id?: string | null
          tier?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          logo_dark_url?: string | null
          logo_url?: string | null
          name?: string
          sanity_id?: string | null
          tier?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string | null
          founded_year: number | null
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          short_name: string | null
          stadium_name: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          founded_year?: number | null
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          short_name?: string | null
          stadium_name?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          founded_year?: number | null
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          short_name?: string | null
          stadium_name?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      vw_current_league_table: {
        Row: {
          draws: number | null
          form: string[] | null
          goal_difference: number | null
          goals_against: number | null
          goals_for: number | null
          id: string | null
          losses: number | null
          matches_played: number | null
          points: number | null
          position: number | null
          team_logo: string | null
          team_name: string | null
          team_short_name: string | null
          wins: number | null
        }
        Relationships: []
      }
      vw_latest_results: {
        Row: {
          away_score: number | null
          away_team: string | null
          away_team_logo: string | null
          competition: string | null
          competition_short: string | null
          home_score: number | null
          home_team: string | null
          home_team_logo: string | null
          id: string | null
          match_date: string | null
          match_report_link: string | null
          match_time: string | null
          season: string | null
          venue: string | null
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
          is_highlighted: boolean | null
          match_date: string | null
          match_time: string | null
          season: string | null
          ticket_link: string | null
          venue: string | null
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
