export default {
  name: 'fanPhoto',
  title: 'Fan Gallery Photos',
  type: 'document',
  groups: [
    {
      name: 'submission',
      title: 'Submission Details',
    },
    {
      name: 'content',
      title: 'Photo & Context',
    },
    {
      name: 'moderation',
      title: 'Moderation',
    }
  ],
  fields: [
    {
      name: 'fanName',
      title: 'Photographer Name',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'submission'
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
      group: 'submission'
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'cloudinary.asset',
      validation: Rule => Rule.required(),
      group: 'content'
    },
    {
      name: 'context',
      title: 'Photo Context',
      type: 'string',
      description: 'Brief description of when/where photo was taken (optional)',
      placeholder: 'e.g., "Match vs Huntly, celebrating goal"',
      group: 'content'
    },
    {
      name: 'approvalStatus',
      title: 'Approval Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending Review', value: 'pending'},
          {title: 'Approved', value: 'approved'},
          {title: 'Featured', value: 'featured'},
          {title: 'Declined', value: 'declined'}
        ]
      },
      initialValue: 'pending',
      group: 'moderation'
    },
    {
      name: 'approvedAt',
      title: 'Date Approved',
      type: 'datetime',
      group: 'moderation'
    },
    {
      name: 'socialPermissions',
      title: 'Social Media Permissions',
      type: 'boolean',
      description: 'Allow Banks o\' Dee FC to share this content on social media',
      initialValue: true,
      group: 'submission'
    },
    {
      name: 'submittedAt',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'submission'
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in carousel',
      group: 'moderation'
    },
    {
      name: 'reviewNotes',
      title: 'Review Notes',
      type: 'text',
      description: 'Internal notes for moderation team',
      group: 'moderation'
    }
  ],
  preview: {
    select: {
      title: 'fanName',
      media: 'photo',
      status: 'approvalStatus',
      context: 'context',
      date: 'submittedAt'
    },
    prepare({title, media, status, context, date}) {
      const displayDate = date 
        ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : '';
      const statusIcon = {
        pending: '⏳',
        approved: '✅',
        featured: '⭐',
        declined: '❌'
      }[status] || '';
        
      return {
        title: `${statusIcon} ${title}`,
        media,
        subtitle: `${context || 'No context'} - ${displayDate}`
      }
    }
  },
  orderings: [
    {
      title: 'Submission Date, Recent',
      name: 'submissionDesc',
      by: [
        {field: 'submittedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Approval Status',
      name: 'status',
      by: [
        {field: 'approvalStatus', direction: 'desc'}
      ]
    },
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [
        {field: 'displayOrder', direction: 'asc'}
      ]
    }
  ]
}
