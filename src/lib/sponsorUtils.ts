
import { Sponsor } from "./types";
import { sponsors } from "@/data/SponsorsData";
import { getSponsorLogo as getLogoFromImage } from "@/lib/image/sponsorLogos";

/**
 * Get a sponsor's logo path
 * @deprecated Use getSponsorLogo from '@/lib/image/sponsorLogos' instead
 */
export const getSponsorLogo = (
  sponsorName: string,
  variant: "light" | "dark" = "dark"
): string | undefined => {
  return getLogoFromImage(sponsorName, variant);
};

/**
 * Get all sponsor logos
 * @deprecated Use functions from '@/lib/image/sponsorLogos' instead
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
 * @deprecated Use getMainSponsor from '@/data/SponsorsData' instead
 */
export const getMainSponsorInfo = (): Sponsor | undefined => {
  return sponsors.find(s => s.tier === "main");
};
