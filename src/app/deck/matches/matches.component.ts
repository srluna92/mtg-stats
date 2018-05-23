import { Component, OnInit, Input } from '@angular/core';
import { Deck, Game, Match } from '../../models';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  @Input() deck: Deck;
  constructor(
    private fire: FireService
  ) { }

  format: string[];
  Games: Game[];

  addMatch(): void {
    this.deck.matches = this.deck.matches ? this.deck.matches : new Array<Match>();
    this.deck.matches.push(new Match('New Match', new Array<Game>()));
  }
  addGame(i: number): void {
    this.deck.matches[i].games.push(new Game());
  }
  removeGame(m: number, g: number): void {
    this.deck.matches[m].games.slice(g, 1);
  }
  update(): void {
    const obj = [0, 0, 0];
    this.deck.matches.forEach(match => {
      match.games.forEach(game => {
        if (game.type !== null && game.result !== null) {
          obj[game.type] += +game.result;
        }
      });
      obj[2] += +match.games.length;
    });
    this.deck.games = obj[2];
    this.deck.winsDraw = obj[0];
    this.deck.winsPlay = obj[1];
    this.fire.updateDeck(this.deck, true);
  }
  updateColors(c: number): void {
    if (this.deck.colors) {
      this.deck.colors = this.deck.colors % c === 0 ? this.deck.colors / c : this.deck.colors * c;
    } else {
      this.deck.colors = c;
    }
  }
  updateOppColors(i: number, c: number): void {
    if (this.deck.matches[i].oppColors) {
      this.deck.matches[i].oppColors = this.deck.matches[i].oppColors % c === 0
        ? this.deck.matches[i].oppColors / c : this.deck.matches[i].oppColors * c;
    } else {
      this.deck.matches[i].oppColors = c;
    }
  }
  ngOnInit() {
    this.fire.format.asObservable().subscribe(f => this.format = f);
  }

}
