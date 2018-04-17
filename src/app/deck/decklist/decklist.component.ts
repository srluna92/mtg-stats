import { Component, OnInit, Input } from '@angular/core';
import { FireService } from '../../services/fire.service';
import { CardService } from '../../services/card.service';
import { Card } from '../../models';

@Component({
  selector: 'app-decklist',
  templateUrl: './decklist.component.html',
  styleUrls: ['./decklist.component.css']
})
export class DecklistComponent implements OnInit {

  @Input() deckList: Card[];
  sort: string;

  sortDeck(): void {
    this.deckList = this.deckList.sort((a, b) => {
      if (a.main === b.main) {
        return a[this.sort] < b[this.sort] ? -1 : 1;
      } else if (a.main && !b.main) {
        return 1;
      } else if (!a.main && b.main) {
        return -1;
      }
    });
  }

  addDeck(e: any) {
    if (e && e.target && e.target.files[0]) {
      const fr = new FileReader();
      let dL: any;
      fr.onload = function(ie: any) {
        dL = ie.target.result;
      };
      fr.readAsText(e.target.files[0]);
      this.fire.cards.asObservable().subscribe(cA => this.deckList = cA);
      this.cardService.getCards(dL);
    }
  }
  constructor(
    private fire: FireService,
    private cardService: CardService
  ) { }

  ngOnInit() { }

}
