// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Import our custom schema types
import newsArticle from './documents/newsArticle'
import playerProfile from './documents/playerProfile'
import sponsor from './documents/sponsor'
import commercialPackage from './documents/commercialPackage'
import matchGallery from './documents/matchGallery'
import stadiumInfo from './documents/stadiumInfo'
import fanOfMonth from './documents/fanOfMonth'

// Import object schemas (reusable components)
import mainImage from './objects/mainImage'
import bodyContent from './objects/bodyContent'
import gallery from './objects/gallery'
import socialMedia from './objects/socialMedia'
import location from './objects/location'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // Documents
    newsArticle,
    playerProfile,
    sponsor,
    commercialPackage,
    matchGallery,
    stadiumInfo,
    fanOfMonth,
    
    // Objects
    mainImage,
    bodyContent,
    gallery,
    socialMedia,
    location
  ]),
})