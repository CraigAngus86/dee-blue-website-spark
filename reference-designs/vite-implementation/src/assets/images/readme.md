
# Image Assets Directory

This directory contains all official Banks o' Dee FC image assets organized in the following structure:

```
/src/assets/images/
  /logos/
    - banks-o-dee-logo-light.png
    - banks-o-dee-logo-dark.png
    - banks-o-dee-logo-square.png
    - banks-o-dee-logo-rect.png
  /players/
    - player1.jpg
    - player2.jpg
    - ...
  /team/
    - team-photo-2023.jpg
    - ...
  /stadium/
    - spain-park-main.jpg
    - spain-park-pitch.jpg
    - ...
  /matchday/
    /2025-04-08-vs-formartine/
      - action1.jpg
      - action2.jpg
      - fans1.jpg
      - ...
    /2025-03-25-vs-buckie/
      - action1.jpg
      - ...
  /competitors/
    - formartine-utd.png
    - buckie-thistle.png
    - rangers-fc.png
    - ...
  /sponsors/
    - main-sponsor-light.png
    - main-sponsor-dark.png
    - sponsor2.png
    - ...
  /competitions/
    - scottish-cup.png
    - highland-league.png
    - ...
```

## Asset Usage Guidelines

1. **Logo Usage**: 
   - Header: Use rect-dark on light backgrounds, rect-light on dark backgrounds
   - Footer: Use square-light on dark backgrounds
   - Favicon: Use square version appropriately sized
   - Mobile: Use square version when space is limited

2. **Image Optimization**:
   - All images should be properly compressed before upload
   - Use WebP format with fallbacks where possible
   - Implement lazy loading for below-the-fold images

3. **Consistency**:
   - Maintain consistent aspect ratios for similar image types
   - Player headshots: 3:4 aspect ratio
   - Team photos: 16:9 aspect ratio
   - Match action shots: Various, but maintain consistent quality

4. **Naming Convention**:
   - Use kebab-case for all filenames
   - Include descriptive names
   - Include date for event photos (YYYY-MM-DD format)

For detailed implementation guidelines, refer to the design system documentation.
