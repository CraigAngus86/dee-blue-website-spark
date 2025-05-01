
# Banks o' Dee FC - Next.js Website

## Overview
Official website for Banks o' Dee Football Club, built with Next.js 14+, TypeScript, Tailwind CSS, and integrated with Supabase, Sanity CMS, and Cloudinary. This project serves as the digital home for the club, providing news, match information, and commercial opportunities.

## Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS with custom design system
  - Utility-first styling approach
- **Data Management**:
  - Supabase for database and authentication
  - Sanity CMS for structured content
  - React Query for server state management
- **Image Optimization**:
  - Cloudinary for image transformations and delivery
  - Next.js Image component for optimized loading
- **UI Components**:
  - Custom component library built on design system
  - Radix UI primitives for accessible components

## Project Structure
```
├── src/
│   ├── app/            # Next.js App Router pages and API routes
│   ├── components/     # Reusable UI components
│   │   ├── layout/     # Layout components (Header, Footer)
│   │   ├── ui/         # Generic UI components
│   │   ├── news/       # News-related components
│   │   ├── team/       # Team-related components
│   │   └── commercial/ # Commercial components
│   ├── lib/            # Client-side utilities
│   ├── utils/          # Server-side utilities
│   ├── types/          # TypeScript definitions
│   └── styles/         # Global styles
├── public/             # Static assets
└── ...                 # Config files
```

## Development Setup

### Prerequisites
- Node.js 18+ (recommended: use nvm)
- npm 9+
- Git

### Local Development
1. Clone the repository
   ```bash
   git clone <REPOSITORY_URL>
   cd banks-o-dee-next
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your configuration values.

4. Start development server
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 in your browser.

## Design System

### Colors
- **Primary (Deep Navy)**: `#00105A`
- **Secondary (Light Blue)**: `#C5E7FF`
- **Accent (Gold)**: `#FFD700`

### Typography
- **Headings**: Montserrat font family
- **Body**: Inter font family

### Components
The project uses a custom component library built on top of Tailwind CSS, with accessibility provided by Radix UI primitives.

## External Integrations

### Supabase
Used for database, authentication, and storage.

### Sanity CMS
Provides structured content for news articles, player profiles, and more.

### Cloudinary
Handles image uploads, transformations, and optimization.

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

## License
Copyright © 2025 Banks o' Dee FC. All rights reserved.
