import { Match } from './match';
import { Card } from './card';
import { environment } from '../../environments/environment';

export class Deck {
  id: string;
  name: string;
  format: string;
  notes: string;
  games: number;
  winsPlay: number;
  winsDraw: number;
  matches: Match[];
  deckList: Card[];
  colors: number;

  constructor(id?: number) {
    if (typeof id === 'number') {
      this.id = String((id * environment.modulo[1]) % environment.modulo[0]);
    }
  }
}
