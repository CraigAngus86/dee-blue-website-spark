export default {
    name: 'matchGallery',
    title: 'Match Gallery',
    type: 'document',
    groups: [
      {
        name: 'basic',
        title: 'Basic Information',
      },
      {
        name: 'photos',
        title: 'Photos',
      },
      {
        name: 'reference',
        title: 'Database Reference',
      },
    ],
    fields: [
      {
        name: 'supabaseId',
        title: 'Supabase ID',
        type: 'string',
        description: 'UUID from Supabase for the match',
        validation: Rule => Rule.required().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
          name: 'UUID',
          invert: false,
          message: 'Must be a valid UUID format'
        }),
        group: 'reference'
      },
      {
        name: 'matchId',
        title: 'Match ID (Legacy)',
        type: 'string',
        description: 'Legacy ID field - use supabaseId instead',
        hidden: true,
        group: 'reference'
      },
      {
        name: 'title',
        title: 'Gallery Title',
        type: 'string',
        validation: Rule => Rule.required(),
        group: 'basic'
      },
      {
        name: 'description',
        title: 'Gallery Description',
        type: 'text',
        rows: 3,
        group: 'basic'
      },
      {
        name: 'matchDate',
        title: 'Match Date',
        type: 'date',
        description: 'Date of the match (for reference only)',
        group: 'basic'
      },
      {
        name: 'coverImage',
        title: 'Cover Image',
        type: 'image',
        options: {
          hotspot: true
        },
        description: 'Main image for the gallery',
        group: 'photos'
      },
      {
        name: 'photos',
        title: 'Match Photos',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true
                }
              },
              {
                name: 'caption',
                title: 'Caption',
                type: 'string'
              },
              {
                name: 'category',
                title: 'Category',
                type: 'string',
                options: {
                  list: [
                    {title: 'Pre-Match', value: 'pre-match'},
                    {title: 'Action', value: 'action'},
                    {title: 'Goal', value: 'goal'},
                    {title: 'Celebration', value: 'celebration'},
                    {title: 'Fans', value: 'fans'},
                    {title: 'Post-Match', value: 'post-match'}
                  ]
                }
              },
              {
                name: 'playerIds',
                title: 'Featured Players',
                type: 'array',
                of: [{type: 'string'}],
                description: 'Supabase IDs of players featured in this photo'
              }
            ],
            preview: {
              select: {
                media: 'image',
                caption: 'caption',
                category: 'category'
              },
              prepare({media, caption, category}) {
                return {
                  title: caption || 'No caption',
                  media,
                  subtitle: category
                }
              }
            }
          }
        ],
        group: 'photos'
      },
      {
        name: 'photographer',
        title: 'Photographer',
        type: 'string',
        description: 'Name of photographer for attribution',
        group: 'basic'
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        group: 'basic'
      }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'coverImage',
        date: 'matchDate'
      },
      prepare({title, media, date}) {
        return {
          title,
          media,
          subtitle: date ? new Date(date).toLocaleDateString() : 'No date'
        }
      }
    },
    orderings: [
      {
        title: 'Match Date, Recent',
        name: 'matchDateDesc',
        by: [
          {field: 'matchDate', direction: 'desc'}
        ]
      }
    ]
  }
