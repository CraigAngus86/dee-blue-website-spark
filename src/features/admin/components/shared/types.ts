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
  // Added for player selection
  firstName?: string;
  lastName?: string;
  position?: string;
  hasImage?: boolean;
}

export interface FieldConfig {
  name: string;
  type: 'text' | 'number' | 'select' | 'date' | 'time' | 'boolean' | 'textarea' | 'url' | 'datetime' | 'file' | 'multiselect'; // ADDED multiselect
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  defaultValue?: any;
  dataSource?: 'supabase' | 'sanity' | 'dynamic';
  tableName?: string;
  readOnlyInEdit?: boolean;
  dynamicSource?: 'teams' | 'competitions' | 'seasons' | 'recentMatches' | 'upcomingMatches' | 'activePlayers'; // ADDED new sources
  readOnly?: boolean;
  multiple?: boolean; // Added for bulk file uploads
  conditional?: {
    field: string;
    value: any;
    operator: 'equals' | 'not_equals' | 'includes' | 'greater_than' | 'less_than';
  };
  helpText?: string;
  validation?: {
    wordCount?: { min: number; max: number };
    maxLength?: number;
    minLength?: number; // ADDED for minimum length validation
    fileTypes?: string[];
    maxSize?: number;
    maxFiles?: number;
    pattern?: RegExp; // ADDED for regex pattern validation
    message?: string; // ADDED for custom validation messages
  };
}

// UPDATED: Added 'player' and 'staff' entity types
export interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: 'match' | 'fanSubmission' | 'news' | 'matchReport' | 'matchGallery' | 'poll' | 'businessEnquiry' | 'sponsor' | 'player' | 'staff';
  mode: 'add' | 'edit' | 'delete';
  recordId?: string;
  onSuccess?: () => void;
}
