import { FieldConfig } from '../types';

export const playerSchema: FieldConfig[] = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    required: true,
    placeholder: 'Enter player first name',
    validation: {
      minLength: 2,
      maxLength: 50,
      message: 'First name must be between 2-50 characters'
    }
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    required: true,
    placeholder: 'Enter player last name',
    validation: {
      minLength: 2,
      maxLength: 50,
      message: 'Last name must be between 2-50 characters'
    }
  },
  {
    name: 'nationality',
    type: 'text',
    label: 'Nationality',
    placeholder: 'Enter player nationality',
    defaultValue: 'Scotland',
    validation: {
      maxLength: 50
    }
  },
  {
    name: 'playerPosition',
    type: 'select',
    label: 'Playing Position',
    required: true,
    placeholder: 'Select player position',
    options: [
      { value: 'goalkeeper', label: 'Goalkeeper' },
      { value: 'defender', label: 'Defender' },
      { value: 'midfielder', label: 'Midfielder' },
      { value: 'forward', label: 'Forward' }
    ]
  },
  {
    name: 'isYouthProduct',
    type: 'boolean',
    label: 'Made in Dee (Youth Graduate)',
    defaultValue: false,
    helpText: 'Check if player came through Banks o\' Dee youth system'
  },
  {
    name: 'profileImage',
    type: 'file',
    label: 'Player Photo',
    required: false, // FIXED: Not required in edit mode
    placeholder: 'Upload professional headshot (JPG/PNG, max 5MB)',
    validation: {
      fileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
      maxSize: 5 * 1024 * 1024, // 5MB
      message: 'Please upload a JPG or PNG image under 5MB'
    },
    helpText: 'Face detection enabled for optimal cropping. Professional headshot recommended. Required for new players, optional when editing.'
  },
  {
    name: 'extendedBio',
    type: 'textarea',
    label: 'Player Biography',
    placeholder: 'Brief player background, career highlights, and key achievements...',
        helpText: 'Plain text biography (converted to rich text automatically). Include playing style, achievements, or background.'
  },
  // Social Media Section
  {
    name: 'twitter',
    type: 'text',
    label: 'Twitter Handle',
    placeholder: '@playername or full Twitter URL',
    validation: {
      maxLength: 100,
      pattern: /^(@[\w]+|https?:\/\/(www\.)?twitter\.com\/[\w]+|)$/,
      message: 'Enter @username or full Twitter URL'
    },
    helpText: 'Optional. Enter @username or full Twitter URL'
  },
  {
    name: 'facebook',
    type: 'text',
    label: 'Facebook Profile',
    placeholder: 'Facebook profile or page URL',
    validation: {
      maxLength: 200,
      pattern: /^(https?:\/\/(www\.)?facebook\.com\/[\w\.\-]+|)$/,
      message: 'Enter full Facebook URL'
    },
    helpText: 'Optional. Full Facebook profile or page URL'
  },
  {
    name: 'instagram',
    type: 'text',
    label: 'Instagram Handle',
    placeholder: '@playername or full Instagram URL',
    validation: {
      maxLength: 100,
      pattern: /^(@[\w\.]+|https?:\/\/(www\.)?instagram\.com\/[\w\.]+|)$/,
      message: 'Enter @username or full Instagram URL'
    },
    helpText: 'Optional. Enter @username or full Instagram URL'
  },
  {
    name: 'linkedin',
    type: 'text',
    label: 'LinkedIn Profile',
    placeholder: 'LinkedIn profile URL',
    validation: {
      maxLength: 200,
      pattern: /^(https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-]+|)$/,
      message: 'Enter full LinkedIn profile URL'
    },
    helpText: 'Optional. Full LinkedIn profile URL'
  },
  {
    name: 'website',
    type: 'url',
    label: 'Personal Website',
    placeholder: 'https://player-website.com',
    validation: {
      maxLength: 200,
      pattern: /^https?:\/\/.+/,
      message: 'Must be a valid URL starting with http:// or https://'
    },
    helpText: 'Optional. Personal website or portfolio URL'
  }
];

export const getSchemaForEntity = (entityType: string): FieldConfig[] => {
  switch (entityType) {
    case 'player':
      return playerSchema;
    default:
      return [];
  }
};

// Helper function for form validation
export const validatePlayerForm = (formData: any): string | null => {
  // Additional custom validation beyond field-level validation
  
  // Check if first and last name are different
  if (formData.firstName && formData.lastName && 
      formData.firstName.toLowerCase() === formData.lastName.toLowerCase()) {
    return 'First name and last name should be different';
  }
  
  // Validate social media handles don't duplicate
  const socialHandles = [
    formData.twitter?.replace('@', '').toLowerCase(),
    formData.instagram?.replace('@', '').toLowerCase()
  ].filter(Boolean);
  
  if (socialHandles.length !== new Set(socialHandles).size) {
    return 'Twitter and Instagram handles cannot be the same';
  }
  
  return null; // No validation errors
};
