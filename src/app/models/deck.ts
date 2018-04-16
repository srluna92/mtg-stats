import { Match } from './match';
import { Card } from './card';

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
  colors: string[];
}
