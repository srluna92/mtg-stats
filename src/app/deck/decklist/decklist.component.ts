import { Component, OnInit, Input } from '@angular/core';
import { FireService } from '../../services/fire.service';
import { CardService } from '../../services/card.service';
import { Card } from '../../models';
import { forEach } from '@firebase/util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-decklist',
  templateUrl: './decklist.component.html',
  styleUrls: ['./decklist.component.css']
})
export class DecklistComponent implements OnInit {

  @Input() deckList: Card[];
  dL = new BehaviorSubject<string>('');
  sort: string;

  sortDeck(): void {
    this.deckList = this.deckList.sort((a, b) => {
      if (a.main === b.main) {
        switch (this.sort) {
          // case 'colors': return this.compareColors(a, b);
          default: return a[this.sort] < b[this.sort] ? 1 : -1;
        }
      } else {
        return a.main ? 1 : -1;
      }
    });
  }
  compareColors(a: Card, b: Card) {
    if (a.colors.length === b.colors.length) {
      switch (a.colors.length) {
        case 0: return 0;
        case 1: return a.colors[0] < b.colors[0] ? 1 : -1;
        default:
          forEach(a.colors, c => {
            if (b.colors.includes(c)) {
              b.colors.splice(b.colors.indexOf(c), 1);
            }
          });
          if (b.colors.length > 0) {
            // baaaahhh
          } else {
            return 0;
          }
      }
      return 1;
    } else {
      return a.colors.length < b.colors.length ? 1 : -1;
    }
  }
  addDeck(e: any) {
    if (e && e.target && e.target.files[0]) {
      const fr = new FileReader();
      const d = new BehaviorSubject<string>('');
      fr.onload = function(ie: any) {
        d.next(ie.target.result);
      };
      d.asObservable().subscribe(s => this.dL.next(s));
      fr.readAsText(e.target.files[0]);
      // this.fire.cards.asObservable().subscribe(cA => this.deckList = cA);
      // this.cardService.getCards(dL);
    }
  }
  constructor(
    private fire: FireService,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.dL.asObservable().subscribe(dL => {
      if (dL) {
        this.deckList = this.cardService.getCards(dL);
        const cD = this.fire.currentDeck.getValue();
        cD.deckList = this.deckList;
        this.fire.currentDeck.next(cD);
      }
    });
  }
}
