// Cloudinary transformations - HORIZONTAL LOGOS FOR TOP TIERS
export const SPONSOR_TRANSFORMS = {
  // Principal & Main: use clean horizontal logos with c_fit
  principal: 'w_400,h_200,c_fit,g_center,q_auto:best,f_auto',  // Horizontal fit
  main: 'w_320,h_160,c_fit,g_center,q_auto:best,f_auto',       // Horizontal fit
  
  // Partners: keep original square fit
  partner: 'w_120,h_120,c_fit,g_center,q_auto:best,f_auto',
  
  // Header bar transform
  header: 'w_120,h_28,c_fit,g_center,q_auto:best,f_auto'
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
