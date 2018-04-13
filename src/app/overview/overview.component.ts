import { Component, OnInit } from '@angular/core';
import { FireService } from '../services/index.service';
import { MatTableDataSource, Sort, MatSort } from '@angular/material';
import { Deck } from '../models/deck';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  headerCol = ['Deck', 'Format', 'Wins', 'Win on Draw', 'Win on Play', 'Total Games'];
  dataSource = new MatTableDataSource<Deck>(null);
  decks: Deck[];
  selectedDeck: Deck;

  newDeck(): void {
    this.decks.push(new Deck());
    this.selectedDeck = new Deck();
  }

  chooseDeck(d: Deck): void {
    this.selectedDeck = d;
    if (!this.selectedDeck.matches || this.selectedDeck.matches.length < 1) {
      this.fire.matches.asObservable().subscribe(m => {
        this.selectedDeck.matches = m;
      });
    }
    this.fire.retrieveMatches(d);
  }

  sortData(sort: Sort) {
    let data = this.dataSource.data;
    data = (!sort.active || !sort.direction) ? data : data.sort((a, b) => {
      const asc = sort.direction === 'asc' ? 1 : -1;
      switch (sort.active) {
        case '% Wins': return ((a.winsPlay + a.winsDraw) / a.games) < ((b.winsPlay + b.winsDraw) / b.games) ? -1 : 1 * asc;
        case '% Wins on Draw': return (a.winsDraw / a.games) < (b.winsDraw / b.games) ? -1 : 1 * asc;
        case '% Wins on Play': return (a.winsPlay / a.games) < (b.winsPlay / b.games) ? -1 : 1 * asc;
        case 'Deck': return a.name < b.name ? -1 : 1 * asc;
        case 'Format': return a.format < b.format ? -1 : 1 * asc;
        case 'Total Games': return a.games < b.games ? -1 : 1 * asc;
        default: return a[sort.active] < b[sort.active] ? -1 : 1 * asc;
      }
    });
    this.dataSource = new MatTableDataSource<Deck>(data);
  }

  constructor(
    private fire: FireService
  ) { }

  ngOnInit() {
    this.fire.decks.asObservable().subscribe(d => {
      this.dataSource = new MatTableDataSource<Deck>(d);
      this.decks = d;
    });
    this.fire.retrieveDecks();
    this.fire.retrieveFormat();
  }

}
