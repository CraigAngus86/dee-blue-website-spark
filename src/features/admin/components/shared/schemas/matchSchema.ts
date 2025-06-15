export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  type: 'text' | 'number' | 'select' | 'date' | 'time' | 'boolean' | 'textarea' | 'url';
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  defaultValue?: any;
  dataSource?: 'supabase' | 'sanity';
  tableName?: string;
  readOnlyInEdit?: boolean; // NEW: Show but disabled in EDIT mode
}

export const matchSchema: FieldConfig[] = [
  // FROZEN FIELDS IN EDIT (basic match creation data)
  {
    name: 'season_id',
    type: 'select',
    label: 'Season',
    required: true,
    readOnlyInEdit: true, // ✅ FROZEN in EDIT
    dataSource: 'supabase',
    tableName: 'seasons',
    options: [
      { value: '1', label: '2024/25' },
      { value: '2', label: '2023/24' },
      { value: '3', label: '2022/23' }
    ]
  },
  {
    name: 'competition_id',
    type: 'select',
    label: 'Competition',
    required: true,
    readOnlyInEdit: true, // ✅ FROZEN in EDIT
    dataSource: 'supabase',
    tableName: 'competitions',
    options: [
      { value: '1', label: 'Highland Football League' },
      { value: '2', label: 'Scottish FA Cup' },
      { value: '3', label: 'Highland League Cup' },
      { value: '4', label: 'Aberdeenshire Cup' },
      { value: '5', label: 'Premier Sports Cup' }
    ]
  },
  {
    name: 'home_team_id',
    type: 'select',
    label: 'Home Team',
    required: true,
    readOnlyInEdit: true, // ✅ FROZEN in EDIT
    dataSource: 'supabase',
    tableName: 'teams',
    options: [
      { value: '1', label: 'Banks o\' Dee' },
      { value: '2', label: 'Forres Mechanics' },
      { value: '3', label: 'Cove Rangers' },
      { value: '4', label: 'Brora Rangers' },
      { value: '5', label: 'Fraserburgh' },
      { value: '6', label: 'Inverurie Loco Works' },
      { value: '7', label: 'Keith' }
    ]
  },
  {
    name: 'away_team_id',
    type: 'select',
    label: 'Away Team',
    required: true,
    readOnlyInEdit: true, // ✅ FROZEN in EDIT
    dataSource: 'supabase',
    tableName: 'teams',
    options: [
      { value: '1', label: 'Banks o\' Dee' },
      { value: '2', label: 'Forres Mechanics' },
      { value: '3', label: 'Cove Rangers' },
      { value: '4', label: 'Brora Rangers' },
      { value: '5', label: 'Fraserburgh' },
      { value: '6', label: 'Inverurie Loco Works' },
      { value: '7', label: 'Keith' }
    ]
  },
  {
    name: 'match_date',
    type: 'date',
    label: 'Match Date',
    required: true,
    readOnlyInEdit: true, // ✅ FROZEN in EDIT
    dataSource: 'supabase',
    tableName: 'match'
  },
  {
    name: 'match_time',
    type: 'time',
    label: 'Kick-off Time',
    required: true,
    readOnlyInEdit: true, // ✅ FROZEN in EDIT
    dataSource: 'supabase',
    tableName: 'match'
  },
  {
    name: 'venue',
    type: 'text',
    label: 'Venue',
    required: true,
    readOnlyInEdit: true, // ✅ FROZEN in EDIT
    placeholder: 'Spain Park',
    defaultValue: 'Spain Park',
    dataSource: 'supabase',
    tableName: 'match'
  },
  
  // EDITABLE FIELDS IN BOTH ADD AND EDIT (match results and links)
  {
    name: 'home_score',
    type: 'number',
    label: 'Home Score',
    readOnlyInEdit: false, // ✅ EDITABLE in EDIT
    dataSource: 'supabase',
    tableName: 'match'
  },
  {
    name: 'away_score',
    type: 'number',
    label: 'Away Score',
    readOnlyInEdit: false, // ✅ EDITABLE in EDIT
    dataSource: 'supabase',
    tableName: 'match'
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    readOnlyInEdit: false, // ✅ EDITABLE in EDIT
    dataSource: 'supabase',
    tableName: 'match',
    defaultValue: 'scheduled',
    options: [
      { value: 'scheduled', label: 'Scheduled' },
      { value: 'completed', label: 'Completed' }
    ]
  },
  {
    name: 'hospitality_available',
    type: 'boolean',
    label: 'Hospitality Available',
    readOnlyInEdit: false, // ✅ EDITABLE in EDIT
    defaultValue: false,
    dataSource: 'supabase',
    tableName: 'match'
  },
  {
    name: 'is_highlighted',
    type: 'boolean',
    label: 'Featured Match',
    readOnlyInEdit: false, // ✅ EDITABLE in EDIT
    defaultValue: false,
    dataSource: 'supabase',
    tableName: 'match'
  },
  {
    name: 'ticket_link',
    type: 'url',
    label: 'Ticket Link',
    readOnlyInEdit: false, // ✅ EDITABLE in EDIT
    placeholder: 'https://...',
    dataSource: 'supabase',
    tableName: 'match'
  },
  {
    name: 'match_report_link',
    type: 'url',
    label: 'Match Report Link',
    readOnlyInEdit: false, // ✅ EDITABLE in EDIT
    placeholder: 'Link to Sanity news article',
    dataSource: 'supabase',
    tableName: 'match'
  },
  {
    name: 'gallery_idsanity',
    type: 'text',
    label: 'Gallery ID (Sanity)',
    readOnlyInEdit: false, // ✅ EDITABLE in EDIT
    placeholder: 'Sanity document ID',
    dataSource: 'supabase',
    tableName: 'match'
  },
  {
    name: 'match_sponsor_id',
    type: 'select',
    label: 'Match Sponsor',
    readOnlyInEdit: false, // ✅ EDITABLE in EDIT
    dataSource: 'supabase',
    tableName: 'match',
    options: [
      { value: '', label: 'No Sponsor' },
      { value: '1', label: 'Local Business A' },
      { value: '2', label: 'Local Business B' },
      { value: '3', label: 'Local Business C' }
    ]
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