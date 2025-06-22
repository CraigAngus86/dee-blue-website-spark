// UNIFIED INTERFACES FOR ALL SCHEMAS
export interface SelectOption {
  value: string;
  label: string;
  shortName?: string;
  logoUrl?: string;
  type?: string;
  isCurrent?: boolean;
  // Added missing properties for match selection
  matchDate?: string;
  homeTeam?: string;
  awayTeam?: string;
}

export interface FieldConfig {
  name: string;
  type: 'text' | 'number' | 'select' | 'date' | 'time' | 'boolean' | 'textarea' | 'url' | 'datetime' | 'file';
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  defaultValue?: any;
  dataSource?: 'supabase' | 'sanity' | 'dynamic';
  tableName?: string;
  readOnlyInEdit?: boolean;
  dynamicSource?: 'teams' | 'competitions' | 'seasons' | 'recentMatches'; // UNIFIED - all possible values
  readOnly?: boolean;
  multiple?: boolean; // Added for bulk file uploads
  validation?: {
    wordCount?: { min: number; max: number };
    maxLength?: number;
    fileTypes?: string[];
    maxSize?: number;
    maxFiles?: number;
  };
}
