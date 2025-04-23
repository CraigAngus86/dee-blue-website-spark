
import { getPlaceholderImage } from "./imageBase";

/**
 * Get competitor logo with proper path
 */
export const getCompetitorLogo = (
  teamName: string,
  variant?: 'default' | 'alternate'
): string => {
  // Normalize team name by removing 'FC' and converting to lowercase
  const normalizedTeamKey = teamName.replace(' FC', '').split(' ')[0].toLowerCase();
  
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
    "Wick",
    "Banks o' Dee"  // Added explicit match for Banks o' Dee
  ];
  
  // Find a matching competitor image
  const match = competitorImages.find(name => 
    normalizedTeamKey.includes(name.toLowerCase()) || 
    name.toLowerCase().includes(normalizedTeamKey)
  );
  
  if (match === "Banks o' Dee") {
    return "/assets/images/competitors/Banks o' Dee.png";
  }
  
  if (match) {
    return `/assets/images/competitors/${match}.png`;
  }
  
  // Fallback to placeholder if no match is found
  return getPlaceholderImage(200, 200, teamName);
};
