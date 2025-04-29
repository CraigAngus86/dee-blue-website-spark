// resolveProductionUrl.js

const previewSecret = 'YOUR_PREVIEW_SECRET' // Keep this secret!

export default function resolveProductionUrl(document) {
  if (!document || !document._type) {
    console.error("resolveProductionUrl error: document is undefined or missing _type.");
    return "";
  }

  let path = "";

  switch (document._type) {
    case "newsArticle":
      path = `/news/${document?.slug?.current || "default-slug"}`;
      break;
    case "playerProfile":
      path = `/team/player/${document?.playerId || "unknown-player"}`;
      break;
    case "sponsor":
      path = `/sponsors/${document?.slug?.current || "default-slug"}`;
      break;
    case "commercialPackage":
      path = `/commercial/${document?.slug?.current || "default-slug"}`;
      break;
    case "matchGallery":
      path = `/matches/${document?.matchId || "unknown-match"}/gallery`;
      break;
    case "stadiumInfo":
      path = `/stadium`;
      break;
    case "fanOfMonth":
      path = `/fan-of-month/${document?.slug?.current || "default-slug"}`;
      break;
    default:
      return null;
  }

  return `${process.env.SANITY_STUDIO_PREVIEW_URL}/api/preview?secret=${previewSecret}&slug=${path}`;
}
