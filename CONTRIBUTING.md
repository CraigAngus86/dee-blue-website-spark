
# Contributing to the Banks o' Dee FC Website

Thank you for your interest in contributing to the Banks o' Dee FC website! This document outlines the process for contributing to the project.

## Development Process

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/banks-o-dee-fc.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

### Development Guidelines

#### Code Style

- We follow TypeScript best practices
- Use functional components with hooks for React components
- Make use of the design system and existing components where possible
- Follow the existing project structure

#### Component Guidelines

- Create small, focused components
- Use TypeScript interfaces for props
- Include JSDoc comments for components and functions
- Follow the naming convention of the project

#### CSS Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design principles
- Use the color variables defined in the design system
- Maintain consistent spacing using the spacing scale

#### Testing

- Write tests for new components and functionality
- Ensure existing tests pass before submitting a PR

### Pull Request Process

1. Update documentation if required
2. Ensure all tests pass and the application builds without errors
3. Submit a pull request with a clear description of the changes
4. Reference any related issues in your pull request

## Component Structure

When creating new components, follow this structure:

```typescript
/**
 * Component description here
 * 
 * @example
 * <ComponentName prop1="value" prop2={value} />
 */
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  /** Description of prop1 */
  prop1: string;
  /** Description of prop2 */
  prop2?: boolean;
}

const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2 = false,
}) => {
  return (
    <div className={cn("base-styles", prop2 && "conditional-styles")}>
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

## Questions?

If you have questions about the contribution process, reach out to the maintainers.

Thank you for contributing to the Banks o' Dee FC website!
