
import { Sponsor } from "@/lib/types";

// Use placeholder images to ensure we have something to display
export const sponsors: Sponsor[] = [
  {
    name: "AD23",
    logo: "https://placehold.co/400x200/FFFFFF/00105A?text=AD23",
    logoLight: "https://placehold.co/400x200/00105A/FFFFFF?text=AD23",
    website: "https://ad23.com",
    tier: "main",
  },
  {
    name: "BJK Winton Properties",
    logo: "https://placehold.co/400x200/FFFFFF/00105A?text=BJK+Winton",
    website: "https://bjkwinton.com",
    tier: "platinum",
  },
  {
    name: "PCL Live AV",
    logo: "https://placehold.co/400x200/FFFFFF/00105A?text=PCL+Live",
    website: "https://pcllive.com",
    tier: "gold",
  },
  {
    name: "ADX",
    logo: "https://placehold.co/400x200/FFFFFF/00105A?text=ADX",
    website: "https://adx.com",
    tier: "gold",
  },
  {
    name: "Saltire Energy",
    logo: "https://placehold.co/400x200/FFFFFF/00105A?text=Saltire+Energy",
    website: "https://saltire-energy.com",
    tier: "silver",
  }
];

export const getMainSponsor = (): Sponsor | undefined => {
  return sponsors.find(sponsor => sponsor.tier === 'main');
};

export const getSponsorsByTier = (tier: Sponsor['tier']): Sponsor[] => {
  return sponsors.filter(sponsor => sponsor.tier === tier);
};

export const getAllSponsorsExcept = (tier?: Sponsor['tier']): Sponsor[] => {
  if (!tier) return sponsors;
  return sponsors.filter(sponsor => sponsor.tier !== tier);
};
