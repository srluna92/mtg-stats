import { Base } from './base';

export class Card extends Base {
  name: string;
  amount: number;
  img: string;
  type: string;
  cmc: string;
  colors: string[];
  main: boolean;
}
