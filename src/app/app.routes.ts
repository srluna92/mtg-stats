import { Route } from '@angular/router';
import { OverviewRoute } from './overview/overview.route';
import { LoginRoute } from './login/login.route';

export const routes: Route[] = [
  ...OverviewRoute,
  ...LoginRoute,
  {
    path: '**',
    redirectTo: 'overview',
    pathMatch: 'full'
  }
];
