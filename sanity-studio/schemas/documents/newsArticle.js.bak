export default {
    name: 'newsArticle',
    title: 'News Article',
    type: 'document',
    groups: [
      {
        name: 'content',
        title: 'Content',
      },
      {
        name: 'metadata',
        title: 'Metadata',
      },
      {
        name: 'relations',
        title: 'Relations',
      },
    ],
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required(),
        group: 'content'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        validation: Rule => Rule.required(),
        group: 'metadata'
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        group: 'metadata'
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            {title: 'Match Report', value: 'matchReport'},
            {title: 'Club News', value: 'clubNews'},
            {title: 'Team News', value: 'teamNews'},
            {title: 'Community News', value: 'communityNews'},
            {title: 'Commercial News', value: 'commercialNews'},
          ]
        },
        validation: Rule => Rule.required(),
        group: 'metadata'
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'mainImage',
        group: 'content'
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        rows: 3,
        description: 'A short summary of the article (used for previews)',
        validation: Rule => Rule.max(200),
        group: 'content'
      },
      {
        name: 'body',
        title: 'Body Content',
        type: 'bodyContent',
        group: 'content'
      },
      {
        name: 'author',
        title: 'Author',
        type: 'string',
        group: 'metadata'
      },
      {
        name: 'relatedMatchId',
        title: 'Related Match ID',
        type: 'string',
        description: 'UUID of related match in Supabase (if this is a match report)',
        group: 'relations'
      },
      {
        name: 'relatedPeopleIds',
        title: 'Related People IDs',
        type: 'array',
        of: [{type: 'string'}],
        description: 'UUIDs of related people in Supabase',
        group: 'relations'
      },
      {
        name: 'isFeature',
        title: 'Feature Article',
        type: 'boolean',
        description: 'Mark this as a featured article to highlight it on the homepage',
        group: 'metadata'
      },
      {
        name: 'gallery',
        title: 'Image Gallery',
        type: 'gallery',
        group: 'content'
      },
      {
        name: 'seo',
        title: 'SEO & Social Sharing',
        type: 'object',
        group: 'metadata',
        fields: [
          {
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            description: 'Override the default title for search engines'
          },
          {
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 3,
            description: 'Description for search engines',
            validation: Rule => Rule.max(160)
          },
          {
            name: 'shareImage',
            title: 'Social Share Image',
            type: 'image',
            description: 'Image used when sharing on social media (defaults to main image if not set)'
          }
        ]
      }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'mainImage',
        category: 'category',
        date: 'publishedAt'
      },
      prepare({title, media, category, date}) {
        const categories = {
          matchReport: 'Match Report',
          clubNews: 'Club News',
          teamNews: 'Team News',
          communityNews: 'Community News',
          commercialNews: 'Commercial News'
        }
        
        return {
          title,
          media,
          subtitle: `${categories[category] || category} - ${date ? new Date(date).toLocaleDateString() : 'Draft'}`
        }
      }
    },
    orderings: [
      {
        title: 'Publish Date, New',
        name: 'publishDateDesc',
        by: [
          {field: 'publishedAt', direction: 'desc'}
        ]
      }
    ]
  }