import { FieldConfig, SelectOption } from '../types';

export const businessEnquirySchema: FieldConfig[] = [
  // Contact Information (Read-only in edit mode)
  {
    name: 'company',
    type: 'text',
    label: 'Company Name',
    required: true,
    readOnlyInEdit: true,
    placeholder: 'Company name'
  },
  {
    name: 'name',
    type: 'text',
    label: 'Contact Name',
    required: true,
    readOnlyInEdit: true,
    placeholder: 'Contact person name'
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email Address',
    required: true,
    readOnlyInEdit: true,
    placeholder: 'contact@company.com'
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone Number',
    readOnlyInEdit: true,
    placeholder: 'Phone number'
  },
  {
    name: 'preferredContact',
    type: 'select',
    label: 'Preferred Contact Method',
    readOnlyInEdit: true,
    options: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { value: 'either', label: 'Either' }
    ]
  },

  // Enquiry Details (Read-only in edit mode)
  {
    name: 'interestType',
    type: 'select',
    label: 'Interest Type',
    required: true,
    readOnlyInEdit: true,
    options: [
      { value: 'sponsorship', label: 'Sponsorship Opportunities' },
      { value: 'hospitality', label: 'Match Day Hospitality' },
      { value: 'both', label: 'Both Sponsorship & Hospitality' },
      { value: 'other', label: 'Other Commercial Opportunity' }
    ]
  },
  {
    name: 'sponsorshipType',
    type: 'select',
    label: 'Sponsorship Type',
    readOnlyInEdit: true,
    options: [
      { value: 'perimeter', label: 'Perimeter Boards' },
      { value: 'player', label: 'Player Sponsorship' },
      { value: 'kit', label: 'Kit Branding' },
      { value: 'multiple', label: 'Multiple Options' }
    ]
  },
  {
    name: 'budgetRange',
    type: 'select',
    label: 'Budget Range',
    readOnlyInEdit: true,
    options: [
      { value: 'under1000', label: 'Under £1,000' },
      { value: '1000-3000', label: '£1,000-£3,000' },
      { value: 'over3000', label: '£3,000+' },
      { value: 'discuss', label: 'Prefer to discuss' }
    ]
  },
  {
    name: 'packageInterest',
    type: 'select',
    label: 'Package Interest',
    readOnlyInEdit: true,
    options: [
      { value: 'matchday', label: 'Match Day Sponsorship' },
      { value: 'matchball', label: 'Matchball Sponsorship' },
      { value: 'standard', label: 'Standard Hospitality' },
      { value: 'group', label: 'Group Booking' }
    ]
  },
  {
    name: 'groupSize',
    type: 'select',
    label: 'Group Size',
    readOnlyInEdit: true,
    options: [
      { value: '1-2', label: '1-2 people' },
      { value: '3-5', label: '3-5 people' },
      { value: '6-10', label: '6-10 people' },
      { value: '11-20', label: '11-20 people' },
      { value: '20+', label: '20+ people' }
    ]
  },
  {
    name: 'message',
    type: 'textarea',
    label: 'Additional Message',
    readOnlyInEdit: true,
    placeholder: 'Additional enquiry details'
  },
  {
    name: 'hearAboutUs',
    type: 'select',
    label: 'How did you hear about us?',
    readOnlyInEdit: true,
    options: [
      { value: 'website', label: 'Website' },
      { value: 'social', label: 'Social Media' },
      { value: 'referral', label: 'Referral' },
      { value: 'event', label: 'Match/Event' },
      { value: 'other', label: 'Other' }
    ]
  },

  // Management Fields (Editable)
  {
    name: 'status',
    type: 'select',
    label: 'Enquiry Status',
    required: true,
    options: [
      { value: 'pending', label: 'Pending Review' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'proposal_sent', label: 'Proposal Sent' },
      { value: 'closed_successful', label: 'Closed - Successful' },
      { value: 'closed_unsuccessful', label: 'Closed - Unsuccessful' },
      { value: 'follow_up', label: 'Follow Up Required' }
    ]
  },
  {
    name: 'assignedTo',
    type: 'text',
    label: 'Assigned To',
    placeholder: 'Team member handling this enquiry'
  },
  {
    name: 'followUpDate',
    type: 'date',
    label: 'Follow Up Date',
    placeholder: 'Schedule follow up'
  },

  // Metadata (Read-only)
  {
    name: 'source',
    type: 'text',
    label: 'Source',
    readOnlyInEdit: true,
    placeholder: 'Where enquiry came from'
  },
  {
    name: 'submittedAt',
    type: 'datetime',
    label: 'Submitted Date',
    readOnlyInEdit: true
  }
];

export const getSchemaForEntity = (entityType: string): FieldConfig[] => {
  switch (entityType) {
    case 'businessEnquiry':
      return businessEnquirySchema;
    default:
      return [];
  }
};