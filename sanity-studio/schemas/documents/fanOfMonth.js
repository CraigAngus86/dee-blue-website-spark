
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
        description: 'UUID from Supabase for this fan (if applicable)',
        validation: Rule => Rule.regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
          name: 'UUID',
          invert: false,
          message: 'Must be a valid UUID format (example: 123e4567-e89b-12d3-a456-426614174000)'
        }),
        group: 'reference'
      },
      {
        name: 'fanId',
        title: 'Fan ID (Legacy)',
        type: 'string',
        description: 'Legacy ID field - use supabaseId instead',
        hidden: true,
        group: 'reference'
      },
      {
        name: 'name',
        title: 'Fan Name',
        type: 'string',
        validation: Rule => Rule.required(),
        group: 'basic'
      },
      {
        name: 'monthYear',
        title: 'Month & Year',
        type: 'date',
        validation: Rule => Rule.required(),
        description: 'Award month (select any day in the relevant month)',
        group: 'basic'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: (doc) => {
            const date = new Date(doc.monthYear);
            const month = date.toLocaleString('en-US', { month: 'long' });
            const year = date.getFullYear();
            return `${doc.name}-${month.toLowerCase()}-${year}`;
          },
          maxLength: 96
        },
        validation: Rule => Rule.required(),
        group: 'basic'
      },
      {
        name: 'image',
        title: 'Fan Image',
        type: 'image',
        options: {
          hotspot: true
        },
        group: 'media'
      },
      {
        name: 'shortBio',
        title: 'Short Biography',
        type: 'text',
        rows: 3,
        validation: Rule => Rule.max(200),
        group: 'content'
      },
      {
        name: 'supporterSince',
        title: 'Supporter Since',
        type: 'string',
        description: 'E.g., "2005" or "Childhood"',
        group: 'content'
      },
      {
        name: 'story',
        title: 'Fan Story',
        type: 'bodyContent',
        group: 'content'
      },
      {
        name: 'favoritePlayer',
        title: 'Favorite Player',
        type: 'string',
        group: 'content'
      },
      {
        name: 'favoriteMatch',
        title: 'Favorite Match',
        type: 'string',
        group: 'content'
      },
      {
        name: 'quote',
        title: 'Fan Quote',
        type: 'text',
        rows: 3,
        description: 'Memorable quote from this fan',
        group: 'content'
      },
      {
        name: 'gallery',
        title: 'Photo Gallery',
        type: 'gallery',
        group: 'media'
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
        title: 'name',
        media: 'image',
        date: 'monthYear'
      },
      prepare({title, media, date}) {
        const displayDate = date 
          ? new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : 'No date';
          
        return {
          title,
          media,
          subtitle: `Fan of the Month: ${displayDate}`
        }
      }
    },
    orderings: [
      {
        title: 'Month, Recent',
        name: 'monthDesc',
        by: [
          {field: 'monthYear', direction: 'desc'}
        ]
      }
    ]
  }
