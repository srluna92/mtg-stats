import { Component, OnInit } from '@angular/core';
import { FireService } from '../services/fire.service';
import { Game, Card, Deck, Match } from '../models';
import { ActivatedRoute } from '@angular/router';
import { forEach } from '@firebase/util';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  deck: Deck;
  format: string[];
  Games: Game[];

  addMatch(): void {
    this.deck.matches = this.deck.matches ? this.deck.matches : new Array<Match>();
    const m = new Match();
    m.games = new Array<Game>();
    m.name = 'New Match';
    this.deck.matches.push(m);
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
        obj[game.type] += +game.result;
      });
      obj[2] += +match.games.length;
    });
    this.deck.games = obj[2];
    this.deck.winsDraw = obj[0];
    this.deck.winsPlay = obj[1];
    this.fire.updateDeck(this.deck, true);
  }
  constructor(
    private fire: FireService,
    private route: ActivatedRoute,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.fire.currentDeck.asObservable().subscribe(d => this.deck = d);
    this.fire.format.asObservable().subscribe(f => this.format = f);
    this.fire.retrieveCards();
  }

}
