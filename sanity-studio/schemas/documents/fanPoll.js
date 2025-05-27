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
      name: 'typeform',
      title: 'Typeform Integration',
    },
    {
      name: 'results',
      title: 'Results',
    }
  ],
  fields: [
    {
      name: 'question',
      title: 'Poll Question',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'poll'
    },
    {
      name: 'typeformId',
      title: 'Typeform ID',
      type: 'string',
      description: 'The ID from the Typeform embed code',
      validation: Rule => Rule.required(),
      group: 'typeform'
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
          {title: 'Draft', value: 'draft'},
          {title: 'Active - Voting', value: 'voting'},
          {title: 'Closed - Show Results', value: 'results'},
          {title: 'Archived', value: 'archived'}
        ]
      },
      initialValue: 'draft',
      group: 'poll'
    },
    {
      name: 'category',
      title: 'Poll Category',
      type: 'string',
      options: {
        list: [
          {title: 'Player of the Month', value: 'player_month'},
          {title: 'Match Predictions', value: 'predictions'},
          {title: 'Club Preferences', value: 'preferences'},
          {title: 'Community Questions', value: 'community'},
          {title: 'Commercial Research', value: 'commercial'}
        ]
      },
      group: 'poll'
    },
    {
      name: 'results',
      title: 'Poll Results',
      type: 'object',
      fields: [
        {
          name: 'totalVotes',
          title: 'Total Votes',
          type: 'number'
        },
        {
          name: 'options',
          title: 'Voting Options & Results',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {name: 'text', type: 'string', title: 'Option Text'},
              {name: 'votes', type: 'number', title: 'Vote Count'},
              {name: 'percentage', type: 'number', title: 'Percentage'}
            ]
          }]
        },
        {
          name: 'lastUpdated',
          title: 'Results Last Updated',
          type: 'datetime'
        }
      ],
      group: 'results'
    },
    {
      name: 'isCurrentPoll',
      title: 'Currently Active Poll',
      type: 'boolean',
      description: 'Only one poll should be active at a time',
      group: 'poll'
    },
    {
      name: 'embedCode',
      title: 'Typeform Embed Code',
      type: 'text',
      description: 'Full embed code from Typeform for reference',
      group: 'typeform'
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
      totalVotes: 'results.totalVotes',
      startDate: 'startDate',
      isActive: 'isCurrentPoll'
    },
    prepare({title, status, totalVotes, startDate, isActive}) {
      const displayDate = startDate 
        ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : '';
      const statusIcon = {
        draft: '📝',
        voting: '🗳️',
        results: '📊',
        archived: '📁'
      }[status] || '';
      const activeIndicator = isActive ? '⭐ ' : '';
      const voteCount = totalVotes ? ` (${totalVotes} votes)` : '';
        
      return {
        title: `${activeIndicator}${statusIcon} ${title}`,
        subtitle: `${status.toUpperCase()} - ${displayDate}${voteCount}`
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
