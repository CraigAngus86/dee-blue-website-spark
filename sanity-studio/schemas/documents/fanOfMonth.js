export default {
  name: 'fanOfMonth',
  title: 'Fan of the Month',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'media',
      title: 'Media',
    }
  ],
  fields: [
    {
      name: 'fanName',
      title: 'Fan Name',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Loyal Legend', value: 'loyal_legend'},
          {title: 'Rising Together', value: 'rising_together'},
          {title: 'Community Champion', value: 'community_champion'},
          {title: 'Match Day Magic', value: 'match_day_magic'},
          {title: 'Next Generation', value: 'next_generation'}
        ]
      },
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'supporterSince',
      title: 'Supporter Since',
      type: 'number',
      description: 'Year they started supporting (e.g., 1998)',
      group: 'basic'
    },
    {
      name: 'story',
      title: 'Fan Story',
      type: 'text',
      validation: Rule => Rule.required(),
      group: 'content'
    },
    {
      name: 'excerpt',
      title: 'Story Excerpt',
      type: 'text',
      description: 'Short version for homepage display (max 150 chars)',
      validation: Rule => Rule.max(150),
      group: 'content'
    },
    {
      name: 'photo',
      title: 'Featured Photo',
      type: 'cloudinary.asset',
      validation: Rule => Rule.required(),
      group: 'media'
    },
    {
      name: 'month',
      title: 'Featured Month',
      type: 'date',
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'isActive',
      title: 'Currently Featured',
      type: 'boolean',
      initialValue: false,
      group: 'basic'
    },
    {
      name: 'socialPermissions',
      title: 'Social Media Permissions Granted',
      type: 'boolean',
      initialValue: true,
      group: 'media'
    },
    {
      name: 'vipExperience',
      title: 'VIP Experience',
      type: 'object',
      fields: [
        {
          name: 'completed',
          title: 'VIP Experience Completed',
          type: 'boolean'
        },
        {
          name: 'date',
          title: 'Experience Date',
          type: 'date'
        },
        {
          name: 'notes',
          title: 'Experience Notes',
          type: 'text'
        }
      ],
      group: 'content'
    }
  ],
  preview: {
    select: {
      title: 'fanName',
      media: 'photo',
      category: 'category',
      month: 'month'
    },
    prepare({title, media, category, month}) {
      const displayMonth = month 
        ? new Date(month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'No date';
      const categoryTitle = category ? category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
        
      return {
        title,
        media,
        subtitle: `${categoryTitle} - ${displayMonth}`
      }
    }
  },
  orderings: [
    {
      title: 'Month, Recent',
      name: 'monthDesc',
      by: [
        {field: 'month', direction: 'desc'}
      ]
    }
  ]
}
