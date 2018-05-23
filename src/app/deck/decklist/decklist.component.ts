import { Component, OnInit } from '@angular/core';
import { FireService } from '../../services/fire.service';
import { CardService } from '../../services/card.service';
import { Card, Deck } from '../../models';
import { forEach } from '@firebase/util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-decklist',
  templateUrl: './decklist.component.html',
  styleUrls: ['./decklist.component.css']
})
export class DecklistComponent implements OnInit {

  deck: Deck;
  dL = new BehaviorSubject<string>('');
  mainList: Card[];
  sideBoard: Card[];

  addDeck(e: any) {
    if (e && e.target && e.target.files[0]) {
      const fr = new FileReader();
      const d = new BehaviorSubject<string>('');
      fr.onload = function(ie: any) {
        d.next(ie.target.result);
      };
      d.asObservable().subscribe(s => this.dL.next(s));
      fr.readAsText(e.target.files[0]);
    }
  }
  constructor(
    private fire: FireService,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.fire.currentDeck.asObservable().subscribe(d => {
      this.deck = d;
      if (this.deck.deckList) {
        this.mainList = this.deck.deckList.filter((card: Card) => card.main);
        this.sideBoard = this.deck.deckList.filter((card: Card) => card.main === false);
      }
    });
    this.dL.asObservable().subscribe(dL => {
      if (dL) {
        this.deck.deckList = this.cardService.getCards(dL);
        this.fire.currentDeck.next(this.deck);
        this.mainList = this.deck.deckList.filter((card: Card) => card.main);
        this.sideBoard = this.deck.deckList.filter((card: Card) => card.main === false);
      }
    });
  }
}
