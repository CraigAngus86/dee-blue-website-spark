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
      competitions_backup_20250427: {
        Row: {
          id: string | null
          logo: string | null
          name: string | null
        }
        Insert: {
          id?: string | null
          logo?: string | null
          name?: string | null
        }
        Update: {
          id?: string | null
          logo?: string | null
          name?: string | null
        }
        Relationships: []
      }
      league_standings_backup_20250427: {
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
          id: string
          is_highlighted: boolean | null
          match_date: string
          match_report_link: string | null
          match_time: string | null
          season_id: string | null
          status: string | null
          ticket_link: string | null
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
          id?: string
          is_highlighted?: boolean | null
          match_date: string
          match_report_link?: string | null
          match_time?: string | null
          season_id?: string | null
          status?: string | null
          ticket_link?: string | null
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
          id?: string
          is_highlighted?: boolean | null
          match_date?: string
          match_report_link?: string | null
          match_time?: string | null
          season_id?: string | null
          status?: string | null
          ticket_link?: string | null
          updated_at?: string | null
          venue?: string | null
        }
        Relationships: [
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
            foreignKeyName: "match_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      match_backup_20250427: {
        Row: {
          away_score: number | null
          away_team_id: string | null
          competition_id: string | null
          created_at: string | null
          date: string | null
          home_score: number | null
          home_team_id: string | null
          id: string | null
          import_date: string | null
          is_home: boolean | null
          is_latest_result: boolean | null
          is_next_match: boolean | null
          season: string | null
          source: string | null
          status: string | null
          ticket_link: string | null
          time: string | null
          updated_at: string | null
          venue: string | null
        }
        Insert: {
          away_score?: number | null
          away_team_id?: string | null
          competition_id?: string | null
          created_at?: string | null
          date?: string | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string | null
          import_date?: string | null
          is_home?: boolean | null
          is_latest_result?: boolean | null
          is_next_match?: boolean | null
          season?: string | null
          source?: string | null
          status?: string | null
          ticket_link?: string | null
          time?: string | null
          updated_at?: string | null
          venue?: string | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: string | null
          competition_id?: string | null
          created_at?: string | null
          date?: string | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string | null
          import_date?: string | null
          is_home?: boolean | null
          is_latest_result?: boolean | null
          is_next_match?: boolean | null
          season?: string | null
          source?: string | null
          status?: string | null
          ticket_link?: string | null
          time?: string | null
          updated_at?: string | null
          venue?: string | null
        }
        Relationships: []
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
      teams_backup_20250427: {
        Row: {
          id: string | null
          logo: string | null
          name: string | null
          short_name: string | null
        }
        Insert: {
          id?: string | null
          logo?: string | null
          name?: string | null
          short_name?: string | null
        }
        Update: {
          id?: string | null
          logo?: string | null
          name?: string | null
          short_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
