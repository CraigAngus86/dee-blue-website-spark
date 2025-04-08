
import { Competitor } from "@/lib/types";

export const competitors: Competitor[] = [
  {
    name: "Brechin City FC",
    logo: "/assets/images/competitors/brechin-city-fc.png",
    shortName: "Brechin",
    website: "https://www.brechincity.com"
  },
  {
    name: "Brora Rangers FC",
    logo: "/assets/images/competitors/brora-rangers-fc.png",
    shortName: "Brora",
    website: "https://www.brorarangers.football"
  },
  {
    name: "Buckie Thistle FC",
    logo: "/assets/images/competitors/buckie-thistle-fc.png",
    shortName: "Buckie",
    website: "https://www.buckiethistle.com"
  },
  {
    name: "Clachnacuddin FC",
    logo: "/assets/images/competitors/clachnacuddin-fc.png",
    shortName: "Clach",
    website: "https://www.clachfc.com"
  },
  {
    name: "Deveronvale FC",
    logo: "/assets/images/competitors/deveronvale-fc.png",
    shortName: "Vale",
    website: "https://www.deveronvale.co.uk"
  },
  {
    name: "Formartine United FC",
    logo: "/assets/images/competitors/formartine-united-fc.png",
    shortName: "Formartine",
    website: "https://www.formartineunitedfc.co.uk"
  },
  {
    name: "Forres Mechanics FC",
    logo: "/assets/images/competitors/forres-mechanics-fc.png",
    shortName: "Forres",
    website: "https://www.forresmechanics.net"
  },
  {
    name: "Fraserburgh FC",
    logo: "/assets/images/competitors/fraserburgh-fc.png",
    shortName: "Broch",
    website: "https://www.fraserburghfc.co.uk"
  },
  {
    name: "Huntly FC",
    logo: "/assets/images/competitors/huntly-fc.png",
    shortName: "Huntly",
    website: "https://www.huntlyfc.co.uk"
  },
  {
    name: "Keith FC",
    logo: "/assets/images/competitors/keith-fc.png",
    shortName: "Keith",
    website: "https://www.keithfc.com"
  },
  {
    name: "Inverurie Loco Works FC",
    logo: "/assets/images/competitors/inverurie-loco-works-fc.png",
    shortName: "Locos",
    website: "https://www.inverurielocoworks.co.uk"
  },
  {
    name: "Lossiemouth FC",
    logo: "/assets/images/competitors/lossiemouth-fc.png",
    shortName: "Lossie",
    website: "https://www.lossiemouthfc.club"
  },
  {
    name: "Nairn County FC",
    logo: "/assets/images/competitors/nairn-county-fc.png",
    shortName: "Nairn",
    website: "https://www.nairncountyfc.co.uk"
  },
  {
    name: "Rothes FC",
    logo: "/assets/images/competitors/rothes-fc.png",
    shortName: "Rothes",
    website: "https://www.rothesfc.co.uk"
  },
  {
    name: "Strathspey Thistle FC",
    logo: "/assets/images/competitors/strathspey-thistle-fc.png",
    shortName: "Strathspey",
    website: "https://www.strathspeythistlefc.co.uk"
  },
  {
    name: "Turriff United FC",
    logo: "/assets/images/competitors/turriff-united-fc.png",
    shortName: "Turriff",
    website: "https://www.turriffunitedfc.co.uk"
  },
  {
    name: "Wick Academy FC",
    logo: "/assets/images/competitors/wick-academy-fc.png",
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
