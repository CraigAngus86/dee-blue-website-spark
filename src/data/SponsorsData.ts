
import { Sponsor } from "@/lib/types";

// Use Lovable uploads to ensure we have reliable images
export const sponsors: Sponsor[] = [
  {
    name: "AD23",
    logo: "/lovable-uploads/a5037c12-6941-420d-a1b7-a593e53a5e59.png",
    logoLight: "/lovable-uploads/a5037c12-6941-420d-a1b7-a593e53a5e59.png",
    website: "https://ad23.com",
    tier: "main",
  },
  {
    name: "BJK Winton Properties",
    logo: "/lovable-uploads/c1270e92-10b7-4250-b57a-915bb40a0e12.png",
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
