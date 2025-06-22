import { FieldConfig, SelectOption } from '../types';

export const pollSchema: FieldConfig[] = [
  {
    name: 'question',
    type: 'text',
    label: 'Poll Question',
    required: true,
    placeholder: 'Enter poll question (200 characters max)',
    validation: {
      maxLength: 200
    }
  },
  {
    name: 'category',
    type: 'select',
    label: 'Category',
    required: true,
    options: [
      { value: 'competitions', label: 'Competition Excitement' },
      { value: 'player_month', label: 'Player of the Month' },
      { value: 'predictions', label: 'Match Predictions' },
      { value: 'preferences', label: 'Club Preferences' },
      { value: 'community', label: 'Community Questions' }
    ]
  },
  {
    name: 'option1',
    type: 'text',
    label: 'Option 1',
    required: true,
    placeholder: 'First poll option (50 characters max)',
    validation: {
      maxLength: 50
    }
  },
  {
    name: 'option2',
    type: 'text',
    label: 'Option 2',
    required: true,
    placeholder: 'Second poll option (50 characters max)',
    validation: {
      maxLength: 50
    }
  },
  {
    name: 'option3',
    type: 'text',
    label: 'Option 3 (Optional)',
    required: false,
    placeholder: 'Third poll option (50 characters max)',
    validation: {
      maxLength: 50
    }
  },
  {
    name: 'option4',
    type: 'text',
    label: 'Option 4 (Optional)',
    required: false,
    placeholder: 'Fourth poll option (50 characters max)',
    validation: {
      maxLength: 50
    }
  },
  {
    name: 'option5',
    type: 'text',
    label: 'Option 5 (Optional)',
    required: false,
    placeholder: 'Fifth poll option (50 characters max)',
    validation: {
      maxLength: 50
    }
  },
  {
    name: 'option6',
    type: 'text',
    label: 'Option 6 (Optional)',
    required: false,
    placeholder: 'Sixth poll option (50 characters max)',
    validation: {
      maxLength: 50
    }
  },
  {
    name: 'end_date',
    type: 'datetime',
    label: 'Poll End Date & Time',
    required: true,
    placeholder: 'When should this poll close?'
  },
  {
    name: 'status',
    type: 'select',
    label: 'Initial Status',
    required: true,
    defaultValue: 'draft',
    options: [
      { value: 'draft', label: 'Save as Draft' },
      { value: 'active', label: 'Publish Immediately' }
    ]
  }
];

export const getSchemaForEntity = (entityType: string): FieldConfig[] => {
  switch (entityType) {
    case 'poll':
      return pollSchema;
    default:
      return [];
  }
};
