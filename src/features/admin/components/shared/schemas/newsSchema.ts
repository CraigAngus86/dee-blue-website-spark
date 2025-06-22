import { FieldConfig, SelectOption } from '../types';

export const newsSchema: FieldConfig[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Article Title',
    required: true,
    placeholder: 'Enter article headline (8-10 words recommended)',
    validation: {
      wordCount: { min: 0, max: 10 }
    }
  },
  {
    name: 'category',
    type: 'select',
    label: 'Category',
    required: true,
    options: [
      { value: 'clubNews', label: 'Club News' },
      { value: 'teamNews', label: 'Team News' },
      { value: 'communityNews', label: 'Community News' },
      { value: 'commercialNews', label: 'Commercial News' }
    ]
  },
  {
    name: 'author',
    type: 'text',
    label: 'Author',
    required: true,
    defaultValue: 'Banks o\' Dee FC',
    placeholder: 'Article author name'
  },
  {
    name: 'mainImage',
    type: 'file',
    label: 'Main Image',
    placeholder: 'Upload hero image for article',
    validation: {
      fileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
      maxSize: 5 * 1024 * 1024
    }
  },
  {
    name: 'excerpt',
    type: 'textarea',
    label: 'Article Excerpt',
    required: true,
    placeholder: 'Brief summary (20 words max)',
    validation: {
      wordCount: { min: 1, max: 20 }
    }
  },
  {
    name: 'body',
    type: 'textarea',
    label: 'Article Content',
    required: true,
    placeholder: 'Write your article content here...'
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
    case 'news':
      return newsSchema;
    default:
      return [];
  }
};
