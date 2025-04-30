
export default {
    name: 'commercialPackage',
    title: 'Commercial Package',
    type: 'document',
    groups: [
      {
        name: 'basic',
        title: 'Basic Information',
      },
      {
        name: 'details',
        title: 'Package Details',
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
        description: 'UUID from Supabase for this package (if applicable)',
        validation: Rule => Rule.regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
          name: 'UUID',
          invert: false,
          message: 'Must be a valid UUID format (example: 123e4567-e89b-12d3-a456-426614174000)'
        }),
        group: 'reference'
      },
      {
        name: 'packageId',
        title: 'Package ID (Legacy)',
        type: 'string',
        description: 'Legacy ID field - use supabaseId instead',
        hidden: true,
        group: 'reference'
      },
      {
        name: 'title',
        title: 'Package Title',
        type: 'string',
        validation: Rule => Rule.required(),
        group: 'basic'
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
        group: 'basic'
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            {title: 'Sponsorship', value: 'sponsorship'},
            {title: 'Advertising', value: 'advertising'},
            {title: 'Hospitality', value: 'hospitality'},
            {title: 'Event', value: 'event'},
            {title: 'Community', value: 'community'}
          ]
        },
        validation: Rule => Rule.required(),
        group: 'basic'
      },
      {
        name: 'image',
        title: 'Featured Image',
        type: 'mainImage',
        group: 'media'
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        description: 'Package price in GBP (£)',
        group: 'basic'
      },
      {
        name: 'priceDisplay',
        title: 'Price Display Text',
        type: 'string',
        description: 'How to display the price (e.g., "£500", "From £1,000", "Contact for pricing")',
        group: 'basic'
      },
      {
        name: 'shortDescription',
        title: 'Short Description',
        type: 'text',
        rows: 3,
        validation: Rule => Rule.max(200),
        group: 'details'
      },
      {
        name: 'description',
        title: 'Full Description',
        type: 'bodyContent',
        group: 'details'
      },
      {
        name: 'benefits',
        title: 'Package Benefits',
        type: 'array',
        of: [{type: 'string'}],
        description: 'List of benefits included in this package',
        group: 'details'
      },
      {
        name: 'gallery',
        title: 'Image Gallery',
        type: 'gallery',
        group: 'media'
      },
      {
        name: 'availabilityNotes',
        title: 'Availability Notes',
        type: 'text',
        description: 'Notes on availability or limitations',
        group: 'details'
      },
      {
        name: 'contactPerson',
        title: 'Contact Person',
        type: 'string',
        description: 'Name of person to contact for this package',
        group: 'details'
      },
      {
        name: 'contactEmail',
        title: 'Contact Email',
        type: 'string',
        group: 'details'
      },
      {
        name: 'featured',
        title: 'Featured Package',
        type: 'boolean',
        description: 'Feature this package in listings',
        group: 'basic'
      },
      {
        name: 'isActive',
        title: 'Active Package',
        type: 'boolean',
        description: 'Is this package currently available?',
        initialValue: true,
        group: 'basic'
      }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'image',
        category: 'category',
        price: 'priceDisplay'
      },
      prepare({title, media, category, price}) {
        const categories = {
          sponsorship: 'Sponsorship',
          advertising: 'Advertising',
          hospitality: 'Hospitality',
          event: 'Event',
          community: 'Community'
        }
        
        return {
          title,
          media,
          subtitle: `${categories[category] || category}${price ? ` - ${price}` : ''}`
        }
      }
    },
    orderings: [
      {
        title: 'Category',
        name: 'categoryAsc',
        by: [
          {field: 'category', direction: 'asc'},
          {field: 'price', direction: 'desc'}
        ]
      },
      {
        title: 'Price (High to Low)',
        name: 'priceDesc',
        by: [
          {field: 'price', direction: 'desc'}
        ]
      }
    ]
  }
