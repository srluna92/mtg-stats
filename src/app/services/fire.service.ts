import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { forEach } from '@firebase/util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User, Match, Deck, Card } from '../models/index';
import { CollectionReference, DocumentReference } from '@firebase/firestore-types';
import { LoginService } from './login.service';

@Injectable()
export class FireService {

  decks = new BehaviorSubject<Deck[]>(new Array<Deck>());
  matches = new BehaviorSubject<Match[]>(new Array<Match>());
  cards = new BehaviorSubject<Card[]>(new Array<Card>());
  format = new BehaviorSubject<string[]>(new Array<string>());
  currentDeck = new BehaviorSubject<Deck>(new Deck());

  retrieveDecks() {
    this.fire.collection('users').doc(this.loginService.user.getValue().email).collection('decks').valueChanges().subscribe((d: Deck[]) => {
      this.decks.next(d);
    });
  }
  retrieveDeckByName(name: string) {
    console.log(name);
    this.fire.collection('users').doc(this.loginService.user.getValue().email).collection('decks')
      .doc('name').valueChanges().subscribe((d: Deck) => {
        this.currentDeck.next(d);
    });
  }
  updateDeck(deck: Deck, m?: boolean): void {
    this.fire.collection('users').doc(this.loginService.user.getValue().email).collection('decks')
      .doc(deck.name).set(JSON.parse(JSON.stringify(deck)), {merge: m});
  }
  retrieveMatches(d: Deck): void {
    this.fire.collection('users').doc(this.loginService.user.getValue().email)
      .collection('decks').doc(d.name).collection('matches').valueChanges().subscribe((m: Match[]) => {
        this.matches.next(m);
      });
  }
  retrieveFormat(): void {
    this.fire.collection('formats').doc('format').valueChanges().subscribe((f: any) => {
      this.format.next(f.formats ? f.formats : []);
    });
  }
  retrieveCards(): void {
    this.fire.collection('cards').valueChanges().subscribe((c: Card[]) => {
      this.cards.next(c);
    });
  }
  updateCards(): void {
    this.fire.collection('cards').add(this.cards.getValue());
  }
  sendFeedback(message: string): void {
    const data = {message: message, user: this.loginService.user.getValue().email};
    this.fire.collection('feedback').add({data: data});
  }
  constructor(
    private fire: AngularFirestore,
    private loginService: LoginService
  ) { }

}
