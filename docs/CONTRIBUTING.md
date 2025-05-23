
# Contributing to Banks o' Dee FC Website

We appreciate your interest in contributing to the Banks o' Dee FC website! This document provides guidelines and instructions for contributors.

## Code of Conduct

Please read and follow our Code of Conduct to maintain a respectful and collaborative environment.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Set up the development environment following the README.md instructions
4. Create a new branch for your feature/fix
5. Make your changes
6. Submit a pull request

## Development Process

### Branch Naming Convention
- Feature: `feature/description`
- Bug fix: `fix/description`
- Documentation: `docs/description`
- Refactor: `refactor/description`

### Commit Messages
Follow conventional commits:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Formatting changes
- refactor: Code restructuring
- test: Adding/updating tests
- chore: Maintenance tasks

### Pull Request Process
1. Update documentation if needed
2. Add/update tests as required
3. Ensure all tests pass
4. Request review from maintainers
5. Address review feedback

## CI/CD Workflow

Our project uses GitHub Actions to automate testing and deployment processes:

### CI Workflow
Every pull request and push to main/development branches undergoes:
- TypeScript type checking
- ESLint checking
- Build verification
- Test execution

### PR Validation
Each pull request is validated for:
- Semantic PR title (using conventional commits format)
- Reasonable size (fewer than 500 changed files)
- Security checks on dependencies

### Workflow Diagram

```
  Developer                     GitHub                        Reviewers
┌─────────────┐     ┌────────────────────────────┐     ┌───────────────────┐
│ 1. Fork &   │     │ 4. Automated CI            │     │ 6. Code Review    │
│    Clone    │     │    - Type Check            │     │    - Functionality│
│             │────►│    - Lint                  │────►│    - Best Practices│
│ 2. Create   │     │    - Build                 │     │    - Readability  │
│    Branch   │     │    - Tests                 │     │                   │
│             │     │    - PR Size Check         │     └─────────┬─────────┘
│ 3. Submit   │     │    - PR Title Check        │               │
│    PR       │     │    - Dependency Security   │               │
└─────────────┘     └────────────────────────────┘               │
        ▲                                                        │
        │                                                        ▼
        │            ┌────────────────────────────┐     ┌───────────────────┐
        └────────────┤ 7. Address Feedback        │◄────┤ 5. Request Changes│
                     │                            │     │    or Approve     │
                     └─────────────┬──────────────┘     └───────────────────┘
                                   │
                                   ▼
                     ┌────────────────────────────┐
                     │ 8. Merge to Main Branch    │
                     │                            │
                     └─────────────┬──────────────┘
                                   │
                                   ▼
                     ┌────────────────────────────┐
                     │ 9. Automatic Deployment    │
                     │    (based on branch)       │
                     └────────────────────────────┘
```

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type
- Use proper error handling

### React
- Use functional components
- Implement proper prop validation
- Keep components focused and small
- Follow hooks rules
- Document complex logic

### CSS/Styling
- Use Tailwind CSS utilities
- Follow responsive design principles
- Maintain consistent spacing
- Use design system tokens

### Testing
- Write unit tests for new components
- Test responsive behavior
- Verify accessibility compliance
- Test error scenarios

## Documentation

- Add JSDoc comments to components and functions
- Update README.md when adding features
- Document breaking changes
- Include usage examples

## Review Process

1. Code review by maintainers
2. Automated tests must pass
3. Documentation review
4. Final approval from maintainers

## Questions?

Feel free to reach out to the maintenance team for any questions or clarifications.
