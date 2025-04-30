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
      commercial_bookings: {
        Row: {
          company_name: string | null
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          guest_count: number | null
          hospitality_package_id: string | null
          id: string
          match_id: string | null
          message: string | null
          package_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          guest_count?: number | null
          hospitality_package_id?: string | null
          id?: string
          match_id?: string | null
          message?: string | null
          package_id?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          guest_count?: number | null
          hospitality_package_id?: string | null
          id?: string
          match_id?: string | null
          message?: string | null
          package_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commercial_bookings_hospitality_package_id_fkey"
            columns: ["hospitality_package_id"]
            isOneToOne: false
            referencedRelation: "hospitality_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercial_bookings_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercial_bookings_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "vw_latest_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercial_bookings_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "vw_upcoming_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercial_bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "commercial_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      commercial_packages: {
        Row: {
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          image_url: string | null
          name: string
          price: number | null
          sanity_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          image_url?: string | null
          name: string
          price?: number | null
          sanity_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number | null
          sanity_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
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
      enquiries: {
        Row: {
          assigned_to: string | null
          attachments: string[] | null
          category: string | null
          company: string | null
          created_at: string | null
          email: string
          enquiry_type: string
          follow_up_date: string | null
          id: string
          is_confidential: boolean | null
          marketing_consent: boolean | null
          message: string | null
          name: string
          notes: string | null
          phone: string | null
          priority: number | null
          related_match_id: string | null
          resolved_at: string | null
          resolved_by: string | null
          response_text: string | null
          source: string | null
          status: Database["public"]["Enums"]["enquiry_status_type"]
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          attachments?: string[] | null
          category?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          enquiry_type: string
          follow_up_date?: string | null
          id?: string
          is_confidential?: boolean | null
          marketing_consent?: boolean | null
          message?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          priority?: number | null
          related_match_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          response_text?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["enquiry_status_type"]
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          attachments?: string[] | null
          category?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          enquiry_type?: string
          follow_up_date?: string | null
          id?: string
          is_confidential?: boolean | null
          marketing_consent?: boolean | null
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          priority?: number | null
          related_match_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          response_text?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["enquiry_status_type"]
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_related_match_id_fkey"
            columns: ["related_match_id"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enquiries_related_match_id_fkey"
            columns: ["related_match_id"]
            isOneToOne: false
            referencedRelation: "vw_latest_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enquiries_related_match_id_fkey"
            columns: ["related_match_id"]
            isOneToOne: false
            referencedRelation: "vw_upcoming_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiry_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          enquiry_id: string
          id: string
          new_status: Database["public"]["Enums"]["enquiry_status_type"]
          notes: string | null
          previous_status: Database["public"]["Enums"]["enquiry_status_type"]
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          enquiry_id: string
          id?: string
          new_status: Database["public"]["Enums"]["enquiry_status_type"]
          notes?: string | null
          previous_status: Database["public"]["Enums"]["enquiry_status_type"]
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          enquiry_id?: string
          id?: string
          new_status?: Database["public"]["Enums"]["enquiry_status_type"]
          notes?: string | null
          previous_status?: Database["public"]["Enums"]["enquiry_status_type"]
        }
        Relationships: [
          {
            foreignKeyName: "enquiry_status_history_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enquiry_status_history_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "vw_enquiries_dashboard"
            referencedColumns: ["id"]
          },
        ]
      }
      fan_of_month: {
        Row: {
          additional_photos: string[] | null
          cloudinary_public_id: string | null
          contact_consent: boolean | null
          contact_email: string | null
          created_at: string | null
          fan_story: string | null
          favorite_match: string | null
          favorite_player: string | null
          featured_home: boolean | null
          featured_month: string
          id: string
          image_url: string | null
          is_archived: boolean | null
          location: string | null
          memorable_moment: string | null
          metadata: Json | null
          name: string
          quote: string | null
          since_year: number | null
          social_media: Json | null
          updated_at: string | null
        }
        Insert: {
          additional_photos?: string[] | null
          cloudinary_public_id?: string | null
          contact_consent?: boolean | null
          contact_email?: string | null
          created_at?: string | null
          fan_story?: string | null
          favorite_match?: string | null
          favorite_player?: string | null
          featured_home?: boolean | null
          featured_month: string
          id?: string
          image_url?: string | null
          is_archived?: boolean | null
          location?: string | null
          memorable_moment?: string | null
          metadata?: Json | null
          name: string
          quote?: string | null
          since_year?: number | null
          social_media?: Json | null
          updated_at?: string | null
        }
        Update: {
          additional_photos?: string[] | null
          cloudinary_public_id?: string | null
          contact_consent?: boolean | null
          contact_email?: string | null
          created_at?: string | null
          fan_story?: string | null
          favorite_match?: string | null
          favorite_player?: string | null
          featured_home?: boolean | null
          featured_month?: string
          id?: string
          image_url?: string | null
          is_archived?: boolean | null
          location?: string | null
          memorable_moment?: string | null
          metadata?: Json | null
          name?: string
          quote?: string | null
          since_year?: number | null
          social_media?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fan_of_month_favorite_match_fkey"
            columns: ["favorite_match"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fan_of_month_favorite_match_fkey"
            columns: ["favorite_match"]
            isOneToOne: false
            referencedRelation: "vw_latest_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fan_of_month_favorite_match_fkey"
            columns: ["favorite_match"]
            isOneToOne: false
            referencedRelation: "vw_upcoming_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fan_of_month_favorite_player_fkey"
            columns: ["favorite_player"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      fan_uploads: {
        Row: {
          approved: boolean | null
          caption: string | null
          cloudinary_public_id: string | null
          cloudinary_version: number | null
          content_type: string | null
          created_at: string | null
          device_info: Json | null
          email: string | null
          featured_order: number | null
          id: string
          image_url: string
          is_featured: boolean | null
          location: string | null
          match_id: string | null
          moderation_by: string | null
          moderation_date: string | null
          moderation_feedback: string | null
          moderation_status:
            | Database["public"]["Enums"]["moderation_status_type"]
            | null
          tags: string[] | null
          updated_at: string | null
          user_name: string | null
        }
        Insert: {
          approved?: boolean | null
          caption?: string | null
          cloudinary_public_id?: string | null
          cloudinary_version?: number | null
          content_type?: string | null
          created_at?: string | null
          device_info?: Json | null
          email?: string | null
          featured_order?: number | null
          id?: string
          image_url: string
          is_featured?: boolean | null
          location?: string | null
          match_id?: string | null
          moderation_by?: string | null
          moderation_date?: string | null
          moderation_feedback?: string | null
          moderation_status?:
            | Database["public"]["Enums"]["moderation_status_type"]
            | null
          tags?: string[] | null
          updated_at?: string | null
          user_name?: string | null
        }
        Update: {
          approved?: boolean | null
          caption?: string | null
          cloudinary_public_id?: string | null
          cloudinary_version?: number | null
          content_type?: string | null
          created_at?: string | null
          device_info?: Json | null
          email?: string | null
          featured_order?: number | null
          id?: string
          image_url?: string
          is_featured?: boolean | null
          location?: string | null
          match_id?: string | null
          moderation_by?: string | null
          moderation_date?: string | null
          moderation_feedback?: string | null
          moderation_status?:
            | Database["public"]["Enums"]["moderation_status_type"]
            | null
          tags?: string[] | null
          updated_at?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fan_uploads_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fan_uploads_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "vw_latest_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fan_uploads_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "vw_upcoming_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitality_availability: {
        Row: {
          availability_status: string
          created_at: string | null
          id: string
          match_id: string | null
          package_id: string | null
          remaining_capacity: number | null
          updated_at: string | null
        }
        Insert: {
          availability_status: string
          created_at?: string | null
          id?: string
          match_id?: string | null
          package_id?: string | null
          remaining_capacity?: number | null
          updated_at?: string | null
        }
        Update: {
          availability_status?: string
          created_at?: string | null
          id?: string
          match_id?: string | null
          package_id?: string | null
          remaining_capacity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hospitality_availability_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hospitality_availability_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "vw_latest_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hospitality_availability_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "vw_upcoming_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hospitality_availability_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "hospitality_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitality_features: {
        Row: {
          created_at: string | null
          display_order: number | null
          feature_name: string
          feature_value: string
          id: string
          is_included: boolean | null
          package_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          feature_name: string
          feature_value: string
          id?: string
          is_included?: boolean | null
          package_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          feature_name?: string
          feature_value?: string
          id?: string
          is_included?: boolean | null
          package_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hospitality_features_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "hospitality_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitality_packages: {
        Row: {
          created_at: string | null
          description: string | null
          headline_price: string
          id: string
          image_url: string | null
          max_guests: number
          name: string
          price_per_person: number | null
          total_price: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          headline_price: string
          id?: string
          image_url?: string | null
          max_guests: number
          name: string
          price_per_person?: number | null
          total_price?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          headline_price?: string
          id?: string
          image_url?: string | null
          max_guests?: number
          name?: string
          price_per_person?: number | null
          total_price?: number | null
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
          name: string
          nationality: string
          player_position:
            | Database["public"]["Enums"]["player_position_type"]
            | null
          position: Database["public"]["Enums"]["position_type"] | null
          social_media: Json | null
          sponsor_id: string | null
          staff_role: Database["public"]["Enums"]["staff_role_type"] | null
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
          name: string
          nationality?: string
          player_position?:
            | Database["public"]["Enums"]["player_position_type"]
            | null
          position?: Database["public"]["Enums"]["position_type"] | null
          social_media?: Json | null
          sponsor_id?: string | null
          staff_role?: Database["public"]["Enums"]["staff_role_type"] | null
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
          name?: string
          nationality?: string
          player_position?:
            | Database["public"]["Enums"]["player_position_type"]
            | null
          position?: Database["public"]["Enums"]["position_type"] | null
          social_media?: Json | null
          sponsor_id?: string | null
          staff_role?: Database["public"]["Enums"]["staff_role_type"] | null
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
      poll_options: {
        Row: {
          created_at: string | null
          id: string
          option_text: string
          poll_id: string | null
          updated_at: string | null
          vote_count: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          option_text: string
          poll_id?: string | null
          updated_at?: string | null
          vote_count?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          option_text?: string
          poll_id?: string | null
          updated_at?: string | null
          vote_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_options_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poll_options_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "vw_active_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_votes: {
        Row: {
          created_at: string | null
          id: string
          ip_hash: string | null
          poll_option_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_hash?: string | null
          poll_option_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_hash?: string | null
          poll_option_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_votes_poll_option_id_fkey"
            columns: ["poll_option_id"]
            isOneToOne: false
            referencedRelation: "poll_options"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          active: boolean | null
          allow_multiple_votes: boolean | null
          archived: boolean | null
          category: string | null
          cloudinary_public_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          featured_order: number | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          metadata: Json | null
          question: string
          start_date: string | null
          total_votes: number | null
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          active?: boolean | null
          allow_multiple_votes?: boolean | null
          archived?: boolean | null
          category?: string | null
          cloudinary_public_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          featured_order?: number | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          metadata?: Json | null
          question: string
          start_date?: string | null
          total_votes?: number | null
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          active?: boolean | null
          allow_multiple_votes?: boolean | null
          archived?: boolean | null
          category?: string | null
          cloudinary_public_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          featured_order?: number | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          metadata?: Json | null
          question?: string
          start_date?: string | null
          total_votes?: number | null
          updated_at?: string | null
          visibility?: string | null
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
      webhook_logs: {
        Row: {
          created_at: string | null
          document_id: string
          document_type: string
          error_message: string | null
          event_type: string
          id: string
          operation: string
          payload: Json | null
          processed_at: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          document_id: string
          document_type: string
          error_message?: string | null
          event_type: string
          id?: string
          operation: string
          payload?: Json | null
          processed_at?: string | null
          status: string
        }
        Update: {
          created_at?: string | null
          document_id?: string
          document_type?: string
          error_message?: string | null
          event_type?: string
          id?: string
          operation?: string
          payload?: Json | null
          processed_at?: string | null
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      vw_active_polls: {
        Row: {
          category: string | null
          description: string | null
          end_date: string | null
          id: string | null
          image_url: string | null
          is_featured: boolean | null
          option_count: number | null
          question: string | null
          start_date: string | null
          total_votes: number | null
        }
        Relationships: []
      }
      vw_current_fan_of_month: {
        Row: {
          fan_story: string | null
          favorite_player_image: string | null
          favorite_player_name: string | null
          featured_month: string | null
          id: string | null
          image_url: string | null
          location: string | null
          memorable_moment: string | null
          name: string | null
          quote: string | null
          since_year: number | null
        }
        Relationships: []
      }
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
      vw_enquiries_dashboard: {
        Row: {
          assigned_to: string | null
          category: string | null
          company: string | null
          created_at: string | null
          email: string | null
          enquiry_type: string | null
          follow_up_date: string | null
          id: string | null
          name: string | null
          needs_followup: boolean | null
          phone: string | null
          priority: number | null
          resolved_at: string | null
          sort_priority: number | null
          status: Database["public"]["Enums"]["enquiry_status_type"] | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          enquiry_type?: string | null
          follow_up_date?: string | null
          id?: string | null
          name?: string | null
          needs_followup?: never
          phone?: string | null
          priority?: number | null
          resolved_at?: string | null
          sort_priority?: never
          status?: Database["public"]["Enums"]["enquiry_status_type"] | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          enquiry_type?: string | null
          follow_up_date?: string | null
          id?: string | null
          name?: string | null
          needs_followup?: never
          phone?: string | null
          priority?: number | null
          resolved_at?: string | null
          sort_priority?: never
          status?: Database["public"]["Enums"]["enquiry_status_type"] | null
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
      fn_record_poll_vote: {
        Args: { option_id: string; uid?: string; ip?: string }
        Returns: boolean
      }
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
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
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
      enquiry_status_type:
        | "new"
        | "in_progress"
        | "waiting_for_response"
        | "resolved"
        | "closed"
        | "spam"
      moderation_status_type: "pending" | "approved" | "rejected"
      player_position_type: "goalkeeper" | "defender" | "midfielder" | "forward"
      position_type: "player" | "staff"
      staff_role_type:
        | "manager"
        | "assistant manager"
        | "goalkeeping coach"
        | "coach"
        | "physio"
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
    Enums: {
      enquiry_status_type: [
        "new",
        "in_progress",
        "waiting_for_response",
        "resolved",
        "closed",
        "spam",
      ],
      moderation_status_type: ["pending", "approved", "rejected"],
      player_position_type: ["goalkeeper", "defender", "midfielder", "forward"],
      position_type: ["player", "staff"],
      staff_role_type: [
        "manager",
        "assistant manager",
        "goalkeeping coach",
        "coach",
        "physio",
      ],
    },
  },
} as const
