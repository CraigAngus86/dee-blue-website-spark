// Import your schemas
import newsArticle from './documents/newsArticle'
import playerProfile from './documents/playerProfile'
import sponsor from './documents/sponsor'
import commercialPackage from './documents/commercialPackage'
import matchGallery from './documents/matchGallery'
import stadiumInfo from './documents/stadiumInfo'
import fanOfMonth from './documents/fanOfMonth'
import fanPhoto from './documents/fanPhoto'
import fanPoll from './documents/fanPoll'
// Import object schemas (reusable components)
import mainImage from './objects/mainImage'
import cloudinaryImage from './objects/cloudinaryImage'
import bodyContent from './objects/bodyContent'
import gallery from './objects/gallery'
import socialMedia from './objects/socialMedia'
import location from './objects/location'
// Export all schemas
export const schemaTypes = [
  // Documents
  newsArticle,
  playerProfile,
  sponsor,
  commercialPackage,
  matchGallery,
  stadiumInfo,
  fanOfMonth,
  fanPhoto,
  fanPoll,
  
  // Objects
  mainImage,
  cloudinaryImage,
  bodyContent,
  gallery,
  socialMedia,
  location
]
