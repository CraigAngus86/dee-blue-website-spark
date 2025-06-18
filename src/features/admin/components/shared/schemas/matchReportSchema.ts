import { FieldConfig, SelectOption } from './newsSchema';

export const matchReportSchema: FieldConfig[] = [
  {
    name: 'matchId',
    type: 'select',
    label: 'Select Match',
    required: true,
    placeholder: 'Choose match for report...',
    dynamicSource: 'recentMatches', // Will be populated from vw_recent_matches_admin
    options: [] // Populated dynamically
  },
  {
    name: 'title',
    type: 'text',
    label: 'Report Headline',
    required: true,
    placeholder: 'Auto-generated from match selection (max 10 words)',
    readOnlyInEdit: true, // Auto-generated, user cannot edit
    validation: {
      wordCount: { min: 1, max: 10 }
    }
  },
  {
    name: 'excerpt',
    type: 'textarea',
    label: 'Report Summary',
    required: true,
    placeholder: 'Brief match summary or key highlight (20 words max)',
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
    placeholder: 'Report author name'
  },
  {
    name: 'mainImage',
    type: 'file',
    label: 'Main Image',
    required: true,
    placeholder: 'Upload hero image for match report',
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

export const getSchemaForEntity = (entityType: string): FieldConfig[] => {
  switch (entityType) {
    case 'matchReport':
      return matchReportSchema;
    default:
      return [];
  }
};
