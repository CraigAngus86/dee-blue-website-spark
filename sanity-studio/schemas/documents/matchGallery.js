export default {
  name: 'matchGallery',
  title: 'Match Gallery',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Information' },
    { name: 'photos', title: 'Photos' },
    { name: 'reference', title: 'Database Reference' },
  ],
  fields: [
    {
      name: 'homeTeam',
      title: 'Home Team',
      type: 'string',
      options: {
        list: [
          'Banks O\' Dee',
          'Brechin City',
          'Brora Rangers',
          'Buckie Thistle',
          'Clachnacuddin',
          'Deveronvale',
          'Formartine United',
          'Forres Mechanics',
          'Fraserburgh',
          'Huntly',
          'Inverurie Loco Works',
          'Keith',
          'Lossiemouth',
          'Nairn County',
          'Rothes',
          'Strathspey Thistle',
          'Turriff United',
          'Wick Academy'
        ].sort()
      },
      description: 'Select the home team',
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'awayTeam',
      title: 'Away Team',
      type: 'string',
      options: {
        list: [
          'Banks O\' Dee',
          'Brechin City',
          'Brora Rangers',
          'Buckie Thistle',
          'Clachnacuddin',
          'Deveronvale',
          'Formartine United',
          'Forres Mechanics',
          'Fraserburgh',
          'Huntly',
          'Inverurie Loco Works',
          'Keith',
          'Lossiemouth',
          'Nairn County',
          'Rothes',
          'Strathspey Thistle',
          'Turriff United',
          'Wick Academy'
        ].sort()
      },
      description: 'Select the away team',
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'matchDate',
      title: 'Match Date',
      type: 'date',
      description: 'Select the date of the match',
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'Title will be auto-generated when you click the "Generate Names" button',
      group: 'basic'
    },
    {
      name: 'supabaseId',
      title: 'Supabase UUID',
      type: 'string',
      description: 'Match ID in Supabase database (for future use)',
      group: 'reference'
    },
    {
      name: 'sanityId',
      title: 'Sanity ID',
      type: 'string',
      description: 'Sanity document ID (auto-filled when you click the "Generate Names" button)',
      readOnly: true,
      group: 'reference'
    },
    {
      name: 'folderName',
      title: 'Cloudinary Folder Name',
      type: 'string',
      description: 'Folder name will be auto-generated when you click the "Generate Names" button',
      group: 'photos',
    },
    {
      name: 'galleryImages',
      title: 'Match Photos',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      options: {
        layout: 'grid'
      },
      description: 'Upload match photos to this gallery',
      group: 'photos'
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'cloudinary.asset',
      options: {
        folder: 'banksofdeefc/matches/gallery'
      },
      description: 'Select an image to be used as the cover image',
      validation: Rule => Rule.required(),
      group: 'photos'
    },
    {
      name: 'photographer',
      title: 'Photographer',
      type: 'string',
      description: 'Name of photographer for attribution',
      group: 'basic'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      date: 'matchDate',
      homeTeam: 'homeTeam',
      awayTeam: 'awayTeam'
    },
    prepare({title, media, date, homeTeam, awayTeam}) {
      const matchInfo = homeTeam && awayTeam ? `${homeTeam} vs ${awayTeam}` : '';
      return {
        title: title || 'Untitled Gallery',
        media,
        subtitle: [
          matchInfo,
          date ? new Date(date).toLocaleDateString() : 'No date'
        ].filter(Boolean).join(' • ')
      }
    }
  }
}
