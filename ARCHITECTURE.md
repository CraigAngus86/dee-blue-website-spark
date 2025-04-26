
# Banks o' Dee FC Website Architecture

## System Overview

The Banks o' Dee FC website is a React-based web application built with TypeScript, Vite, and Tailwind CSS. It follows a component-based architecture with a focus on reusability, maintainability, and performance.

## Architecture Diagram

```
╔════════════════════════════════════════╗
║                                        ║
║             Client Browser             ║
║                                        ║
╚═══════════════╦════════════════════════╝
                ▼
╔════════════════════════════════════════╗
║                                        ║
║           React Application            ║
║                                        ║
║  ┌──────────┐  ┌──────────┐  ┌──────┐  ║
║  │  Pages   │  │Components│  │Hooks  │  ║
║  └──────────┘  └──────────┘  └──────┘  ║
║                                        ║
║  ┌──────────┐  ┌──────────┐  ┌──────┐  ║
║  │ Routing  │  │   State  │  │Utils  │  ║
║  └──────────┘  └──────────┘  └──────┘  ║
║                                        ║
╚═══════════════╦════════════════════════╝
                ▼
╔════════════════════════════════════════╗
║                                        ║
║             Data Services              ║
║                                        ║
║  ┌──────────┐  ┌──────────┐  ┌──────┐  ║
║  │ Supabase │  │   APIs   │  │ Mock │  ║
║  └──────────┘  └──────────┘  └──────┘  ║
║                                        ║
╚════════════════════════════════════════╝
```

## Core Technology Stack

### Frontend
- **React**: UI library for building components
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library based on Radix UI

### Data Management
- **React Hooks**: For local state management
- **TanStack Query (React Query)**: For data fetching and caching
- **Supabase Client**: For database interactions

## Key Architectural Decisions

### Component Architecture

The application follows a hierarchical component structure:

1. **Pages**: Top-level components that correspond to routes
2. **Layouts**: Components that define page structure
3. **Sections**: Major segments within pages
4. **Components**: Reusable UI elements
5. **UI Primitives**: Low-level building blocks

### Data Flow

1. **Data Fetching**: Using TanStack Query for data fetching with caching
2. **State Management**: Component-local state with React hooks
3. **Props Drilling**: Minimized through context where appropriate
4. **Data Services**: Abstracted API calls in service files

### Design System

The design system is based on:
- Tailwind CSS for styling
- shadcn/ui for complex components
- Custom Tailwind configuration for club colors
- Design tokens for consistent appearance

## Current Project Structure

```
src/
├── app/                  # Next.js-style route structure (preparation)
├── assets/               # Static assets
├── components/           # Reusable components
│   ├── commercial/       # Commercial-related components
│   ├── layout/           # Layout components
│   ├── news/             # News-related components
│   ├── stadium/          # Stadium-related components
│   └── ui/               # UI components
├── data/                 # Static data
├── docs/                 # Documentation
├── hooks/                # Custom React hooks
├── integrations/         # External service integrations
├── lib/                  # Utility functions and services
│   ├── config/           # Configuration
│   ├── constants/        # Constants
│   ├── image/            # Image-related utilities
│   ├── schemas/          # Validation schemas
│   └── services/         # Service abstractions
├── mock-data/            # Mock data for development
├── pages/                # Page components
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## Route Structure

The application uses React Router for routing with the following structure:

- `/` - Home page
- `/news` - News articles
- `/news/:id` - Individual news article
- `/match-centre` - Fixtures and results
- `/team-and-management` - Team and staff information
- `/spain-park` - Stadium information
- `/commercial-opportunities` - Sponsorship information

## Planned Migration to Next.js

The project is being prepared for migration to Next.js, which will involve:

1. **App Router**: Moving to Next.js file-based routing
2. **Server Components**: Utilizing React Server Components for improved performance
3. **Data Fetching**: Adapting to Next.js data fetching patterns
4. **API Routes**: Moving to Next.js API routes for backend functionality
5. **Images**: Leveraging Next.js Image component for optimized image delivery

## Styling Strategy

1. **Component Styling**: Tailwind CSS for component styling
2. **Global Styles**: Minimal global styles
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
4. **Dark Mode**: Support via Tailwind and next-themes (planned)

## Performance Considerations

1. **Code Splitting**: Dynamic imports for route-based code splitting
2. **Image Optimization**: Responsive images with appropriate formats
3. **Loading States**: Suspense boundaries for async operations
4. **Caching**: Data caching with TanStack Query

## Security Considerations

1. **Authentication**: Handled through Supabase Auth
2. **Data Validation**: Input validation with Zod schemas
3. **API Security**: Row-level security policies in Supabase

## Error Handling

1. **Error Boundaries**: React error boundaries for component errors
2. **API Error Handling**: Consistent error handling in data fetching
3. **User Feedback**: Toast notifications for operation results

## Accessibility

1. **ARIA Attributes**: Proper ARIA attributes on interactive elements
2. **Keyboard Navigation**: Support for keyboard navigation
3. **Color Contrast**: Meeting WCAG AA standards for text contrast

## Future Considerations

- Migration to Next.js App Router
- Enhanced performance optimization
- Improved analytics
- Expanded content management capabilities
