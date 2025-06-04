// Seasons (chronological order, newest first)
export const seasons = [
  { value: '2025-2026', label: '2025-2026' }, // DEFAULT
  { value: '2024-2025', label: '2024-2025' },
  { value: '2023-2024', label: '2023-2024' },
  { value: '2022-2023', label: '2022-2023' }
];

// Competitions (using correct short_names from the database)
export const competitions = [
  { value: 'all', label: 'All Competitions' }, // DEFAULT
  { value: 'Aberdeenshire Cup', label: 'Aberdeenshire Cup' },
  { value: 'Aberdeenshire Shield', label: 'Aberdeenshire Shield' },
  { value: 'FA Cup', label: 'Scottish FA Cup' },
  { value: 'Friendly', label: 'Friendly' },
  { value: 'Highland Football League', label: 'Highland Football League' },
  { value: 'Highland League Cup', label: 'Highland League Cup' },
  { value: 'Premier Sports Cup', label: 'Premier Sports Cup' },
  { value: 'SPFL Trust Trophy', label: 'SPFL Trust Trophy' }
];

// Months (calendar order)
export const months = [
  { value: 'all', label: 'All Months' }, // DEFAULT
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' }
];

// Default values
export const DEFAULT_SEASON = '2025-2026';
export const DEFAULT_COMPETITION = 'all';
export const DEFAULT_MONTH = 'all';
