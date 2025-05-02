
export interface Team {
  id: string;
  name: string;
  shortName?: string;
  logo: string;
}

export interface FixtureResult {
  homeScore: number;
  awayScore: number;
  matchReportLink: string;
}

export interface Fixture {
  id: string;
  competition: string;
  date: string;
  time: string;
  venue: string;
  home: Team;
  away: Team;
  result?: FixtureResult;
}

export const fixtures: Fixture[] = [
  {
    id: '1',
    competition: 'Highland League',
    date: '2023-08-05',
    time: '15:00',
    venue: 'Spain Park',
    home: {
      id: 'banks-o-dee',
      name: 'Banks o\' Dee',
      shortName: 'Dee',
      logo: '/images/logo.png'
    },
    away: {
      id: 'formartine-united',
      name: 'Formartine United',
      logo: '/images/teams/formartine-united.png'
    },
    result: {
      homeScore: 2,
      awayScore: 0,
      matchReportLink: '/match-reports/banks-o-dee-2-0-formartine-united'
    }
  },
  {
    id: '2',
    competition: 'Highland League',
    date: '2023-08-12',
    time: '15:00',
    venue: 'North Lodge Park',
    home: {
      id: 'formartine-united',
      name: 'Formartine United',
      shortName: 'Formartine',
      logo: '/images/teams/formartine-united.png'
    },
    away: {
      id: 'banks-o-dee',
      name: 'Banks o\' Dee',
      logo: '/images/logo.png'
    },
    result: {
      homeScore: 1,
      awayScore: 2,
      matchReportLink: '/match-reports/formartine-united-1-2-banks-o-dee'
    }
  },
  {
    id: '3',
    competition: 'Highland League Cup',
    date: '2023-08-19',
    time: '15:00',
    venue: 'Spain Park',
    home: {
      id: 'banks-o-dee',
      name: 'Banks o\' Dee',
      shortName: 'Dee',
      logo: '/images/logo.png'
    },
    away: {
      id: 'buckie-thistle',
      name: 'Buckie Thistle',
      logo: '/images/teams/buckie-thistle.png'
    },
    result: {
      homeScore: 3,
      awayScore: 1,
      matchReportLink: '/match-reports/banks-o-dee-3-1-buckie-thistle'
    }
  },
  {
    id: '4',
    competition: 'Highland League',
    date: '2023-08-26',
    time: '15:00',
    venue: 'Spain Park',
    home: {
      id: 'banks-o-dee',
      name: 'Banks o\' Dee',
      shortName: 'Dee',
      logo: '/images/logo.png'
    },
    away: {
      id: 'keith',
      name: 'Keith FC',
      logo: '/images/teams/keith.png'
    }
  },
  {
    id: '5',
    competition: 'Highland League',
    date: '2023-09-02',
    time: '15:00',
    venue: 'Mosset Park',
    home: {
      id: 'forres-mechanics',
      name: 'Forres Mechanics',
      shortName: 'Forres',
      logo: '/images/teams/forres-mechanics.png'
    },
    away: {
      id: 'banks-o-dee',
      name: 'Banks o\' Dee',
      logo: '/images/logo.png'
    }
  }
];
