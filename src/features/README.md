# Features Directory

This directory contains feature-specific code organized by domain. Each feature subdirectory contains:

- `/components`: UI components specific to this feature
- `/hooks`: Custom React hooks for this feature's data needs

This organization helps keep related code together and improves maintainability by separating concerns by domain rather than technical type.

## Feature Domains

- `/team`: Team and player related components and hooks
- `/fixtures`: Match fixtures and results components and hooks
- `/news`: News articles and media components and hooks
- `/commercial`: Commercial opportunities, sponsorship, and ticketing

## Migration Strategy

Components are being migrated incrementally from the previous organization to this feature-based approach.
