import { Component, OnInit } from '@angular/core';
import { Deck, Match, Game } from '../../models';
import { forEach } from '@firebase/util';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-overview-analytics',
  templateUrl: './overview-analytics.component.html',
  styleUrls: ['./overview-analytics.component.css']
})
export class OverviewAnalyticsComponent implements OnInit {

  chartData: Array<any> = [];
  chartLabels: Array<string> = [];
  chartType = 'bar';
  chartLegend = true;
  public chartOptions: any = {
    responsive: true
  };

  createData(decks: Deck[]): void {
    const obj = [[], [], []];
    decks.forEach((deck: Deck) => {
      if (!this.chartLabels.includes(deck.name)) {
        this.chartLabels.push(deck.name);
      }
      obj[0].push(deck.winsDraw);
      obj[1].push(deck.winsPlay);
      obj[2].push(deck.games);
    });
    this.chartData = [{data: obj[0], label: 'Wins Draw'}, {data: obj[1], label: 'Wins Play'}, {data: obj[2], label: 'Games'}];
  }

  constructor(
    private fire: FireService
  ) { }
  ngOnInit() {
    this.fire.decks.asObservable().subscribe(decks => this.createData(decks));
  }

}
