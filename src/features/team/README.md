# Team Feature Module

This module contains all components, hooks, and types related to the team functionality of the Banks o Dee FC website.

## Structure

- `components/`: UI components specific to team functionality
  - `PlayerProfileModal.tsx`: Modal displaying detailed player information
  - `TeamMemberCard.tsx`: Card component for displaying player/staff preview
  - `PlayersSection.tsx`: Section component for displaying a carousel of players
  - `PlayerImage.tsx`: Specialized image component for player photos with Cloudinary transformations

- `hooks/`: Custom React hooks for team data management
  - `useTeamData.ts`: Hook for fetching and managing team data

- `types/`: TypeScript interfaces and types
  - `index.ts`: Contains TeamMember interface and related types

## Future Improvements

- Direct integration with Sanity CMS for player profiles
- Enhanced image processing with Cloudinary
- Additional filtering and sorting capabilities
- Team statistics and performance metrics
