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
  { value: 'UAE Second Division', label: 'UAE Second Division' },
  { value: 'Friendly', label: 'Friendly' },
  { value: 'UAE FA Cup', label: 'UAE FA Cup' }
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
