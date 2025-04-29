
/**
 * Migration script to standardize Sanity reference fields to Supabase
 *
 * Run this script with: sanity exec ./scripts/migrateReferenceFields.js --with-user-token
 */

import client from '../client'

// Field mapping: documentType -> [old field name, new field name]
const fieldMapping = [
  { type: 'playerProfile', oldField: 'playerId', newField: 'supabaseId' },
  { type: 'sponsor', oldField: 'sponsorId', newField: 'supabaseId' },
  { type: 'matchGallery', oldField: 'matchId', newField: 'supabaseId' },
  { type: 'commercialPackage', oldField: 'packageId', newField: 'supabaseId' }
]

// Process each document type
async function migrateDocuments() {
  console.log('Starting reference field migration...')
  
  for (const mapping of fieldMapping) {
    console.log(`Processing ${mapping.type} documents...`)
    
    // Fetch all documents of this type with the old field
    const documents = await client.fetch(
      `*[_type == $type && defined(${mapping.oldField})]`,
      { type: mapping.type }
    )
    
    console.log(`Found ${documents.length} ${mapping.type} documents to update`)
    
    // Update each document
    for (const doc of documents) {
      console.log(`Updating document ${doc._id}...`)
      
      // Only set the new field if it doesn't exist already
      if (!doc[mapping.newField]) {
        await client
          .patch(doc._id)
          .set({
            [mapping.newField]: doc[mapping.oldField]
          })
          .commit()
          .then(() => {
            console.log(`Document ${doc._id} updated successfully`)
          })
          .catch(err => {
            console.error(`Error updating document ${doc._id}:`, err.message)
          })
      } else {
        console.log(`Document ${doc._id} already has ${mapping.newField} field, skipping`)
      }
    }
  }
  
  console.log('Migration completed!')
}

migrateDocuments()
  .catch(err => {
    console.error('Migration failed:', err)
    process.exit(1)
  })
