export interface SelectOption {
  value: string;
  label: string;
  shortName?: string;
  logoUrl?: string;
  type?: string;
  isCurrent?: boolean;
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
  dynamicSource?: 'teams' | 'competitions' | 'seasons';
  validation?: {
    wordCount?: { min: number; max: number };
    maxLength?: number;
    fileTypes?: string[];
    maxSize?: number;
  };
}

export const matchSchema: FieldConfig[] = [
  // FROZEN FIELDS IN EDIT (basic match creation data)
  {
    name: 'season_id',
    type: 'select',
    label: 'Season',
    required: true,
    readOnlyInEdit: true,
    dataSource: 'dynamic',
    dynamicSource: 'seasons',
    options: [] // Will be populated dynamically
  },
  {
    name: 'competition_id',
    type: 'select',
    label: 'Competition',
    required: true,
    readOnlyInEdit: true,
    dataSource: 'dynamic',
    dynamicSource: 'competitions',
    options: [] // Will be populated dynamically
  },
  {
    name: 'home_team_id',
    type: 'select',
    label: 'Home Team',
    required: true,
    readOnlyInEdit: true,
    dataSource: 'dynamic',
    dynamicSource: 'teams',
    options: [] // Will be populated dynamically
  },
  {
    name: 'away_team_id',
    type: 'select',
    label: 'Away Team',
    required: true,
    readOnlyInEdit: true,
    dataSource: 'dynamic',
    dynamicSource: 'teams',
    options: [] // Will be populated dynamically
  },
  {
    name: 'match_date',
    type: 'date',
    label: 'Match Date',
    required: true,
    readOnlyInEdit: true
  },
  {
    name: 'match_time',
    type: 'time',
    label: 'Kick-off Time',
    required: false,
    readOnlyInEdit: true,
    defaultValue: '15:00'
  },
  {
    name: 'venue',
    type: 'text',
    label: 'Venue',
    required: true,
    readOnlyInEdit: true,
    placeholder: 'Spain Park',
    defaultValue: 'Spain Park'
  },
  // EDITABLE FIELDS IN BOTH ADD AND EDIT (match results and links)
  {
    name: 'home_score',
    type: 'number',
    label: 'Home Score',
    readOnlyInEdit: false,
    placeholder: 'Home goals scored'
  },
  {
    name: 'away_score',
    type: 'number',
    label: 'Away Score',
    readOnlyInEdit: false,
    placeholder: 'Away goals scored'
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    readOnlyInEdit: false,
    defaultValue: 'scheduled',
    options: [
      { value: 'scheduled', label: 'Scheduled' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' }
    ]
  },
  {
    name: 'hospitality_available',
    type: 'boolean',
    label: 'Hospitality Available',
    readOnlyInEdit: false,
    defaultValue: false
  },
  {
    name: 'is_highlighted',
    type: 'boolean',
    label: 'Featured Match',
    readOnlyInEdit: false,
    defaultValue: false
  },
  {
    name: 'ticket_link',
    type: 'url',
    label: 'Ticket Link',
    readOnlyInEdit: false,
    placeholder: 'https://...'
  },
  {
    name: 'match_report_link',
    type: 'url',
    label: 'Match Report Link',
    readOnlyInEdit: false,
    placeholder: 'Link to Sanity news article'
  },
  {
    name: 'gallery_idsanity',
    type: 'text',
    label: 'Gallery ID (Sanity)',
    readOnlyInEdit: false,
    placeholder: 'Sanity document ID for match photos'
  },
  {
    name: 'match_sponsor_id',
    type: 'text',
    label: 'Match Sponsor ID',
    readOnlyInEdit: false,
    placeholder: 'Sanity sponsor document ID (optional)'
  }
];

export const getSchemaForEntity = (entityType: string): FieldConfig[] => {
  switch (entityType) {
    case 'match':
      return matchSchema;
    default:
      return [];
  }
};
