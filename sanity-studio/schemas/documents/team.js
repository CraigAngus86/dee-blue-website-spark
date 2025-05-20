export default {
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Team Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'shortName',
      title: 'Short Name',
      type: 'string',
      description: 'Abbreviated or short name for the team'
    },
    {
      name: 'logo',
      title: 'Team Logo',
      type: 'cloudinary.asset',
      options: {
        folder: 'banksofdeefc/teams'
      }
    },
    {
      name: 'supabaseId',
      title: 'Supabase ID',
      type: 'string',
      description: 'ID of the team in Supabase database'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo'
    }
  }
}
