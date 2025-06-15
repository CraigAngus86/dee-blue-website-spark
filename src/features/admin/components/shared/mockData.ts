export interface MockMatch {
  id: string;
  season_id: string;
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  match_date: string;
  match_time: string;
  venue: string;
  home_score?: number;
  away_score?: number;
  status: string;
  hospitality_available: boolean;
  is_highlighted: boolean;
  ticket_link?: string;
  match_report_link?: string;
  gallery_idsanity?: string;
  match_sponsor_id?: string;
}

export const mockMatches: MockMatch[] = [
  {
    id: '1',
    season_id: '1',
    competition_id: '1',
    home_team_id: '1',
    away_team_id: '2',
    match_date: '2025-06-15',
    match_time: '15:00',
    venue: 'Spain Park',
    home_score: 2,
    away_score: 1,
    status: 'completed',
    hospitality_available: true,
    is_highlighted: false,
    ticket_link: 'https://example.com/tickets',
    match_report_link: 'https://example.com/report',
    gallery_idsanity: 'gallery-123',
    match_sponsor_id: null
  },
  {
    id: '2',
    season_id: '1',
    competition_id: '1',
    home_team_id: '3',
    away_team_id: '1',
    match_date: '2025-06-08',
    match_time: '14:30',
    venue: 'Station Park',
    home_score: 0,
    away_score: 3,
    status: 'completed',
    hospitality_available: false,
    is_highlighted: false,
    ticket_link: null,
    match_report_link: 'https://example.com/report2',
    gallery_idsanity: null,
    match_sponsor_id: null
  }
];

export const getMockDataById = (entityType: string, recordId: string) => {
  if (entityType === 'match') {
    return mockMatches.find(m => m.id === recordId);
  }
  return {};
};

export const saveMockData = (entityType: string, data: any, mode: 'add' | 'edit') => {
  console.log('Mock Save:', { entityType, data, mode });
  // In real implementation, this would be Supabase call
  return Promise.resolve({ success: true });
};

export const deleteMockData = (entityType: string, recordId: string) => {
  console.log('Mock Delete:', { entityType, recordId });
  // In real implementation, this would be Supabase call
  return Promise.resolve({ success: true });
};
