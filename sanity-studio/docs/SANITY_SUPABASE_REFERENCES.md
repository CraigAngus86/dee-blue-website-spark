# Sanity-Supabase Reference Pattern

This document outlines the standardized approach for referencing Supabase entities in Sanity documents.

## Reference Field Standard

All Sanity documents that reference Supabase entities should use a consistent field pattern:

- Field name: **`supabaseId`**
- Type: `string` with UUID validation
- Required: For most entities, this should be required

## Schema Example

```javascript
{
  name: 'supabaseId',
  title: 'Supabase ID',
  type: 'string',
  description: 'UUID from Supabase for this entity',
  validation: Rule => Rule.required().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
    name: 'UUID',
    invert: false,
    message: 'Must be a valid UUID format'
  }),
  group: 'reference'
}
```

## Query Pattern

When querying Sanity documents with Supabase references, use the `supabaseId` field:

```groq
*[_type == "documentType" && supabaseId == $id] {
  _id,
  title,
  // other fields...
}
```

## Migration from Legacy Fields

For documents with legacy reference fields (e.g., `playerId`, `matchId`), we've:

1. Added the new `supabaseId` field to all relevant schemas
2. Maintained the legacy fields (hidden) for backward compatibility
3. Created a migration script (`scripts/migrateReferenceFields.js`) to update existing documents

## Document Types with Supabase References

The following document types use the standardized reference approach:

- `playerProfile` - References players from Supabase
- `sponsor` - References sponsors from Supabase
- `matchGallery` - References matches from Supabase
- `commercialPackage` - References commercial packages from Supabase (when applicable)

## Best Practices

- Always use `supabaseId` for new references to Supabase entities
- Validate UUID format in the schema definition
- Include helpful descriptions for content editors
- When mapping data between systems, prefer the `supabaseId` over Sanity document IDs
