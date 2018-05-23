import { Component, OnInit, ViewChild } from '@angular/core';
import { FireService } from '../services/index.service';
import { MatTableDataSource, Sort, MatSort, MatPaginator } from '@angular/material';
import { Deck } from '../models/deck';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Settings } from '../models';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  headerCol = ['Deck', 'Format', 'Wins', 'Win on Draw', 'Win on Play', 'Total Games'];
  dataSource = new MatTableDataSource<Deck>(null);
  decks: Deck[];
  s: Settings;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  newDeck(): void {
    let id = this.decks.length > 0 ? +this.decks[this.decks.length - 1].id : 1;
    id = id ? ((id * environment.modulo[2]) % environment.modulo[0]) + 1 : id;
    this.fire.currentDeck.next(new Deck(id));
    this.router.navigateByUrl('deck/new');
  }

  chooseDeck(d: Deck): void {
    this.fire.currentDeck.next(d);
    this.router.navigateByUrl('deck/' + d.name.replace(' ', '_'));
  }

  sortData(sort: Sort) {
    let data = this.dataSource.data;
    const asc = sort.direction === 'asc' ? 1 : -1;
    data = !sort.direction ? this.fire.decks.getValue() : data.sort((a, b) => {
      switch (sort.active) {
        case 'Wins': return ((a.winsPlay + a.winsDraw) / a.games) < ((b.winsPlay + b.winsDraw) / b.games) ? 1 : -1 * asc;
        case 'Win on Draw': return (a.winsDraw / a.games) < (b.winsDraw / b.games) ? 1 : -1 * asc;
        case 'Win on Play': return (a.winsPlay / a.games) < (b.winsPlay / b.games) ? 1 : -1 * asc;
        case 'Deck': return a.name < b.name ? 1 : -1 * asc;
        case 'Format': return a.format < b.format ? 1 : -1 * asc;
        case 'Total Games': return a.games < b.games ? 1 : -1 * asc;
        default: return 0;
      }
    });
    this.dataSource.data = data;
  }

  constructor(
    private fire: FireService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fire.decks.asObservable().subscribe(d => {
      this.dataSource = new MatTableDataSource<Deck>(d);
      this.dataSource.paginator = this.paginator;
      this.decks = d;
    });
    this.fire.settings.asObservable().subscribe(set => this.s = set);
    this.fire.retrieveDecks();
    this.fire.retrieveFormat();
    this.fire.retrieveSettings();
  }

}
