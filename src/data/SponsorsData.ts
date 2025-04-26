import { Sponsor } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export const sponsors: Sponsor[] = [
  {
    id: uuidv4(),
    name: "Global Energy Group",
    logo: "/assets/images/sponsors/Global.png",
    logoLight: "/assets/images/sponsors/Global-Light.png",
    website: "https://www.gegroup.com",
    tier: "platinum"
  },
  {
    id: uuidv4(),
    name: "CNR International",
    logo: "/assets/images/sponsors/CNR.png",
    website: "https://www.cnrinternational.com",
    tier: "platinum"
  },
  {
    id: uuidv4(),
    name: "Kerr Miller",
    logo: "/assets/images/sponsors/KerrMiller.png",
    website: "https://www.kerrmiller.co.uk",
    tier: "gold"
  },
  {
    id: uuidv4(),
    name: "Malcolm Allan",
    logo: "/assets/images/sponsors/MalcolmAllan.png",
    website: "https://www.malcolmallan.co.uk",
    tier: "gold"
  },
  {
    id: uuidv4(),
    name: "Richard Irvin",
    logo: "/assets/images/sponsors/RichardIrvin.png",
    website: "https://www.richard-irvin.com",
    tier: "silver"
  },
  {
    id: uuidv4(),
    name: "James Jamieson",
    logo: "/assets/images/sponsors/JamesJamieson.png",
    website: "https://www.jamesjamieson.co.uk",
    tier: "silver"
  },
  {
    id: uuidv4(),
    name: "Aiberdeen Taxis",
    logo: "/assets/images/sponsors/AiberdeenTaxis.png",
    website: "https://aiberdeentaxis.com",
    tier: "bronze"
  },
  {
    id: uuidv4(),
    name: "GTG Training",
    logo: "/assets/images/sponsors/GTG.png",
    website: "https://www.gtgtraining.co.uk",
    tier: "bronze"
  },
];
