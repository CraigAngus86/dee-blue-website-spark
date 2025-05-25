/**
 * Gallery feature exports
 */
// Components
export { MatchGalleryModal } from './components/MatchGalleryModal';
export { default as GalleryViewer } from './components/GalleryViewer';
export { default as GalleryThumbnailGrid } from './components/GalleryThumbnailGrid';
// Hooks
export { useGallery } from './hooks/useGallery';
// Types
export type { 
  MatchGallery,
  GalleryPhoto,
  CloudinaryImage,
  MatchGalleryModalProps,
  GalleryViewerProps,
  GalleryThumbnailProps,
  GalleryPaginationProps
} from './types';
