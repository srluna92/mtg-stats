import { Route } from '@angular/router';
import { OverviewComponent } from './overview.component';
import { AuthService } from '../services/auth.service';

export const OverviewRoute: Route[] = [
  {
    path: 'overview',
    canActivate: [AuthService],
    component: OverviewComponent
  }
];
