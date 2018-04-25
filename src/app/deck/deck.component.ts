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

  constructor(
    private fire: FireService,
  ) { }

  ngOnInit() {
    this.fire.currentDeck.asObservable().subscribe(d => this.deck = d);
  }

}
