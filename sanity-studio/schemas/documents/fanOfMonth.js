export default {
  name: 'fanOfMonth',
  title: 'Fan of the Month',
  type: 'document',
  groups: [
    {
      name: 'submission',
      title: 'Submission Details',
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'moderation',
      title: 'Moderation',
    }
  ],
  fields: [
    {
      name: 'fanName',
      title: 'Fan Name',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'submission'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
      group: 'submission'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'submission'
    },
    {
      name: 'category',
      title: 'Selected Category',
      type: 'string',
      options: {
        list: [
          {title: 'Loyal Legend', value: 'loyal_legend'},
          {title: 'Rising Together', value: 'rising_together'},
          {title: 'Community Champion', value: 'community_champion'},
          {title: 'Match Day Magic', value: 'match_day_magic'},
          {title: 'Next Generation', value: 'next_generation'}
        ]
      },
      validation: Rule => Rule.required(),
      group: 'submission'
    },
    {
      name: 'supporterSince',
      title: 'Supporter Since',
      type: 'number',
      group: 'content'
    },
    {
      name: 'story',
      title: 'Submitted Story',
      type: 'text',
      validation: Rule => Rule.required().min(100),
      group: 'content'
    },
    {
      name: 'photos',
      title: 'Submitted Photos',
      type: 'array',
      of: [{type: 'cloudinary.asset'}],
      options: {
        layout: 'grid'
      },
      group: 'content'
    },
    {
      name: 'socialPermissions',
      title: 'Social Media Permissions Granted',
      type: 'boolean',
      group: 'submission'
    },
    {
      name: 'status',
      title: 'Submission Status',
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
      name: 'submittedAt',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'submission'
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
      category: 'category',
      status: 'status',
      date: 'submittedAt'
    },
    prepare({title, category, status, date}) {
      const displayDate = date 
        ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : '';
      const categoryTitle = category ? category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
      const statusIcon = {
        pending: '⏳',
        approved: '✅',
        featured: '⭐',
        declined: '❌'
      }[status] || '';
        
      return {
        title: `${statusIcon} ${title}`,
        subtitle: `${categoryTitle} - ${displayDate}`
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
      title: 'Status',
      name: 'status',
      by: [
        {field: 'status', direction: 'desc'}
      ]
    }
  ]
}
