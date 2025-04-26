
# Banks o' Dee FC Website

## Overview
Official website for Banks o' Dee Football Club, built with React and preparing for migration to Next.js. This project serves as the digital home for the club, providing news, match information, and commercial opportunities.

## Project Structure
```
├── public/           # Static assets and images
│   ├── assets/      # Club-specific assets
│   │   ├── images/  # Organized image categories
│   │   └── [...]/   # Other static assets
├── src/
│   ├── components/  # Reusable UI components
│   │   ├── layout/  # Layout components (Header, Footer)
│   │   ├── ui/     # Generic UI components
│   │   ├── news/   # News-related components
│   │   ├── team/   # Team-related components
│   │   ├── stadium/# Stadium-related components
│   │   └── commercial/# Commercial components
│   ├── lib/        # Utility functions and hooks
│   │   ├── utils/  # General utilities
│   │   └── image/  # Image handling utilities
│   ├── pages/      # Route components
│   ├── styles/     # Global styles and themes
│   ├── data/       # Static data and types
│   ├── hooks/      # Custom React hooks
│   ├── types/      # TypeScript definitions
│   └── integrations/# Third-party integrations
```

## Tech Stack
- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - shadcn/ui for consistent component design
- **State Management**: 
  - React Query for server state
  - React Context for global state
- **Backend Integration**: Supabase
- **Image Optimization**: Cloudinary
- **Data Visualization**: Recharts
- **Form Handling**: React Hook Form with Zod validation

## Local Development Setup

### Prerequisites
- Node.js 18+ (recommended: use nvm)
- npm 9+
- Git

### Environment Setup
1. Clone the repository
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   ```bash
   cp .env.example .env
   ```
   Edit .env with your local configuration:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
   - VITE_CLOUDINARY_CLOUD_NAME

4. Start development server
   ```bash
   npm run dev
   ```

Visit http://localhost:8080 in your browser.

## Next.js Migration Plan

### Current Status
- Directory structure aligned with Next.js conventions
- Components organized for easy migration
- Pages structured following Next.js routing patterns

### Migration Phases

#### Phase 1 (Current)
- [x] Preparatory restructuring
- [x] Documentation updates
- [x] Component isolation
- [ ] Static asset optimization

#### Phase 2 (Upcoming)
- [ ] Next.js project setup
- [ ] Route migration
- [ ] Static asset transfer
- [ ] API routes implementation

#### Phase 3 (Final)
- [ ] Server-side rendering implementation
- [ ] Image optimization with next/image
- [ ] Performance optimization
- [ ] Deploy to production

### Migration Considerations
- Preserve existing functionality
- Maintain SEO performance
- Optimize image loading
- Implement proper error boundaries
- Enhanced security measures

## Development Guidelines

### Code Style
- Use TypeScript for all new components
- Follow existing component patterns
- Test responsive behavior
- Implement accessibility features
- Use Tailwind CSS for styling

### Component Guidelines
- Create small, focused components
- Implement proper prop validation
- Add JSDoc documentation
- Follow atomic design principles
- Test cross-browser compatibility

### Performance Optimization
- Lazy load components when appropriate
- Optimize images using Cloudinary
- Implement proper caching strategies
- Monitor bundle size

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

## Support
For questions or issues:
1. Check existing GitHub issues
2. Create a new issue if needed
3. Contact the development team

## License
Copyright © 2024 Banks o' Dee FC. All rights reserved.
