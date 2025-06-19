export default {
  name: 'matchGallery',
  title: 'Match Gallery',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Information' },
    { name: 'photos', title: 'Photos' },
    { name: 'seo', title: 'SEO & Publishing' },
    { name: 'reference', title: 'Database Reference' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'Auto-generated from admin: "Team A v Team B Gallery"',
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Auto-generated from title',
      group: 'basic'
    },
    {
      name: 'excerpt',
      title: 'Gallery Description',
      type: 'text',
      rows: 3,
      description: 'Brief gallery description (20 words max)',
      validation: Rule => Rule.required().max(300),
      group: 'basic'
    },
    {
      name: 'author',
      title: 'Photographer/Author',
      type: 'string',
      description: 'Photographer or gallery creator name',
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'folderName',
      title: 'Cloudinary Folder Name',
      type: 'string',
      description: 'Auto-generated: YYMMDD_HomeTeam_AwayTeam',
      readOnly: true,
      group: 'photos'
    },
    {
      name: 'photoCount',
      title: 'Photo Count',
      type: 'number',
      description: 'Number of photos in gallery',
      readOnly: true,
      group: 'photos'
    },
    {
      name: 'photos',
      title: 'Match Photos',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      options: {
        layout: 'grid'
      },
      description: 'All match photos uploaded via admin',
      group: 'photos'
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'cloudinary.asset',
      description: 'Gallery cover/preview image',
      validation: Rule => Rule.required(),
      group: 'photos'
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When gallery was published',
      group: 'seo'
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          validation: Rule => Rule.max(160)
        }
      ]
    },
    {
      name: 'matchId',
      title: 'Supabase Match ID',
      type: 'string',
      description: 'Links to match record in Supabase database',
      validation: Rule => Rule.regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/),
      group: 'reference'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      author: 'author',
      photoCount: 'photoCount'
    },
    prepare({title, media, author, photoCount}) {
      return {
        title: title || 'Untitled Gallery',
        media,
        subtitle: [
          author && `by ${author}`,
          photoCount && `${photoCount} photos`
        ].filter(Boolean).join(' • ')
      }
    }
  }
}