// resolveProductionUrl.js

const previewSecret = 'YOUR_PREVIEW_SECRET' // Keep this secret!

export default function resolveProductionUrl(document) {
  // Define your preview URL based on document type
  let path = ''
  
  switch (document._type) {
    case 'newsArticle':
      path = `/news/${document.slug?.current}`
      break
    case 'playerProfile':
      path = `/team/player/${document.playerId}`
      break
    case 'sponsor':
      path = `/sponsors/${document.slug?.current}`
      break
    case 'commercialPackage':
      path = `/commercial/${document.slug?.current}`
      break
    case 'matchGallery':
      path = `/matches/${document.matchId}/gallery`
      break
    case 'stadiumInfo':
      path = `/stadium`
      break
    case 'fanOfMonth':
      path = `/fan-of-month/${document.slug?.current}`
      break
    default:
      return null
  }
  
  // Return preview URL
  return `${process.env.SANITY_STUDIO_PREVIEW_URL}/api/preview?secret=${previewSecret}&slug=${path}`
}