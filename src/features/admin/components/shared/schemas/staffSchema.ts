import { FieldConfig } from '../types';

export const staffSchema: FieldConfig[] = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    required: true,
    placeholder: 'Enter staff first name',
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
    placeholder: 'Enter staff last name',
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
    placeholder: 'Enter staff nationality',
    defaultValue: 'Scotland',
    validation: {
      maxLength: 50
    }
  },
  {
    name: 'staffType',
    type: 'select',
    label: 'Staff Category',
    required: true,
    placeholder: 'Select staff category',
    options: [
      { value: 'manager', label: 'Management' },
      { value: 'coach', label: 'Coaching Staff' },
      { value: 'staff', label: 'Support Staff' }
    ]
  },
  {
    name: 'staffRole',
    type: 'select',
    label: 'Specific Role',
    required: true,
    placeholder: 'Select specific role',
    options: [
      { value: 'manager', label: 'Manager' },
      { value: 'assistant_manager', label: 'Assistant Manager' },
      { value: 'coach', label: 'Coach' },
      { value: 'gk_coach', label: 'Goalkeeper Coach' },
      { value: 'fitness_coach', label: 'Fitness Coach' },
      { value: 'physio', label: 'Physiotherapist' },
      { value: 'doctor', label: 'Club Doctor' },
      { value: 'kit_manager', label: 'Kit Manager' },
      { value: 'director', label: 'Director' },
      { value: 'chairman', label: 'Chairman' },
      { value: 'secretary', label: 'Secretary' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    name: 'profileImage',
    type: 'file',
    label: 'Staff Photo',
    required: false, // FIXED: Not required in edit mode
    placeholder: 'Upload professional headshot (JPG/PNG, max 5MB)',
    validation: {
      fileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
      maxSize: 5 * 1024 * 1024, // 5MB
      message: 'Please upload a JPG or PNG image under 5MB'
    },
    helpText: 'Professional headshot with face detection optimization. Required for new staff, optional when editing.'
  },
  {
    name: 'extendedBio',
    type: 'textarea',
    label: 'Staff Biography',
    placeholder: 'Professional background, qualifications, coaching experience, and key achievements...',
    helpText: 'Plain text biography (converted to rich text automatically). Include qualifications, experience, and achievements.'
  },
  // Social Media Section - Same as players
  {
    name: 'twitter',
    type: 'text',
    label: 'Twitter Handle',
    placeholder: '@staffname or full Twitter URL',
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
    placeholder: '@staffname or full Instagram URL',
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
    helpText: 'Optional. Full LinkedIn profile URL (recommended for professional staff)'
  },
  {
    name: 'website',
    type: 'url',
    label: 'Professional Website',
    placeholder: 'https://coach-website.com',
    validation: {
      maxLength: 200,
      pattern: /^https?:\/\/.+/,
      message: 'Must be a valid URL starting with http:// or https://'
    },
    helpText: 'Optional. Professional website, coaching portfolio, or business URL'
  }
];

export const getSchemaForEntity = (entityType: string): FieldConfig[] => {
  switch (entityType) {
    case 'staff':
      return staffSchema;
    default:
      return [];
  }
};

// Helper function for form validation
export const validateStaffForm = (formData: any): string | null => {
  // Additional custom validation beyond field-level validation
  
  // Check if first and last name are different
  if (formData.firstName && formData.lastName && 
      formData.firstName.toLowerCase() === formData.lastName.toLowerCase()) {
    return 'First name and last name should be different';
  }
  
  // Validate staffType and staffRole compatibility
  const typeRoleMap: { [key: string]: string[] } = {
    'manager': ['manager', 'assistant_manager', 'director', 'chairman'],
    'coach': ['coach', 'gk_coach', 'fitness_coach'],
    'staff': ['physio', 'doctor', 'kit_manager', 'secretary', 'other']
  };
  
  if (formData.staffType && formData.staffRole) {
    const validRoles = typeRoleMap[formData.staffType] || [];
    if (!validRoles.includes(formData.staffRole)) {
      return `Selected role "${formData.staffRole}" is not valid for category "${formData.staffType}"`;
    }
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
