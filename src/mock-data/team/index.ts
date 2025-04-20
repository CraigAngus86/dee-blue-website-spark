
import { management } from './management';
import { goalkeepers } from './goalkeepers';
import { defenders } from './defenders';
import { midfielders } from './midfielders';
import { forwards } from './forwards';

export const teamData = {
  management,
  goalkeepers,
  defenders,
  midfielders,
  forwards
};

export type TeamMember = {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  nationality: string;
  image: string;
  number: number | null;
};
