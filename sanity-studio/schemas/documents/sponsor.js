export default {
    name: 'sponsor',
    title: 'Sponsor',
    type: 'document',
    groups: [
      {
        name: 'basic',
        title: 'Basic Information',
      },
      {
        name: 'sponsorship',
        title: 'Sponsorship Details',
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
        name: 'linking',
        title: 'System Linking',
      },
    ],
    fields: [
      // Basic Information
      {
        name: 'name',
        title: 'Sponsor Name',
        type: 'string',
        validation: Rule => Rule.required(),
        group: 'basic'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96
        },
        validation: Rule => Rule.required(),
        group: 'basic'
      },
      {
        name: 'website',
        title: 'Website URL',
        type: 'url',
        group: 'basic'
      },
      {
        name: 'isActive',
        title: 'Active Sponsor',
        type: 'boolean',
        description: 'Is this an active sponsor?',
        initialValue: true,
        group: 'basic'
      },

      // Sponsorship Details
      {
        name: 'primaryTier',
        title: 'Primary Sponsorship Tier',
        type: 'string',
        description: 'Main tier for homepage display (mutually exclusive)',
        options: {
          list: [
            {title: 'Principal Partner', value: 'principal'},
            {title: 'Main Sponsor', value: 'main'},
            {title: 'Official Partner', value: 'partner'}
          ]
        },
        validation: Rule => Rule.required(),
        group: 'sponsorship'
      },
      {
        name: 'additionalTypes',
        title: 'Additional Sponsorship Types',
        type: 'object',
        description: 'Additional sponsorship categories (can have multiple)',
        group: 'sponsorship',
        fields: [
          {
            name: 'isMatchSponsor',
            title: 'Match Sponsor',
            type: 'boolean',
            description: 'Sponsors individual matches',
            initialValue: false
          },
          {
            name: 'isPlayerSponsor',
            title: 'Player Sponsor',
            type: 'boolean',
            description: 'Sponsors individual players',
            initialValue: false
          }
        ]
      },
      {
        name: 'startDate',
        title: 'Partnership Start Date',
        type: 'date',
        group: 'sponsorship'
      },
      {
        name: 'endDate',
        title: 'Partnership End Date',
        type: 'date',
        group: 'sponsorship'
      },

      // Media
      {
        name: 'logo',
        title: 'Sponsor Logo',
        type: 'cloudinary.asset',
        description: 'Main sponsor logo (will be transformed to navy via Cloudinary)',
        validation: Rule => Rule.required(),
        group: 'media'
      },

      // Content
      {
        name: 'description',
        title: 'Short Description',
        type: 'text',
        rows: 3,
        validation: Rule => Rule.max(300),
        group: 'content'
      },
      {
        name: 'body',
        title: 'Full Description',
        type: 'bodyContent',
        group: 'content'
      },
      {
        name: 'testimonial',
        title: 'Testimonial',
        type: 'object',
        group: 'content',
        fields: [
          {
            name: 'quote',
            title: 'Quote',
            type: 'text',
            rows: 3
          },
          {
            name: 'attribution',
            title: 'Attribution',
            type: 'string',
            description: 'Name and title of person giving testimonial'
          }
        ]
      },
      {
        name: 'socialMedia',
        title: 'Social Media',
        type: 'socialMedia',
        group: 'content'
      },

      // System Linking
      {
        name: 'supabaseId',
        title: 'Supabase ID',
        type: 'string',
        description: 'UUID from Supabase sponsors table (for match linking)',
        validation: Rule => Rule.regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
          name: 'UUID',
          invert: false,
          message: 'Must be a valid UUID format'
        }),
        group: 'linking'
      },
      {
        name: 'linkedPlayers',
        title: 'Sponsored Players',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'playerProfile'}]}],
        description: 'Players sponsored by this sponsor',
        hidden: ({document}) => !document?.additionalTypes?.isPlayerSponsor,
        group: 'linking'
      }
    ],
    
    preview: {
      select: {
        title: 'name',
        media: 'logo',
        primaryTier: 'primaryTier',
        isMatchSponsor: 'additionalTypes.isMatchSponsor',
        isPlayerSponsor: 'additionalTypes.isPlayerSponsor'
      },
      prepare({title, media, primaryTier, isMatchSponsor, isPlayerSponsor}) {
        const tierLabels = {
          principal: 'Principal Partner',
          main: 'Main Sponsor',
          partner: 'Official Partner'
        }
        
        const additionalTypes = []
        if (isMatchSponsor) additionalTypes.push('Match')
        if (isPlayerSponsor) additionalTypes.push('Player')
        
        const subtitle = additionalTypes.length > 0 
          ? `${tierLabels[primaryTier]} + ${additionalTypes.join(', ')}`
          : tierLabels[primaryTier]
        
        return {
          title,
          media,
          subtitle
        }
      }
    },
    
    orderings: [
      {
        title: 'Primary Tier',
        name: 'primaryTierAsc',
        by: [
          {field: 'primaryTier', direction: 'asc'},
          {field: 'name', direction: 'asc'}
        ]
      },
      {
        title: 'Name, A-Z',
        name: 'nameAsc',
        by: [
          {field: 'name', direction: 'asc'}
        ]
      },
      {
        title: 'Partnership Start Date',
        name: 'startDateDesc',
        by: [
          {field: 'startDate', direction: 'desc'}
        ]
      }
    ]
  }
