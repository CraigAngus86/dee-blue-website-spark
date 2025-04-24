
import { Sponsor } from "@/lib/types";

// Reference actual uploaded files where available
export const sponsors: Sponsor[] = [
  {
    name: "AD23",
    logo: "/assets/images/sponsors/AD23.jpg",
    logoLight: "/assets/images/sponsors/AD23.jpg", // Should ideally have a white version
    website: "https://ad23.com",
    tier: "main",
  },
  {
    name: "BJK Winton Properties",
    logo: "/assets/images/sponsors/BJK Winton copy.jpg",
    website: "https://bjkwinton.com",
    tier: "platinum",
  },
  {
    name: "PCL Live AV",
    logo: "/assets/images/sponsors/Global.png", 
    website: "https://pcllive.com",
    tier: "gold",
  },
  {
    name: "ADX",
    logo: "/assets/images/sponsors/GDI.jpeg",
    website: "https://adx.com",
    tier: "gold",
  },
  {
    name: "Saltire Energy",
    logo: "/assets/images/sponsors/saltire.jpg",
    website: "https://saltire-energy.com",
    tier: "silver",
  },
  {
    name: "Three60", 
    logo: "/assets/images/sponsors/Three60 copy.jpg",
    website: "https://three60energy.com",
    tier: "bronze",
  }
];

/**
 * Get the main sponsor
 */
export const getMainSponsor = (): Sponsor | undefined => {
  return sponsors.find(sponsor => sponsor.tier === 'main');
};

/**
 * Get sponsors by tier
 */
export const getSponsorsByTier = (tier: Sponsor['tier']): Sponsor[] => {
  return sponsors.filter(sponsor => sponsor.tier === tier);
};

/**
 * Get all sponsors except specific tier
 */
export const getAllSponsorsExcept = (tier?: Sponsor['tier']): Sponsor[] => {
  if (!tier) return sponsors;
  return sponsors.filter(sponsor => sponsor.tier !== tier);
};
