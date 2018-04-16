import { Game } from './game';

export class Match {
  id: string;
  name: string;
  winsPlay: number;
  winsDraws: number;
  games: Game[];
  notes: string;
  location: string;
  date: string;
  competitve: boolean;
}
