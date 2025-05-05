
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
      name: 'supabaseId',
      title: 'Supabase ID',
      type: 'string',
      description: 'UUID from Supabase for this player (optional)',
      validation: Rule => 
        Rule.custom(supabaseId => {
          if (!supabaseId) return true; // Make it optional
          
          // If provided, ensure it's a valid UUID
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(supabaseId) 
            ? true 
            : 'Must be a valid UUID format';
        }),
      group: 'reference'
    },
    {
      name: 'personType',
      title: 'Person Type',
      type: 'string',
      options: {
        list: [
          { title: 'Player', value: 'player' },
          { title: 'Staff', value: 'staff' }
        ]
      },
      initialValue: 'player',
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      description: 'Player first name',
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      description: 'Player last name',
      validation: Rule => Rule.required(),
      group: 'basic'
    },
    {
      name: 'playerName',
      title: 'Full Name',
      type: 'string',
      description: 'Full name (for reference only, calculated from first/last name)',
      readOnly: true,
      group: 'basic'
    },
    // Player Position - only shown for players
    {
      name: 'playerPosition',
      title: 'Player Position',
      type: 'string',
      options: {
        list: [
          { title: 'Goalkeeper', value: 'goalkeeper' },
          { title: 'Defender', value: 'defender' },
          { title: 'Midfielder', value: 'midfielder' },
          { title: 'Forward', value: 'forward' }
        ]
      },
      group: 'basic',
      hidden: ({document}) => document?.personType !== 'player'
    },
    // Staff Type - only shown for staff
    {
      name: 'staffType',
      title: 'Staff Type',
      type: 'string',
      options: {
        list: [
          { title: 'Manager', value: 'manager' },
          { title: 'Coach', value: 'coach' },
          { title: 'Staff', value: 'staff' }
        ]
      },
      group: 'basic',
      hidden: ({document}) => document?.personType !== 'staff'
    },
    // Staff Role - only shown for staff
    {
      name: 'staffRole',
      title: 'Staff Role',
      type: 'string',
      description: 'Specific role for staff members',
      options: {
        list: [
          { title: 'Manager', value: 'manager' },
          { title: 'Assistant Manager', value: 'assistant_manager' },
          { title: 'Coach', value: 'coach' },
          { title: 'Goalkeeper Coach', value: 'gk_coach' },
          { title: 'Physiotherapist', value: 'physio' },
          { title: 'Fitness Coach', value: 'fitness_coach' },
          { title: 'Club Doctor', value: 'doctor' },
          { title: 'Kit Manager', value: 'kit_manager' },
          { title: 'Director', value: 'director' },
          { title: 'Chairman', value: 'chairman' },
          { title: 'Secretary', value: 'secretary' },
          { title: 'Other', value: 'other' }
        ]
      },
      group: 'basic',
      hidden: ({document}) => document?.personType !== 'staff'
    },
    {
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      initialValue: 'Scotland',
      group: 'basic'
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'cloudinaryImage',
      description: 'Upload player/staff headshot (automatically processed with Cloudinary)',
      group: 'media'
    },
    {
      name: 'profileImages',
      title: 'Additional Profile Images',
      type: 'array',
      of: [{ type: 'cloudinaryImage' }],
      group: 'media'
    },
    {
      name: 'extendedBio',
      title: 'Extended Biography',
      type: 'bodyContent',
      description: 'Detailed player/staff biography',
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
      description: 'Social media profiles',
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
      description: 'YouTube or Vimeo URL for highlights',
      group: 'media'
    }
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      playerPosition: 'playerPosition',
      staffRole: 'staffRole',
      media: 'profileImage'
    },
    prepare({firstName, lastName, playerPosition, staffRole, media}) {
      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      const subtitle = staffRole || playerPosition || '';
      
      return {
        title: fullName || 'Untitled Profile',
        subtitle,
        media
      }
    }
  },
  initialValue: {
    // Generate a random UUID for new documents
    supabaseId: () => {
      return crypto.randomUUID ? crypto.randomUUID() : null;
    },
    personType: 'player'
  }
}
