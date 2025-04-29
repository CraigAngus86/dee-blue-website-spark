export default {
    name: 'playerProfile',
    title: 'Player Profile',
    type: 'document',
    groups: [
      {
        name: 'basic',
        title: 'Basic Information',
      },
      {
        name: 'bio',
        title: 'Biography and Details',
      },
      {
        name: 'media',
        title: 'Media and Gallery',
      },
      {
        name: 'reference',
        title: 'Database Reference',
      },
    ],
    fields: [
      {
        name: 'playerId',
        title: 'Player ID',
        type: 'string',
        description: 'Supabase UUID for this player',
        validation: Rule => Rule.required(),
        group: 'reference'
      },
      {
        name: 'playerName',
        title: 'Player Name',
        type: 'string',
        description: 'Full name (for reference only, official name comes from Supabase)',
        group: 'basic'
      },
      {
        name: 'profileImage',
        title: 'Profile Image',
        type: 'image',
        options: {
          hotspot: true
        },
        group: 'media'
      },
      {
        name: 'profileImages',
        title: 'Additional Profile Images',
        type: 'array',
        of: [{
          type: 'image', 
          options: {
            hotspot: true
          }
        }],
        group: 'media'
      },
      {
        name: 'extendedBio',
        title: 'Extended Biography',
        type: 'bodyContent',
        description: 'Detailed player biography',
        group: 'bio'
      },
      {
        name: 'careerHistory',
        title: 'Career History',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'club',
              title: 'Club',
              type: 'string'
            },
            {
              name: 'startYear',
              title: 'Start Year',
              type: 'number'
            },
            {
              name: 'endYear',
              title: 'End Year',
              type: 'number',
              description: 'Leave empty if current club'
            },
            {
              name: 'appearances',
              title: 'Appearances',
              type: 'number'
            },
            {
              name: 'goals',
              title: 'Goals',
              type: 'number'
            }
          ],
          preview: {
            select: {
              club: 'club',
              startYear: 'startYear',
              endYear: 'endYear'
            },
            prepare({club, startYear, endYear}) {
              return {
                title: club,
                subtitle: endYear ? `${startYear}-${endYear}` : `${startYear}-Present`
              }
            }
          }
        }],
        group: 'bio'
      },
      {
        name: 'accolades',
        title: 'Accolades & Achievements',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'year',
              title: 'Year',
              type: 'number'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2
            }
          ]
        }],
        group: 'bio'
      },
      {
        name: 'favoriteMoment',
        title: 'Favorite Moment at Banks o\' Dee',
        type: 'text',
        rows: 3,
        group: 'bio'
      },
      {
        name: 'personalFacts',
        title: 'Personal Facts',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string'
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'string'
            }
          ],
          preview: {
            select: {
              question: 'question',
              answer: 'answer'
            },
            prepare({question, answer}) {
              return {
                title: question,
                subtitle: answer
              }
            }
          }
        }],
        group: 'bio'
      },
      {
        name: 'socialMedia',
        title: 'Social Media',
        type: 'socialMedia',
        description: 'Player\'s social media profiles',
        group: 'basic'
      },
      {
        name: 'gallery',
        title: 'Action Gallery',
        type: 'gallery',
        description: 'Gallery of action shots',
        group: 'media'
      },
      {
        name: 'videoUrl',
        title: 'Highlight Video URL',
        type: 'url',
        description: 'YouTube or Vimeo URL for player highlights',
        group: 'media'
      }
    ],
    preview: {
      select: {
        title: 'playerName',
        media: 'profileImage'
      },
      prepare({title, media}) {
        return {
          title,
          media
        }
      }
    }
  }