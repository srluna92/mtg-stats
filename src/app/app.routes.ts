import { Route } from '@angular/router';
import { OverviewRoute } from './overview/overview.route';
import { LoginRoute } from './login/login.route';
import { DeckRoute } from './deck/deck.route';
import { BracketRoute } from './bracket/bracket.route';

export const routes: Route[] = [
  ...OverviewRoute,
  ...LoginRoute,
  ...DeckRoute,
  ...BracketRoute,
  {
    path: '**',
    redirectTo: 'overview',
    pathMatch: 'full'
  }
];
