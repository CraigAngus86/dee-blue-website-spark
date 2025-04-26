
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

## Components

### Buttons
Use `<ButtonNew>` component with these props:
- `variant`: "primary" | "secondary" | "tertiary" | "accent" | "outline" | "ghost"
- `size`: "sm" | "md" | "lg" | "xl"
- `iconLeft`: React node for left icon
- `iconRight`: React node for right icon
- `fullWidth`: boolean
- `loading`: boolean
- `disabled`: boolean

### Cards
Use `<CardNew>` component with these props:
- `variant`: "default" | "bordered" | "elevated" | "interactive"
- `padding`: "none" | "sm" | "md" | "lg"
- `className`: additional tailwind classes

### Section
Use `<Section>` component with these props:
- `background`: "white" | "light" | "primary" | "primary-gradient" | "accent-gradient"
- `spacing`: "sm" | "md" | "lg" | "xl"
- `animate`: boolean
- `className`: additional tailwind classes

### Hero Sections
Two main hero components:

1. `<MainHero>` - Full-height hero for homepage and key landing pages
   - `backgroundSrc`: image path
   - `backgroundAlt`: alt text
   - `overlayColor`: "primary" | "dark" | "gradient"
   - `overlayOpacity`: "light" | "medium" | "heavy"
   - `contentPosition`: "center" | "left" | "right"

2. `<SectionHero>` - Banner-style hero for section pages
   - `backgroundSrc`: image path
   - `backgroundAlt`: alt text
   - `overlayColor`: "primary" | "dark" | "gradient"
   - `overlayOpacity`: "light" | "medium" | "heavy"
   - `title`: string
   - `subtitle`: string (optional)
   - `breadcrumbs`: Array of {label: string, href: string}

## Layout

### Container
Use `<Container>` component with these props:
- `size`: "sm" | "md" | "lg" | "xl" | "full"
- `className`: additional tailwind classes

### Grid
Use `<Grid>` component with these props:
- `columns`: object with responsive column counts {default: number, sm?: number, md?: number, lg?: number, xl?: number}
- `gap`: "none" | "sm" | "md" | "lg"
- `animate`: boolean
- `className`: additional tailwind classes

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
