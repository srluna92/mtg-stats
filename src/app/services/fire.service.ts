import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { forEach } from '@firebase/util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User, Match, Deck } from '../models/index';
import { CollectionReference, DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class FireService {

  decks = new BehaviorSubject<Deck[]>(new Array<Deck>());
  matches = new BehaviorSubject<Match[]>(new Array<Match>());
  format = new BehaviorSubject<string[]>(new Array<string>());

  retrieveDecks(u: string) {
    this.fire.collection('users').doc(u).collection('decks').valueChanges().subscribe((d: Deck[]) => {
      this.decks.next(d);
    });
  }
  updateDeck(deck: Deck, m?: boolean): void {
    this.fire.collection('users').doc('sluna').collection('decks')
      .doc(deck.name).set(JSON.parse(JSON.stringify(deck)), {merge: m});
  }
  retrieveMatches(d: Deck): void {
    this.fire.collection('users').doc('sluna')
      .collection('decks').doc(d.name).collection('matches').valueChanges().subscribe((m: Match[]) => {
        this.matches.next(m);
      });
  }
  retrieveFormat(): void {
    this.fire.collection('formats').doc('format').valueChanges().subscribe((f: any) => {
      this.format.next(f.formats ? f.formats : []);
    });
  }
  login(u: string, p: string): void {
    firebase.auth().signInWithEmailAndPassword(u, p).then(s => {
    }).catch(e => console.log(e));
  }
  signUp(u: string, p: string): void {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(u, p).then(s => {
      console.log(s);
    }).catch(e => {
      console.log(e);
    });
  }
  logout() {
    firebase.auth().signOut();
  }
  constructor(
    private fire: AngularFirestore,
  ) { }

}
