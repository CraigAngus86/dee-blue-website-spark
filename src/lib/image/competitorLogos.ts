
import { getPlaceholderImage } from "./imageBase";

/**
 * Get competitor logo with proper path
 */
export const getCompetitorLogo = (
  teamName: string,
  variant?: 'default' | 'alternate'
): string => {
  // Extract the first part of the team name (before any spaces)
  const teamKey = teamName.split(' ')[0];
  
  // List of available competitor images
  const competitorImages = [
    "Brechin",
    "Brora",
    "Buckie",
    "Clach",
    "Deveronvale",
    "Formartine",
    "Forres",
    "Fraserburgh",
    "Huntly",
    "Keith",
    "Locos",
    "Lossie",
    "Nairn",
    "Rothes",
    "Strathspey",
    "Turriff",
    "Wick"
  ];
  
  // Find a matching competitor image
  const match = competitorImages.find(name => 
    teamKey.toLowerCase().includes(name.toLowerCase()) || 
    name.toLowerCase().includes(teamKey.toLowerCase())
  );
  
  if (match) {
    return `/assets/images/competitors/${match}.png`;
  }
  
  // Fallback to placeholder if no match is found
  return getPlaceholderImage(200, 200, teamName);
};
