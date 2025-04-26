
# Banks o' Dee FC Website

## Overview
Official website for Banks o' Dee Football Club, built with React and preparing for migration to Next.js. This project serves as the digital home for the club, providing news, match information, and commercial opportunities.

## Project Structure
```
├── public/           # Static assets and images
├── src/
│   ├── components/  # Reusable UI components
│   │   ├── layout/  # Layout components
│   │   ├── ui/     # Generic UI components
│   │   └── [...]/  # Feature-specific components
│   ├── lib/        # Utility functions and hooks
│   ├── pages/      # Route components (Next.js structure)
│   └── styles/     # Global styles and themes
```

## Tech Stack
- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query
- **Routing**: React Router (transitioning to Next.js)
- **Backend Integration**: Supabase

## Getting Started

### Prerequisites
- Node.js 18+ (recommended: use nvm)
- npm 9+

### Local Development Setup
1. Clone the repository
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open http://localhost:8080 in your browser

## Next.js Migration Plan

This project is being prepared for migration to Next.js. Key aspects of the migration:

### Current Status
- Directory structure aligned with Next.js conventions
- Components organized for easy migration
- Pages structured following Next.js routing patterns

### Migration Phases
1. **Phase 1 (Current)**: 
   - Preparatory restructuring
   - Documentation updates
   - Component isolation

2. **Phase 2 (Upcoming)**:
   - Next.js project setup
   - Route migration
   - Static asset transfer

3. **Phase 3**:
   - Server-side rendering implementation
   - API route migration
   - Performance optimization

## Development Guidelines

### Code Style
- Use TypeScript for all new components
- Follow existing component patterns
- Implement responsive designs
- Use Tailwind CSS for styling
- Create focused, reusable components

### Testing
- Write unit tests for new components
- Test responsive behavior
- Verify accessibility compliance

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run test suite

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

## Support
For questions or issues, please open a GitHub issue or contact the development team.

