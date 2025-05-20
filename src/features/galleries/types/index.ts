/**
 * Type definitions for the Gallery feature
 */

export interface CloudinaryImage {
  public_id: string;
  url?: string;
  secure_url?: string;
  format?: string;
  _type?: string;
}

export interface GalleryPhoto {
  image: CloudinaryImage;
  caption?: string;
  category?: 'pre-match' | 'action' | 'goal' | 'celebration' | 'fans' | 'post-match';
  playerIds?: string[];
}

export interface MatchGallery {
  _id: string;
  title: string;
  description?: string;
  supabaseId: string;
  matchDate?: string;
  coverImage?: CloudinaryImage;
  photos: GalleryPhoto[];
  photographer?: string;
  publishedAt?: string;
}

export interface GalleryThumbnailProps {
  photo: GalleryPhoto;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export interface GalleryViewerProps {
  photo: GalleryPhoto;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  currentIndex: number;
  totalPhotos: number;
}

export interface GalleryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface MatchGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  galleryId?: string;
  matchId?: string;
}
