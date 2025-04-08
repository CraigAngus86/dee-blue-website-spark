
import { Sponsor } from "@/lib/types";

// Reference actual uploaded files where available
export const sponsors: Sponsor[] = [
  {
    name: "AD23",
    logo: "/assets/images/sponsors/AD23.jpg",
    logoLight: "/assets/images/sponsors/AD23.jpg",
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
    logo: "https://placehold.co/400x200/FFFFFF/00105A?text=PCL+Live+AV", 
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
    logo: "/assets/images/sponsors/saltire.jpg",
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
