import { Component, OnInit, Input } from '@angular/core';
import { Deck, Match, Game } from '../../models';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  chartData: Array<any> = [];
  chartLabels: Array<string> = [];
  chartOptions: any = {
    responsive: true
  };
  chartType = 'bar';

  deck: Deck;

  chartHover(): void {}
  chartClick(): void {}

  constructor(
    private fire: FireService
  ) { }

  ngOnInit() {
    this.fire.currentDeck.asObservable().subscribe(deck => {
      if (deck) {
        this.deck = deck;
        const obj = [[], []];
        this.deck.matches.forEach((m: Match) => {
          this.chartLabels.push(m.name);
          const gObj = [0, 0, 0];
          m.games.forEach((g: Game) => {
            if (g.type !== undefined && g.result !== undefined) {
              gObj[g.type] += +g.result;
            }
          });
          obj[0].push((gObj[0] / m.games.length) * 100);
          obj[1].push((gObj[1] / m.games.length) * 100);
        });
        this.chartData = [{data: obj[0], label: 'On Draw'}, {data: obj[1], label: 'On Play'}];
      }
    });
  }

}
