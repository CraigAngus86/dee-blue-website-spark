
/**
 * Sponsor logo image utilities
 */
import { sponsors } from "@/data/SponsorsData";
import { Sponsor } from "@/lib/types";

/**
 * Get a sponsor's logo path
 */
export const getSponsorLogo = (
  sponsorName: string,
  variant: "light" | "dark" = "dark"
): string => {
  const sponsor = sponsors.find(s => s.name.toLowerCase() === sponsorName.toLowerCase());
  
  if (!sponsor) {
    console.warn(`Sponsor not found: ${sponsorName}`);
    // Return a placeholder image if sponsor not found
    return `https://placehold.co/400x200/FFFFFF/00105A?text=${encodeURIComponent(sponsorName)}`;
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
