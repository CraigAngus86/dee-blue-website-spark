import { FieldConfig, SelectOption } from '../types';

export const matchGallerySchema: FieldConfig[] = [
  {
    name: 'matchId',
    type: 'select',
    label: 'Select Match',
    required: true,
    placeholder: 'Choose match for gallery...',
    dynamicSource: 'recentMatches', // Will be populated from vw_recent_matches_admin
    options: [] // Populated dynamically
  },
  {
    name: 'title',
    type: 'text',
    label: 'Gallery Title',
    required: true,
    placeholder: 'Auto-generated from match selection (max 10 words)',
    readOnlyInEdit: true, // Auto-generated, user cannot edit
    validation: {
      wordCount: { min: 1, max: 10 }
    }
  },
  {
    name: 'folderName',
    type: 'text',
    label: 'Cloudinary Folder',
    required: true,
    placeholder: 'Auto-generated: YYMMDD_HomeTeam_AwayTeam',
    readOnlyInEdit: true, // Auto-generated, user cannot edit
    readOnly: true // Always read-only for user
  },
  {
    name: 'excerpt',
    type: 'textarea',
    label: 'Gallery Description',
    required: true,
    placeholder: 'Brief gallery description or match highlights (20 words max)',
    validation: {
      wordCount: { min: 1, max: 20 }
    }
  },
  {
    name: 'author',
    type: 'text',
    label: 'Photographer/Author',
    required: true,
    defaultValue: 'Banks o\' Dee FC',
    placeholder: 'Gallery photographer/creator name'
  },
  {
    name: 'photos',
    type: 'file',
    label: 'Match Photos',
    required: true,
    multiple: true, // Enable bulk upload - NOW SUPPORTED!
    placeholder: 'Upload match photos (max 50 files, 5MB each)',
    validation: {
      fileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
      maxSize: 5 * 1024 * 1024, // 5MB per file
      maxFiles: 50 // Maximum 50 photos
    }
  },
  {
    name: 'coverImage',
    type: 'file',
    label: 'Cover Photo',
    required: true,
    placeholder: 'Upload gallery cover photo (shown in previews)',
    validation: {
      fileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
      maxSize: 5 * 1024 * 1024 // 5MB
    }
  },
  {
    name: 'publishedAt',
    type: 'datetime',
    label: 'Publication Date & Time',
    placeholder: 'Leave empty for draft'
  },
  {
    name: 'seoMetaTitle',
    type: 'text',
    label: 'SEO Meta Title',
    placeholder: 'Optional SEO title (60 chars max)',
    validation: {
      maxLength: 60
    }
  },
  {
    name: 'seoMetaDescription',
    type: 'textarea',
    label: 'SEO Meta Description',
    placeholder: 'Optional SEO description (160 chars max)',
    validation: {
      maxLength: 160
    }
  }
];

// Auto-generation functions (called from modal)
export const generateGalleryTitle = (homeTeam: string, awayTeam: string): string => {
  return `${homeTeam} v ${awayTeam} Gallery`;
};

export const generateFolderName = (matchDate: string, homeTeam: string, awayTeam: string): string => {
  // Format: YYMMDD_HomeTeam_AwayTeam
  const date = new Date(matchDate);
  const yy = date.getFullYear().toString().slice(-2);
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  
  // Clean team names (remove special characters, replace spaces with underscores)
  const cleanHome = homeTeam.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
  const cleanAway = awayTeam.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
  
  return `${yy}${mm}${dd}_${cleanHome}_${cleanAway}`;
};

export const getSchemaForEntity = (entityType: string): FieldConfig[] => {
  switch (entityType) {
    case 'matchGallery':
      return matchGallerySchema;
    default:
      return [];
  }
};
