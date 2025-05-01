
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Add your Supabase tables as needed
      // This is a placeholder structure that can be updated later
      [key: string]: {
        Row: {}
        Insert: {}
        Update: {}
        Relationships: []
      }
    }
    Views: {
      [key: string]: {
        Row: {}
        Relationships: []
      }
    }
    Functions: {
      [key: string]: {
        Args: {}
        Returns: {}
      }
    }
    Enums: {
      [key: string]: string[]
    }
  }
}
