import { Component, OnInit, Input } from '@angular/core';
import { Deck } from '../models/deck';
import { Match } from '../models/match';
import { FireService } from '../services/fire.service';
import { Game } from '../models';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  @Input() deck: Deck;
  format: string[];

  addMatch(): void {
    this.deck.matches = this.deck.matches ? this.deck.matches : new Array<Match>();
    const m = new Match();
    m.name = 'New Match';
    this.deck.matches.push(m);
  }
  addGame(i: number): void {
    this.deck.matches[i].games = this.deck.matches[i].games ? this.deck.matches[i].games : new Array<Game>();
    this.deck.matches[i].games.push(new Game());
  }
  removeGame(i: number, j: number): void {
    this.deck.matches[i].games.slice(j, 1);
  }
  update(): void {
    this.deck.matches.forEach(match => {
      match.games.forEach(game => {
        switch (game.type) {
          case 0 : this.deck.winsDraw += game.result; break;
          case 1 : this.deck.winsPlay += game.result; break;
          default: break;
        }
      });
      this.deck.games += match.games.length;
    });
    this.fire.updateDeck(this.deck);
  }
  constructor(
    private fire: FireService
  ) { }

  ngOnInit() {
    this.deck = this.deck ? this.deck : new Deck();
    this.fire.format.asObservable().subscribe(f => this.format = f);
  }

}
