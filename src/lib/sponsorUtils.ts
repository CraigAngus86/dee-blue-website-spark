
// This file is deprecated. Please use the functions from '@/lib/image' instead.
import { Sponsor } from "./types";
import { sponsors } from "@/data/SponsorsData";

/**
 * Get a sponsor's logo path
 */
export const getSponsorLogo = (
  sponsorName: string,
  variant: "light" | "dark" = "dark"
): string | undefined => {
  const sponsor = sponsors.find(s => s.name.toLowerCase() === sponsorName.toLowerCase());
  
  if (!sponsor) {
    console.warn(`Sponsor not found: ${sponsorName}`);
    return undefined;
  }
  
  return variant === "light" && sponsor.logoLight ? sponsor.logoLight : sponsor.logo;
};

/**
 * Get all sponsor logos
 */
export const getAllSponsorLogos = (
  tier?: Sponsor["tier"]
): string[] => {
  const filteredSponsors = tier 
    ? sponsors.filter(s => s.tier === tier) 
    : sponsors;
    
  return filteredSponsors.map(s => s.logo);
};

/**
 * Get main sponsor info
 */
export const getMainSponsorInfo = (): Sponsor | undefined => {
  return sponsors.find(s => s.tier === "main");
};
