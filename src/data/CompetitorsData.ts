
import { Competitor } from "@/lib/types";

// Create a function to generate placeholder logo URLs
const getPlaceholderLogo = (teamName: string): string => {
  return `https://placehold.co/200x200/FFFFFF/00105A?text=${encodeURIComponent(teamName)}`;
};

export const competitors: Competitor[] = [
  {
    name: "Brechin City FC",
    logo: getPlaceholderLogo("Brechin City"),
    shortName: "Brechin",
    website: "https://www.brechincity.com"
  },
  {
    name: "Brora Rangers FC",
    logo: getPlaceholderLogo("Brora Rangers"),
    shortName: "Brora",
    website: "https://www.brorarangers.football"
  },
  {
    name: "Buckie Thistle FC",
    logo: getPlaceholderLogo("Buckie Thistle"),
    shortName: "Buckie",
    website: "https://www.buckiethistle.com"
  },
  {
    name: "Clachnacuddin FC",
    logo: getPlaceholderLogo("Clachnacuddin"),
    shortName: "Clach",
    website: "https://www.clachfc.com"
  },
  {
    name: "Deveronvale FC",
    logo: getPlaceholderLogo("Deveronvale"),
    shortName: "Vale",
    website: "https://www.deveronvale.co.uk"
  },
  {
    name: "Formartine United FC",
    logo: getPlaceholderLogo("Formartine"),
    shortName: "Formartine",
    website: "https://www.formartineunitedfc.co.uk"
  },
  {
    name: "Forres Mechanics FC",
    logo: getPlaceholderLogo("Forres"),
    shortName: "Forres",
    website: "https://www.forresmechanics.net"
  },
  {
    name: "Fraserburgh FC",
    logo: getPlaceholderLogo("Fraserburgh"),
    shortName: "Broch",
    website: "https://www.fraserburghfc.co.uk"
  },
  {
    name: "Huntly FC",
    logo: getPlaceholderLogo("Huntly"),
    shortName: "Huntly",
    website: "https://www.huntlyfc.co.uk"
  },
  {
    name: "Keith FC",
    logo: getPlaceholderLogo("Keith"),
    shortName: "Keith",
    website: "https://www.keithfc.com"
  },
  {
    name: "Inverurie Loco Works FC",
    logo: getPlaceholderLogo("Locos"),
    shortName: "Locos",
    website: "https://www.inverurielocoworks.co.uk"
  },
  {
    name: "Lossiemouth FC",
    logo: getPlaceholderLogo("Lossie"),
    shortName: "Lossie",
    website: "https://www.lossiemouthfc.club"
  },
  {
    name: "Nairn County FC",
    logo: getPlaceholderLogo("Nairn"),
    shortName: "Nairn",
    website: "https://www.nairncountyfc.co.uk"
  },
  {
    name: "Rothes FC",
    logo: getPlaceholderLogo("Rothes"),
    shortName: "Rothes",
    website: "https://www.rothesfc.co.uk"
  },
  {
    name: "Strathspey Thistle FC",
    logo: getPlaceholderLogo("Strathspey"),
    shortName: "Strathspey",
    website: "https://www.strathspeythistlefc.co.uk"
  },
  {
    name: "Turriff United FC",
    logo: getPlaceholderLogo("Turriff"),
    shortName: "Turriff",
    website: "https://www.turriffunitedfc.co.uk"
  },
  {
    name: "Wick Academy FC",
    logo: getPlaceholderLogo("Wick"),
    shortName: "Wick",
    website: "https://www.wickacademyfc.co.uk"
  }
];

/**
 * Get competitor info by name
 */
export const getCompetitorByName = (name: string): Competitor | undefined => {
  return competitors.find(
    (c) => c.name.toLowerCase() === name.toLowerCase() || 
           c.shortName?.toLowerCase() === name.toLowerCase()
  );
};

/**
 * Get all competitors
 */
export const getAllCompetitors = (): Competitor[] => {
  return competitors;
};
