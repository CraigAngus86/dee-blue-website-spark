
import { Sponsor } from "@/lib/types";

export const sponsors: Sponsor[] = [
  {
    name: "AD23",
    logo: "/assets/images/sponsors/sponsor-ad23-dark.png",
    logoLight: "/assets/images/sponsors/sponsor-ad23-light.png", // If we have a light variant
    website: "https://ad23.com",
    tier: "main",
  },
  {
    name: "BJK Winton Properties",
    logo: "/assets/images/sponsors/sponsor-bjk-winton.png",
    website: "https://bjkwinton.com",
    tier: "platinum",
  },
  {
    name: "PCL Live AV",
    logo: "/assets/images/sponsors/sponsor-pcl-live.png",
    website: "https://pcllive.com",
    tier: "gold",
  },
  {
    name: "ADX",
    logo: "/assets/images/sponsors/sponsor-adx.png",
    website: "https://adx.com",
    tier: "gold",
  },
  {
    name: "Saltire Energy",
    logo: "/assets/images/sponsors/sponsor-saltire-energy.png",
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
