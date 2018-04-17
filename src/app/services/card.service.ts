import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { Observable } from 'rxjs/observable';
import { forEach } from '@firebase/util';
import { of } from 'rxjs/observable/of';
import { Card } from '../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CardService {

  getCards(text: string): void {
    const cards = new Array<Card>();
    if (!text || text.split('\n').length > 80) {
      return;
    }
    let main = true;
    forEach(text.split('\n'), (line: string) => {
      line = line.replace(/\s+/, ' ').trim(); // remove unneccesary spaces
      const lineSplit = line.split('\s');
      if (lineSplit.length > 1) {
        this.getCard(lineSplit, main);
      } else {
        main = false;
      }
    });
  }

  private getCard(lineSplit: string[], main: boolean): void {
    let card = new Card();
    this.fire.cards.asObservable().subscribe(c => {
      const matching = c.filter(val => {
        return val.name.match(new RegExp(lineSplit[1], 'gi'));
      });
      if (matching.length) {
        card = matching[0];
        card.amount = lineSplit[0].match(/^[1-4]x?$/g) ? +lineSplit[0].replace(/x/, '') : 1;
        card.main = main;
        const cA = this.fire.cards.getValue();
        cA.push(card);
        this.fire.cards.next(cA);
      } else {
        this.callMTG(lineSplit, main);
      }
    });
  }

  private callMTG(lineSplit: string[], main: boolean) {

  }

  constructor(
    private fire: FireService
  ) { }

}
