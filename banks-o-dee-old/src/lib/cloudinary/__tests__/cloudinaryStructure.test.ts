
/**
 * This test file demonstrates the Cloudinary folder structure
 * and naming conventions for Banks o' Dee FC.
 * 
 * NOTE: This is for demonstration purposes only - these don't actually upload files.
 */

import { 
  createPlayerUploadParams,
  createTeamUploadParams,
  createMatchGalleryUploadParams,
  createNewsUploadParams,
  createSponsorLogoUploadParams,
  createStadiumUploadParams
} from '../upload';
import { ContentType } from '../metadata';

describe('Cloudinary folder structure', () => {
  // Sample UUIDs for demonstration
  const sampleIds = {
    player: '123e4567-e89b-12d3-a456-426614174000',
    team: '123e4567-e89b-12d3-a456-426614174001',
    match: '123e4567-e89b-12d3-a456-426614174002',
    article: '123e4567-e89b-12d3-a456-426614174003',
    sponsor: '123e4567-e89b-12d3-a456-426614174004',
  };

  test('Player folder structure', () => {
    // Profile image
    const profileParams = createPlayerUploadParams(
      sampleIds.player, 
      'profile'
    );

    expect(profileParams.folder).toBe(`banksofdeefc/people/person-${sampleIds.player}`);
    expect(profileParams.public_id).toBe('profile');
    expect(profileParams.metadata?.content_type).toBe(ContentType.PLAYER);

    // Action image
    const actionParams = createPlayerUploadParams(
      sampleIds.player, 
      'action',
      1
    );

    expect(actionParams.folder).toBe(`banksofdeefc/people/person-${sampleIds.player}`);
    expect(actionParams.public_id).toBe('action-1');
  });

  test('Team folder structure', () => {
    const teamParams = createTeamUploadParams(
      sampleIds.team,
      'squad'
    );

    expect(teamParams.folder).toBe('banksofdeefc/teams');
    expect(teamParams.public_id).toBe(`team-${sampleIds.team}-squad`);
  });

  test('Match gallery folder structure', () => {
    const matchParams = createMatchGalleryUploadParams(
      sampleIds.match,
      'action',
      1
    );

    expect(matchParams.folder).toBe(`banksofdeefc/matches/match-${sampleIds.match}/gallery`);
    expect(matchParams.public_id).toBe('action-1');
  });

  test('News article folder structure', () => {
    const newsParams = createNewsUploadParams(
      sampleIds.article,
      'featured'
    );

    expect(newsParams.folder).toBe(`banksofdeefc/news/article-${sampleIds.article}`);
    expect(newsParams.public_id).toBe('featured');
  });

  test('Sponsor logo folder structure', () => {
    const sponsorParams = createSponsorLogoUploadParams(
      sampleIds.sponsor,
      'dark'
    );

    expect(sponsorParams.folder).toBe(`banksofdeefc/sponsors/sponsor-${sampleIds.sponsor}`);
    expect(sponsorParams.public_id).toBe('logo-dark');
  });

  test('Stadium folder structure', () => {
    const stadiumParams = createStadiumUploadParams(
      'exterior',
      'main entrance'
    );

    expect(stadiumParams.folder).toBe('banksofdeefc/stadium/exterior');
    expect(stadiumParams.public_id).toBe('main-entrance');
  });
});
