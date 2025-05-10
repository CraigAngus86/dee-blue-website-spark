/**
 * Client-side Cloudinary configuration
 * Safe to use in browser components as it only uses public information
 */
import { Cloudinary } from '@cloudinary/url-gen';
import { env } from '@/lib/env';

// Cloudinary client instance
export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: env.cloudinary.cloudName,
  },
  url: {
    secure: true
  }
});

// Upload presets (safe to expose in client-side code)
export const UPLOAD_PRESETS = {
  PLAYER: 'player-upload',
  NEWS: 'news-upload',
  MATCH: 'match-gallery-upload',
  DEFAULT: 'banks-o-dee'
};

// Content types for organizing uploads
export enum ContentType {
  PLAYER = 'player',
  NEWS = 'news',
  MATCH = 'match',
  SPONSOR = 'sponsor',
  STADIUM = 'stadium',
  TEAM = 'team'
}

// Folder paths for different content types
export const FOLDERS = {
  PLAYERS: 'banksofdeefc/people',
  NEWS: 'banksofdeefc/news',
  MATCHES: 'banksofdeefc/matches',
  SPONSORS: 'banksofdeefc/sponsors',
  STADIUM: 'banksofdeefc/stadium',
  TEAMS: 'banksofdeefc/teams'
};

// Helper function to get person folder path
export const getPersonFolder = (personId: string) => 
  `${FOLDERS.PLAYERS}/person-${personId}`;

// Helper function to get match folder path
export const getMatchFolder = (matchId: string) => 
  `${FOLDERS.MATCHES}/match-${matchId}`;

// Helper function to get news article folder path
export const getNewsArticleFolder = (articleId: string) => 
  `${FOLDERS.NEWS}/article-${articleId}`;

// Helper function to get sponsor folder path
export const getSponsorFolder = (sponsorId: string) => 
  `${FOLDERS.SPONSORS}/sponsor-${sponsorId}`;
