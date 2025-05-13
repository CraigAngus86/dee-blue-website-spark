# Utils Directory

This directory contains utilities consolidated from the root `/utils` directory. The migration was performed on May 13, 2025, to standardize utility function organization as part of the Banks o' Dee FC website implementation.

## Directory Structure

- `/cross-system/`: Utilities for cross-system reference resolution between Sanity CMS and Supabase
  - `/cross-system/testing/`: Testing utilities for cross-system references
- `/sanity-preview/`: Utilities for Sanity CMS preview functionality
  - `/sanity-preview/api/`: API handlers for preview functionality
- `sanity-webhook-handlers.ts`: Handlers for Sanity webhooks

## Cross-System References

The cross-system utilities provide a standardized way to resolve references between Sanity CMS documents and Supabase records. They include:

- Reference resolution for players, matches, teams, and sponsors
- Caching mechanisms to improve performance
- Type definitions for consistent data handling
- Synchronization utilities for keeping systems in sync

## Sanity Preview

The Sanity preview utilities enable content previewing from the Sanity Studio. These tools:

- Validate preview requests with secret tokens
- Control preview state for the application
- Provide API handlers for preview functionality
- Enable document-specific preview functionality

## Usage Guidelines

- Import utilities from their specific modules rather than the index files
- Use the provided utility functions rather than implementing custom reference resolution
- Reference the appropriate documentation for advanced usage scenarios

