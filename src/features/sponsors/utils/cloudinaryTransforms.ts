// Cloudinary transformations - FIXED: Removed color-affecting transforms
export const SPONSOR_TRANSFORMS = {
  // Principal & Main: clean logos without color alterations
  principal: 'w_400,h_200,c_fit,g_center,q_auto:good,f_auto,e_sharpen:40',  // Removed e_improve
  main: 'w_320,h_160,c_fit,g_center,q_auto:good,f_auto,e_sharpen:40',       // Removed e_improve
  
  // Partners: clean logos without color alterations  
  partner: 'w_120,h_120,c_fit,g_center,q_auto:good,f_auto,e_sharpen:30',   // Removed e_improve
  
  // Header bar transform - clean, no color shifts
  header: 'w_120,h_28,c_fit,g_center,q_auto:good,f_auto,e_sharpen:50',     // Removed e_improve
  
  // Main logo transform - larger for commanding presence
  mainLogo: 'w_128,h_128,c_fit,g_center,q_auto:good,f_auto,e_sharpen:40'   // Removed e_improve
};

export function buildSponsorLogoUrl(publicId: string, transform: keyof typeof SPONSOR_TRANSFORMS): string {
  if (!publicId) return '/placeholder.svg';
  
  const cloudName = 'dlkpaw2a0';
  const transformation = SPONSOR_TRANSFORMS[transform];
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}/${publicId}`;
}

export function getSponsorLogoSizes(tier: 'principal' | 'main' | 'partner') {
  const sizes = {
    principal: { width: 400, height: 200 },
    main: { width: 320, height: 160 },
    partner: { width: 120, height: 120 }
  };
  
  return sizes[tier];
}
