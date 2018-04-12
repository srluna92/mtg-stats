import { Component, OnInit, Input } from '@angular/core';
import { Deck } from '../models/deck';
import { Match } from '../models/match';
import { FireService } from '../services/fire.service';
import { forEach } from '@firebase/util';
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
  update(): void {
    let play = 0;
    let draw = 0;
    let games = 0;
    this.deck.matches.forEach(match => {
      let matchPlay = 0;
      let matchDraw = 0;
      match.games.forEach(game => {
        if (parseInt(game.type.toString(), 0)) {
          matchPlay += parseInt(game.result.toString(), 0);
        } else {
          matchDraw += parseInt(game.result.toString(), 0);
        }
      });
      play += matchPlay;
      draw += matchDraw;
      games += match.games.length;
    });

    this.deck.games = games;
    this.deck.winsDraw = draw;
    this.deck.winsPlay = play;
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
