
# Component Reuse Strategy

This document outlines the approach to component reuse in the Banks o' Dee FC website, highlighting patterns, best practices, and component hierarchies.

## Component Hierarchy

The application follows a component hierarchy that promotes reusability:

1. **UI Primitives**: Foundational components like buttons, inputs, and cards
2. **Compound Components**: Combinations of primitives like forms and dialogs
3. **Feature Components**: Domain-specific components like match cards or news articles
4. **Page Sections**: Larger components that compose a page
5. **Page Components**: Full pages composed of sections

## UI Component Library

The application uses a combination of shadcn/ui components and custom components:

### shadcn/ui Components

Reusable UI components from shadcn/ui:

- `Button`, `Input`, `Textarea`, `Select`
- `Dialog`, `Popover`, `Tooltip`
- `Tabs`, `Accordion`, `Carousel`
- `Card`, `Badge`, `Avatar`

### Custom UI Components

Extended or custom components:

- `ButtonNew`: Extended button with club-specific styling
- `CardNew`: Extended card with consistent styling
- `Text` and `Heading`: Typography components with design system integration
- `Container`: Layout component for consistent content width

## Reuse Patterns

### Component Composition

Components are designed to be composable:

```tsx
// Example of component composition
<Card>
  <CardHeader>
    <CardTitle>Match Preview</CardTitle>
    <CardDescription>Next fixture details</CardDescription>
  </CardHeader>
  <CardContent>
    <MatchDetails match={nextMatch} />
  </CardContent>
  <CardFooter>
    <Button>Buy Tickets</Button>
  </CardFooter>
</Card>
```

### Prop-Based Variants

Components accept props to control variants:

```tsx
// Button with variants
<ButtonNew variant="primary" size="lg">
  Primary Action
</ButtonNew>

<ButtonNew variant="secondary" size="sm">
  Secondary Action
</ButtonNew>
```

### Render Props

For flexible content rendering:

```tsx
<Collapsible
  title="Match Information"
  renderContent={() => <MatchDetails match={match} />}
/>
```

### Higher-Order Components

For cross-cutting concerns:

```tsx
const withErrorBoundary = (Component) => {
  return (props) => (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

const SafeComponent = withErrorBoundary(RiskyComponent);
```

## Common Reusable Components

### Layout Components

- `Container`: Consistent content width
- `Section`: Standardized page section with spacing
- `Grid`: Responsive grid layouts
- `SeparatorComponents`: Visual separators (Gradient, Wave, Diagonal)

### Image Components

- `ResponsiveImage`: Base component for responsive images
- `ClubLogo`: Club branding
- `SponsorLogo`: Sponsor branding
- `CompetitorLogo`: Competitor club logos
- `PlayerImage`: Player photos
- `TeamImage`: Team photos
- `StadiumImage`: Stadium images

### UI Components

- `LoadingState`: Consistent loading indicators
- `ErrorMessage`: Standardized error display
- `EmptyState`: Content-not-found states
- `Toast`: Notifications
- `HoverEffect`: Interactive hover animations

### Feature Components

- `NewsCard`: News article preview
- `FixtureCard`: Match fixture details
- `PlayerCard`: Player information
- `SponsorshipTier`: Sponsorship package details
- `LeagueTable`: League standings

## Component Documentation

Components are documented with JSDoc comments:

```tsx
/**
 * Displays a news article preview with image, title, and excerpt
 * 
 * @param {object} article - News article data
 * @param {boolean} isFeatured - Whether this is a featured article
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler function
 * @returns {JSX.Element} News card component
 * 
 * @example
 * <NewsCard 
 *   article={articleData}
 *   isFeatured={true}
 *   onClick={() => router.push(`/news/${article.id}`)}
 * />
 */
```

## Props Interfaces

Components use TypeScript interfaces for props:

```typescript
interface NewsCardProps {
  /** News article data */
  article: NewsArticle;
  /** Whether this is a featured article */
  isFeatured?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler function */
  onClick?: () => void;
}
```

## Component Organization

Components are organized by:

1. **Type**: UI vs. feature components
2. **Domain**: News, team, fixtures, etc.
3. **Complexity**: Simple to complex

```
components/
├── ui/                 # Generic UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── image/          # Image components
│   │   └── ...
│   ├── layout/         # Layout components
│   │   └── ...
│   └── typography/     # Typography components
│       └── ...
├── news/               # News-specific components
│   └── ...
├── match/              # Match-specific components
│   └── ...
└── commercial/         # Commercial-specific components
    └── ...
```

## Best Practices for Component Reuse

1. **Single Responsibility**: Each component should have a single responsibility
2. **Prop Consistency**: Use consistent prop naming across similar components
3. **Sensible Defaults**: Provide sensible defaults for optional props
4. **Composition Over Configuration**: Prefer composition over complex configuration
5. **Responsive Design**: Ensure all components work across device sizes
6. **Accessibility**: Build accessibility into components from the start

## Shared Hooks and Utilities

Reusable logic is extracted into hooks and utilities:

```typescript
// Custom hook for consistent image loading
const { imageRef, isInView, isLoaded } = useImageLazyLoad();

// Utility function for consistent classname merging
const className = cn(
  "base-styles",
  isActive && "active-styles",
  className
);
```

## Future Improvements

1. **Component Storybook**: Document components with Storybook
2. **Component Testing**: Add comprehensive component tests
3. **Design Tokens**: Further refine design tokens for consistency
4. **Component Library**: Extract commonly used components into a shared library
5. **Theme Switching**: Add support for light/dark theme variants
