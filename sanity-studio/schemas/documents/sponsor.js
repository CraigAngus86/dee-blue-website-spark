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
        description: 'UUID from Supabase for this sponsor',
        validation: Rule => Rule.required().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
          name: 'UUID',
          invert: false,
          message: 'Must be a valid UUID format'
        }),
        group: 'reference'
      },
      {
        name: 'sponsorId',
        title: 'Sponsor ID (Legacy)',
        type: 'string',
        description: 'Legacy ID field - use supabaseId instead',
        hidden: true,
        group: 'reference'
      },
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
        name: 'logo',
        title: 'Logo (Dark Background)',
        type: 'image',
        description: 'Logo optimized for dark backgrounds',
        options: {
          hotspot: true
        },
        group: 'media'
      },
      {
        name: 'logoLight',
        title: 'Logo (Light Background)',
        type: 'image',
        description: 'Logo optimized for light backgrounds',
        options: {
          hotspot: true
        },
        group: 'media'
      },
      {
        name: 'tier',
        title: 'Sponsorship Tier',
        type: 'string',
        options: {
          list: [
            {title: 'Principal Partner', value: 'principal'},
            {title: 'Main Sponsor', value: 'main'},
            {title: 'Official Partner', value: 'partner'},
            {title: 'Supporter', value: 'supporter'},
            {title: 'Player Sponsor', value: 'player'},
            {title: 'Match Sponsor', value: 'match'}
          ]
        },
        group: 'basic'
      },
      {
        name: 'startDate',
        title: 'Partnership Start Date',
        type: 'date',
        group: 'basic'
      },
      {
        name: 'endDate',
        title: 'Partnership End Date',
        type: 'date',
        group: 'basic'
      },
      {
        name: 'website',
        title: 'Website URL',
        type: 'url',
        group: 'basic'
      },
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
        name: 'images',
        title: 'Sponsor Images',
        type: 'gallery',
        description: 'Images related to this sponsorship',
        group: 'media'
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
        group: 'basic'
      },
      {
        name: 'isActive',
        title: 'Active Sponsor',
        type: 'boolean',
        description: 'Is this an active sponsor?',
        initialValue: true,
        group: 'basic'
      }
    ],
    preview: {
      select: {
        title: 'name',
        media: 'logo',
        tier: 'tier'
      },
      prepare({title, media, tier}) {
        const tierLabels = {
          principal: 'Principal Partner',
          main: 'Main Sponsor',
          partner: 'Official Partner',
          supporter: 'Supporter',
          player: 'Player Sponsor',
          match: 'Match Sponsor'
        }
        
        return {
          title,
          media,
          subtitle: tierLabels[tier] || tier
        }
      }
    },
    orderings: [
      {
        title: 'Sponsorship Tier',
        name: 'tierDesc',
        by: [
          {field: 'tier', direction: 'asc'}
        ]
      },
      {
        title: 'Name, A-Z',
        name: 'nameAsc',
        by: [
          {field: 'name', direction: 'asc'}
        ]
      }
    ]
  }
