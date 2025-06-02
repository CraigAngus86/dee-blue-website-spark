export default {
  name: 'commercialEnquiry',
  title: 'Commercial Enquiry',
  type: 'document',
  groups: [
    {
      name: 'contact',
      title: 'Contact Information',
    },
    {
      name: 'enquiry',
      title: 'Enquiry Details',
    },
    {
      name: 'management',
      title: 'Management',
    },
  ],
  fields: [
    // Contact Information
    {
      name: 'name',
      title: 'Contact Name',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'contact'
    },
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'contact'
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email(),
      group: 'contact'
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact'
    },
    {
      name: 'preferredContact',
      title: 'Preferred Contact Method',
      type: 'string',
      options: {
        list: [
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'phone'},
          {title: 'Either', value: 'either'}
        ]
      },
      initialValue: 'email',
      group: 'contact'
    },

    // Enquiry Details
    {
      name: 'interestType',
      title: 'Interest Type',
      type: 'string',
      options: {
        list: [
          {title: 'Sponsorship Opportunities', value: 'sponsorship'},
          {title: 'Match Day Hospitality', value: 'hospitality'},
          {title: 'Both Sponsorship & Hospitality', value: 'both'},
          {title: 'Other Commercial Opportunity', value: 'other'}
        ]
      },
      validation: Rule => Rule.required(),
      group: 'enquiry'
    },

    // Sponsorship Fields
    {
      name: 'sponsorshipType',
      title: 'Sponsorship Type',
      type: 'string',
      options: {
        list: [
          {title: 'Perimeter Boards', value: 'perimeter'},
          {title: 'Player Sponsorship', value: 'player'},
          {title: 'Kit Branding', value: 'kit'},
          {title: 'Multiple Options', value: 'multiple'}
        ]
      },
      hidden: ({document}) => !['sponsorship', 'both'].includes(document?.interestType),
      group: 'enquiry'
    },
    {
      name: 'budgetRange',
      title: 'Budget Range',
      type: 'string',
      options: {
        list: [
          {title: 'Under £1,000', value: 'under1000'},
          {title: '£1,000-£3,000', value: '1000-3000'},
          {title: '£3,000+', value: 'over3000'},
          {title: 'Prefer to discuss', value: 'discuss'}
        ]
      },
      hidden: ({document}) => !['sponsorship', 'both'].includes(document?.interestType),
      group: 'enquiry'
    },
    {
      name: 'durationInterest',
      title: 'Duration Interest',
      type: 'string',
      options: {
        list: [
          {title: 'Single season', value: 'single'},
          {title: 'Multi-season', value: 'multi'},
          {title: 'Flexible', value: 'flexible'}
        ]
      },
      hidden: ({document}) => !['sponsorship', 'both'].includes(document?.interestType),
      group: 'enquiry'
    },

    // Hospitality Fields
    {
      name: 'packageInterest',
      title: 'Package Interest',
      type: 'string',
      options: {
        list: [
          {title: 'Match Day Sponsorship', value: 'matchday'},
          {title: 'Matchball Sponsorship', value: 'matchball'},
          {title: 'Standard Hospitality', value: 'standard'},
          {title: 'Group Booking', value: 'group'}
        ]
      },
      hidden: ({document}) => !['hospitality', 'both'].includes(document?.interestType),
      group: 'enquiry'
    },
    {
      name: 'groupSize',
      title: 'Group Size',
      type: 'string',
      options: {
        list: [
          {title: '1-2 people', value: '1-2'},
          {title: '3-5 people', value: '3-5'},
          {title: '6-10 people', value: '6-10'},
          {title: '11-20 people', value: '11-20'},
          {title: '20+ people', value: '20+'}
        ]
      },
      hidden: ({document}) => !['hospitality', 'both'].includes(document?.interestType),
      group: 'enquiry'
    },
    {
      name: 'preferredMatches',
      title: 'Preferred Matches',
      type: 'string',
      options: {
        list: [
          {title: 'Highland League', value: 'highland'},
          {title: 'Cup Ties', value: 'cup'},
          {title: 'Key Fixtures', value: 'key'},
          {title: 'Specific dates', value: 'specific'},
          {title: 'Any available', value: 'any'}
        ]
      },
      hidden: ({document}) => !['hospitality', 'both'].includes(document?.interestType),
      group: 'enquiry'
    },

    // Additional Information
    {
      name: 'message',
      title: 'Additional Message',
      type: 'text',
      rows: 4,
      group: 'enquiry'
    },
    {
      name: 'hearAboutUs',
      title: 'How did you hear about us?',
      type: 'string',
      options: {
        list: [
          {title: 'Website', value: 'website'},
          {title: 'Social Media', value: 'social'},
          {title: 'Referral', value: 'referral'},
          {title: 'Match/Event', value: 'event'},
          {title: 'Other', value: 'other'}
        ]
      },
      group: 'enquiry'
    },

    // Management Fields
    {
      name: 'status',
      title: 'Enquiry Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending Review', value: 'pending'},
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Proposal Sent', value: 'proposal_sent'},
          {title: 'Closed - Successful', value: 'closed_successful'},
          {title: 'Closed - Unsuccessful', value: 'closed_unsuccessful'},
          {title: 'Follow Up Required', value: 'follow_up'}
        ]
      },
      initialValue: 'pending',
      group: 'management'
    },
    {
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      options: {
        list: [
          {title: 'High Priority', value: 'high'},
          {title: 'Medium Priority', value: 'medium'},
          {title: 'Standard', value: 'standard'}
        ]
      },
      initialValue: 'standard',
      group: 'management'
    },
    {
      name: 'enquirySummary',
      title: 'Enquiry Summary',
      type: 'string',
      description: 'Auto-generated summary for quick review',
      readOnly: true,
      group: 'management'
    },
    {
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'string',
      description: 'Commercial team member handling this enquiry',
      group: 'management'
    },
    {
      name: 'followUpDate',
      title: 'Follow Up Date',
      type: 'date',
      group: 'management'
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'array',
      of: [{type: 'text'}],
      description: 'Internal notes for team reference',
      group: 'management'
    },

    // Metadata
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where the enquiry came from',
      initialValue: 'commercial_page',
      group: 'management'
    },
    {
      name: 'matchContext',
      title: 'Match Context',
      type: 'string',
      description: 'Specific match if enquiry was about upcoming hospitality',
      group: 'management'
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'management'
    }
  ],

  preview: {
    select: {
      title: 'company',
      subtitle: 'enquirySummary',
      media: 'status',
      interestType: 'interestType',
      priority: 'priority'
    },
    prepare({title, subtitle, interestType, priority}) {
      const statusColors = {
        high: '��',
        medium: '🟡', 
        standard: '🟢'
      };

      const typeEmojis = {
        sponsorship: '🏟️',
        hospitality: '🍽️',
        both: '⭐',
        other: '💼'
      };

      return {
        title: `${statusColors[priority] || ''} ${title}`,
        subtitle: subtitle || `${typeEmojis[interestType] || ''} ${interestType}`,
        media: undefined
      }
    }
  },

  orderings: [
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [
        {field: 'priority', direction: 'desc'},
        {field: 'submittedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Date Submitted (Newest First)',
      name: 'submittedDesc',
      by: [
        {field: 'submittedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [
        {field: 'status', direction: 'asc'},
        {field: 'priority', direction: 'desc'}
      ]
    }
  ]
}
