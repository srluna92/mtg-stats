import { Route } from '@angular/router';
import { OverviewRoute } from './overview/overview.route';
import { LoginRoute } from './login/login.route';
import { DeckRoute } from './deck/deck.route';
import { HomeRoute } from './home/home.route';
import { SettingsRoute } from './settings/settings.route';
import { FeedbackRoute } from './feedback/feedback.route';

export const routes: Route[] = [
  ...OverviewRoute,
  ...LoginRoute,
  ...DeckRoute,
  ...HomeRoute,
  ...SettingsRoute,
  ...FeedbackRoute,
  {
    path: '**',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];
