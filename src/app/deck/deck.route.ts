import { Route } from '@angular/router';
import { DeckComponent } from './deck.component';
import { AuthService } from '../services/index.service';

export const DeckRoute: Route[] = [
  {
    path: 'deck/:name',
    canActivate: [AuthService],
    component: DeckComponent
  }
];
