import { FieldConfig } from '../types';

export const sponsorSchema: FieldConfig[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Sponsor Name',
    required: true,
    placeholder: 'Enter sponsor/company name',
    validation: {
      minLength: 2,
      maxLength: 100
    }
  },
  {
    name: 'website',
    type: 'url',
    label: 'Website URL',
    placeholder: 'https://example.com',
    validation: {
      pattern: /^https?:\/\/.+/,
      message: 'Must be a valid URL starting with http:// or https://'
    }
  },
  {
    name: 'primaryTier',
    type: 'select',
    label: 'Primary Sponsorship Tier',
    required: true,
    options: [
      { value: 'principal', label: 'Principal Partner' },
      { value: 'main', label: 'Main Sponsor' },
      { value: 'partner', label: 'Official Partner' }
    ]
  },
  {
    name: 'isActive',
    type: 'boolean',
    label: 'Active Sponsor',
    defaultValue: true
  },
  {
    name: 'startDate',
    type: 'date',
    label: 'Partnership Start Date',
    placeholder: 'Contract start date'
  },
  {
    name: 'endDate',
    type: 'date',
    label: 'Partnership End Date',
    placeholder: 'Contract end date (leave empty for ongoing)'
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Brief description of the partnership (optional)',
    validation: {
      maxLength: 300
    }
  },
  {
    name: 'logo',
    type: 'file',
    label: 'Sponsor Logo',
    placeholder: 'Upload sponsor logo (JPG/PNG, max 5MB)',
    validation: {
      fileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
      maxSize: 5 * 1024 * 1024 // 5MB
    }
  },
  // Additional sponsor types section
  {
    name: 'isMatchSponsor',
    type: 'boolean',
    label: 'Match Sponsor',
    defaultValue: false,
    helpText: 'Enable to sponsor individual matches'
  },
  {
    name: 'selectedMatches',
    type: 'multiselect',
    label: 'Sponsored Matches',
    placeholder: 'Select matches to sponsor...',
    dynamicSource: 'upcomingMatches', // Will be populated from Supabase
    options: [], // Populated dynamically
    conditional: {
      field: 'isMatchSponsor',
      value: true,
      operator: 'equals'
    },
    helpText: 'Select upcoming matches to sponsor (logo will appear on match cards)'
  },
  {
    name: 'isPlayerSponsor',
    type: 'boolean',
    label: 'Player Sponsor',
    defaultValue: false,
    helpText: 'Enable to sponsor individual players'
  },
  {
    name: 'selectedPlayers',
    type: 'multiselect',
    label: 'Sponsored Players',
    placeholder: 'Select players to sponsor...',
    dynamicSource: 'activePlayers', // Will be populated from Sanity
    options: [], // Populated dynamically
    conditional: {
      field: 'isPlayerSponsor',
      value: true,
      operator: 'equals'
    },
    helpText: 'Select players to sponsor (logo will appear on player profiles)'
  }
];

export const getSchemaForEntity = (entityType: string): FieldConfig[] => {
  switch (entityType) {
    case 'sponsor':
      return sponsorSchema;
    default:
      return [];
  }
};

// Helper function to validate tier limits
export const validateTierLimits = (primaryTier: string, currentSponsors: any[], editingId?: string): string | null => {
  const activeTierSponsors = currentSponsors.filter(s =>
    s.primaryTier === primaryTier &&
    s.isActive &&
    s._id !== editingId
  );

  if (primaryTier === 'principal' && activeTierSponsors.length >= 1) {
    return 'Maximum 1 Principal Partner allowed. Current: 1/1';
  }

  if (primaryTier === 'main' && activeTierSponsors.length >= 2) {
    return 'Maximum 2 Main Sponsors allowed. Current: 2/2';
  }

  return null; // Partners are unlimited
};
