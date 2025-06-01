export default {
    name: 'stadiumInfo',
    title: 'Stadium Information',
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
        name: 'timeline',
        title: 'Timeline',
      },
      {
        name: 'facilities',
        title: 'Facilities',
      },
      {
        name: 'media',
        title: 'Media',
      },
    ],
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'E.g., "Spain Park Stadium"',
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
        name: 'mainImage',
        title: 'Main Image',
        type: 'mainImage',
        group: 'media'
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
        name: 'location',
        title: 'Location',
        type: 'location',
        group: 'basic'
      },
      {
        name: 'capacity',
        title: 'Stadium Capacity',
        type: 'number',
        group: 'basic'
      },
      // NEW: Timeline Array
      {
        name: 'timeline',
        title: 'Stadium Timeline',
        type: 'array',
        description: 'Timeline milestones in stadium history',
        of: [
          {
            type: 'object',
            title: 'Timeline Milestone',
            fields: [
              {
                name: 'year',
                title: 'Year',
                type: 'number',
                validation: Rule => Rule.required().min(1900).max(2030)
              },
              {
                name: 'title',
                title: 'Milestone Title',
                type: 'string',
                validation: Rule => Rule.required().max(100)
              },
              {
                name: 'description',
                title: 'Brief Description',
                type: 'text',
                rows: 3,
                description: 'Short description shown initially',
                validation: Rule => Rule.required().max(300)
              },
              {
                name: 'heroImage',
                title: 'Timeline Hero Image',
                type: 'cloudinaryImage',
                description: 'Large image displayed when this milestone is active',
                validation: Rule => Rule.required()
              },
              {
                name: 'expandedContent',
                title: 'Full Story (Read More)',
                type: 'bodyContent',
                description: 'Detailed content shown when user clicks "Read more"'
              }
            ],
            preview: {
              select: {
                title: 'title',
                year: 'year',
                media: 'heroImage'
              },
              prepare({title, year, media}) {
                return {
                  title: `${year}: ${title}`,
                  media
                }
              }
            }
          }
        ],
        options: {
          sortable: true
        },
        group: 'timeline'
      },
      {
        name: 'facilities',
        title: 'Stadium Facilities',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Facility Name',
                type: 'string',
                validation: Rule => Rule.required()
              },
              {
                name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Name of icon to display (e.g., "food", "parking", "accessible")'
            },
            {
              name: 'image',
              title: 'Facility Image',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image'
            }
          }
        }
      ],
      group: 'facilities'
    },
    {
      name: 'directionsNotes',
      title: 'Directions Notes',
      type: 'bodyContent',
      description: 'Additional information about reaching the stadium',
      group: 'content'
    },
    {
      name: 'parkingInfo',
      title: 'Parking Information',
      type: 'bodyContent',
      group: 'content'
    },
    {
      name: 'accessibilityInfo',
      title: 'Accessibility Information',
      type: 'bodyContent',
      group: 'content'
    },
    {
      name: 'mapPoints',
      title: 'Map Points of Interest',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2
            },
            {
              name: 'coordinates',
              title: 'Coordinates',
              type: 'object',
              fields: [
                {
                  name: 'latitude',
                  title: 'Latitude',
                  type: 'number',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'longitude',
                  title: 'Longitude',
                  type: 'number',
                  validation: Rule => Rule.required()
                }
              ]
            },
            {
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Entrance', value: 'entrance'},
                  {title: 'Parking', value: 'parking'},
                  {title: 'Food', value: 'food'},
                  {title: 'Toilet', value: 'toilet'},
                  {title: 'Shop', value: 'shop'},
                  {title: 'First Aid', value: 'firstAid'},
                  {title: 'Accessible', value: 'accessible'}
                ]
              }
            }
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon'
            },
            prepare({title, icon}) {
              return {
                title,
                subtitle: `Type: ${icon || 'None'}`
              }
            }
          }
        }
      ],
      group: 'facilities'
    },
    {
      name: 'gallery',
      title: 'Stadium Gallery',
      type: 'gallery',
      group: 'media'
    },
    {
      name: 'history',
      title: 'Stadium History',
      type: 'bodyContent',
      group: 'content'
    },
    {
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160)
        },
        {
          name: 'shareImage',
          title: 'Social Share Image',
          type: 'image'
        }
      ],
      group: 'content'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage'
    }
  }
}
