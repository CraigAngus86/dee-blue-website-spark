# Banks o' Dee FC - Design System

## Color Palette

### Primary Colors
- **Primary (Deep Navy)**: `rgb(0, 16, 90)` / `#00105A`
- **Primary Dark**: `rgb(0, 12, 66)` / `#000C42`
- **Primary Light**: `rgb(0, 28, 140)` / `#001C8C`

### Secondary Colors
- **Secondary (Light Blue)**: `rgb(197, 231, 255)` / `#C5E7FF`
- **Secondary Dark**: `rgb(156, 203, 235)` / `#9CCBEB`
- **Secondary Light**: `rgb(229, 244, 255)` / `#E5F4FF`

### Accent Colors
- **Accent (Gold)**: `rgb(255, 215, 0)` / `#FFD700`
- **Accent Dark**: `rgb(230, 194, 0)` / `#E6C200`
- **Accent Light**: `rgb(255, 223, 51)` / `#FFDF33`

### Neutral Colors
- **White**: `rgb(255, 255, 255)` / `#FFFFFF`
- **Light Gray**: `rgb(244, 247, 251)` / `#F4F7FB`
- **Medium Gray**: `rgb(226, 232, 240)` / `#E2E8F0`
- **Gray**: `rgb(148, 163, 184)` / `#94A3B8`
- **Dark Gray**: `rgb(71, 85, 105)` / `#475569`
- **Near Black**: `rgb(30, 41, 59)` / `#1E293B`
- **Black**: `rgb(15, 23, 42)` / `#0F172A`

### Semantic Colors
- **Success**: `rgb(16, 185, 129)` / `#10B981`
- **Warning**: `rgb(245, 158, 11)` / `#F59E0B`
- **Error**: `rgb(239, 68, 68)` / `#EF4444`
- **Info**: `rgb(59, 130, 246)` / `#3B82F6`

## Typography

### Font Families
- **Headings**: Montserrat (300, 400, 500, 600, 700, 800)
- **Body**: Inter (300, 400, 500, 600, 700)

### Font Sizes
- **Display**: 3rem / 48px (line-height: 1.1)
- **H1**: 2.25rem / 36px (line-height: 1.2)
- **H2**: 1.875rem / 30px (line-height: 1.2)
- **H3**: 1.5rem / 24px (line-height: 1.2)
- **H4**: 1.25rem / 20px (line-height: 1.2)
- **H5**: 1.125rem / 18px (line-height: 1.2)
- **H6**: 1rem / 16px (line-height: 1.2)
- **Body**: 1rem / 16px (line-height: 1.6)
- **Small**: 0.875rem / 14px (line-height: 1.4)
- **XS**: 0.75rem / 12px (line-height: 1.4)

### Text Components
Use the `<Text>` component with these props:
- `size`: "large" | "medium" | "small" | "xs"
- `weight`: "light" | "regular" | "medium" | "semibold" | "bold"
- `color`: "default" | "primary" | "secondary" | "accent" | "muted" | "white"
- `as`: "p" | "span" | "div"

Use the `<Heading>` component with these props:
- `level`: 1-6 (corresponds to h1-h6)
- `color`: "default" | "primary" | "secondary" | "accent" | "white"
- `weight`: "light" | "regular" | "medium" | "semibold" | "bold" (defaults to "bold")

## Image Guidelines

### Responsive Images
Use the `ResponsiveImage` component for all images to ensure proper handling across devices:

```typescript
import { ResponsiveImage } from '@/components/ui/image/ResponsiveImage';

<ResponsiveImage
  src={imageUrl}
  alt="Descriptive alt text"
  aspectRatio="16/9"  // or "1/1", "4/3", etc.
  objectFit="cover"   // or "contain", "fill"
  className="rounded-lg"
/>
```

### Image Best Practices
1. **Always use responsive images** - Never use raw `<img>` tags
2. **Provide meaningful alt text** - Essential for accessibility
3. **Use appropriate aspect ratios** - Common ratios:
   - 16/9 for hero images and news
   - 1/1 for profile pictures and logos
   - 4/3 for general content images
4. **Optimize image loading** with:
   - Proper sizing
   - Lazy loading for below-fold images
   - WebP format when possible
   - Blur placeholder for large images

### Asset Organization
- Club logos: `/assets/images/logos/`
- Player photos: `/assets/images/players/`
- Stadium images: `/assets/images/stadium/`
- News images: `/assets/images/news/`
- Team photos: `/assets/images/team/`
- Sponsor logos: `/assets/images/sponsors/`

### Image Components
1. **ClubLogo**
   - Use for official club branding
   - Supports light/dark variants
   - Available in multiple sizes

2. **PlayerImage**
   - Optimized for player profiles
   - Consistent aspect ratio
   - Fallback placeholder

3. **SponsorLogo**
   - Maintain sponsor brand guidelines
   - Support for different tiers
   - Container options

## Component Guidelines

### Buttons
- Use `ButtonNew` component for all buttons
- Follow color hierarchy:
  - Primary: Deep navy for main actions
  - Secondary: Light blue for alternative actions
  - Accent: Gold for special CTAs
- Include loading states for async actions
- Add icons using Lucide React

### Cards
- Consistent padding (p-4 or p-6)
- Rounded corners (rounded-lg)
- Optional hover states
- Shadow variants for elevation

### Layout
- Use Container for max-width constraints
- Implement responsive grids
- Maintain consistent spacing
- Follow mobile-first approach

## Shadows
- **Shadow SM**: `var(--shadow-sm)` - Subtle shadow for small elements
- **Shadow MD**: `var(--shadow-md)` - Medium shadow for cards and interactive elements
- **Shadow LG**: `var(--shadow-lg)` - Large shadow for elevated components
- **Shadow XL**: `var(--shadow-xl)` - Extra large shadow for modal dialogs

## Animation
- **Quick**: 150ms - For small interactions like hover states
- **Standard**: 250ms - For most transitions
- **Deliberate**: 400ms - For more noticeable animations

## Utility Classes
- `animate-fade-in`: Simple fade in animation
- `animate-slide-up`: Slide up while fading in
- `animate-scale-in`: Scale in while fading in
- `animate-slide-in-right`: Slide in from right
- `animate-slide-out-right`: Slide out to right
- `hover-scale`: Apply scaling on hover
- `stagger-children`: Auto-animate child elements with delay
- `duotone`: Apply club-colored duotone effect to images

## Responsive Breakpoints
- **Default**: Mobile (< 640px)
- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

## Accessibility Guidelines
1. **Color Contrast**
   - Maintain WCAG AA standard (4.5:1 for normal text)
   - Use contrast checker for color combinations
   - Provide sufficient contrast for interactive elements

2. **Typography**
   - Minimum text size of 16px for body text
   - Clear hierarchy with proper heading levels
   - Adequate line height for readability

3. **Interactive Elements**
   - Clear focus states
   - Proper aria-labels
   - Keyboard navigation support

## Performance Optimization
1. **Image Loading**
   - Implement lazy loading
   - Use appropriate image sizes
   - Optimize image formats

2. **Component Loading**
   - Code splitting for large components
   - Lazy loading for below-fold content
   - Proper suspense boundaries

3. **Asset Management**
   - Minimize bundle sizes
   - Optimize resource loading
   - Implement proper caching strategies
