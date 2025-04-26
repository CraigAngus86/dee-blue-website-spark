import { 
  resolveImagePath,
  createPlaceholder,
  handleImageError,
  mapSizeToPixels,
  transformImage,
  getClubLogo,
  getCompetitorLogo,
  getPlayerImage,
  getNewsImage,
  getStadiumImage,
  getTeamImage,
  getMatchDayImage,
} from '../ImageUtils';

// Use standard Jest global imports
import { describe, it, expect } from 'jest-globals';

describe('Image Utilities', () => {
  describe('resolveImagePath', () => {
    it('should return full URL if path starts with http', () => {
      const url = 'https://example.com/image.jpg';
      expect(resolveImagePath(url)).toBe(url);
    });

    it('should return path if it starts with /', () => {
      const path = '/assets/image.jpg';
      expect(resolveImagePath(path)).toBe(path);
    });

    it('should construct path with category', () => {
      expect(resolveImagePath('image.jpg', 'players'))
        .toBe('/assets/images/players/image.jpg');
    });
  });

  describe('createPlaceholder', () => {
    it('should generate correct placeholder URL', () => {
      const result = createPlaceholder(200, 100, 'Test');
      expect(result).toContain('200x100');
      expect(result).toContain(encodeURIComponent('Test'));
    });
  });

  describe('mapSizeToPixels', () => {
    it('should map string sizes correctly', () => {
      expect(mapSizeToPixels('xs')).toBe(16);
      expect(mapSizeToPixels('sm')).toBe(24);
      expect(mapSizeToPixels('md')).toBe(32);
      expect(mapSizeToPixels('lg')).toBe(48);
      expect(mapSizeToPixels('xl')).toBe(64);
    });

    it('should return number values directly', () => {
      expect(mapSizeToPixels(100)).toBe(100);
    });
  });

  describe('Category-specific resolvers', () => {
    it('should resolve club logo path', () => {
      expect(getClubLogo('logo.png', 'rect'))
        .toBe('/assets/images/logos/logo.png');
    });

    it('should resolve competitor logo path', () => {
      expect(getCompetitorLogo('Team Name'))
        .toBe('/assets/images/competitors/team name.png');
    });

    it('should resolve player image path', () => {
      expect(getPlayerImage('123', 'headshot'))
        .toBe('/assets/images/players/123_headshot.jpg');
    });

    it('should resolve news image path', () => {
      expect(getNewsImage(1))
        .toBe('/assets/images/news/News2.jpg');
    });

    it('should resolve stadium image path', () => {
      expect(getStadiumImage('stadium.jpg', 'main'))
        .toBe('/assets/images/stadium/stadium.jpg');
    });

    it('should resolve team image path', () => {
      expect(getTeamImage(0))
        .toBe('/assets/images/team/Squad1.jpg');
    });

    it('should resolve match day image path', () => {
      expect(getMatchDayImage(1))
        .toBe('/assets/images/matchday/MatchDay1.jpg');
    });
  });
});
