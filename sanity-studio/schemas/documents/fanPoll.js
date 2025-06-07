export default {
  name: 'fanPoll',
  title: 'Fan Polls',
  type: 'document',
  groups: [
    {
      name: 'poll',
      title: 'Poll Setup',
    },
    {
      name: 'options',
      title: 'Poll Options',
    },
    {
      name: 'status',
      title: 'Status & Management',
    }
  ],
  fields: [
    {
      name: 'question',
      title: 'Poll Question',
      type: 'string',
      validation: Rule => Rule.required().max(200),
      group: 'poll'
    },
    {
      name: 'pollOptions',
      title: 'Poll Options',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'text',
            title: 'Option Text',
            type: 'string',
            validation: Rule => Rule.required().max(50)
          }
        ]
      }],
      validation: Rule => Rule.required().min(2).max(6),
      group: 'options'
    },
    {
      name: 'startDate',
      title: 'Voting Start Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
      group: 'poll'
    },
    {
      name: 'endDate', 
      title: 'Voting End Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
      group: 'poll'
    },
    {
      name: 'status',
      title: 'Poll Status',
      type: 'string',
      options: {
        list: [
          {title: '📝 Draft', value: 'draft'},
          {title: '🗳️ Active - Voting Open', value: 'active'},
          {title: '📊 Closed - Show Results', value: 'closed'},
          {title: '📁 Archived', value: 'archived'}
        ]
      },
      initialValue: 'draft',
      group: 'status'
    },
    {
      name: 'category',
      title: 'Poll Category',
      type: 'string',
      options: {
        list: [
          {title: 'Competition Excitement', value: 'competitions'},
          {title: 'Player of the Month', value: 'player_month'},
          {title: 'Match Predictions', value: 'predictions'},
          {title: 'Club Preferences', value: 'preferences'},
          {title: 'Community Questions', value: 'community'}
        ]
      },
      group: 'poll'
    },
    {
      name: 'isCurrentPoll',
      title: 'Currently Active Poll',
      type: 'boolean',
      description: 'Only one poll should be active at a time - shows ⭐ in document list',
      group: 'status'
    },
    {
      name: 'supabasePollId',
      title: 'Supabase Poll ID',
      type: 'string',
      description: 'Automatically generated when poll is activated in Supabase',
      readOnly: true,
      group: 'status'
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Notes about poll purpose, target audience, etc.',
      group: 'poll'
    }
  ],
  preview: {
    select: {
      title: 'question',
      status: 'status',
      startDate: 'startDate',
      isActive: 'isCurrentPoll',
      optionsCount: 'pollOptions'
    },
    prepare({title, status, startDate, isActive, optionsCount}) {
      const displayDate = startDate 
        ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : '';
      const statusIcon = {
        draft: '📝',
        active: '🗳️',
        closed: '📊',
        archived: '📁'
      }[status] || '';
      const activeIndicator = isActive ? '⭐ ' : '';
      const optionCount = optionsCount ? ` (${optionsCount.length} options)` : '';
        
      return {
        title: `${activeIndicator}${statusIcon} ${title}`,
        subtitle: `${status.toUpperCase()} - ${displayDate}${optionCount}`
      }
    }
  },
  orderings: [
    {
      title: 'Start Date, Recent',
      name: 'startDateDesc',
      by: [
        {field: 'startDate', direction: 'desc'}
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
