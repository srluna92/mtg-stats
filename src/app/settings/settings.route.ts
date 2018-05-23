import { Route } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthService } from '../services/auth.service';

export const SettingsRoute: Route[] = [
  {
    path: 'settings',
    canActivate: [AuthService],
    component: SettingsComponent
  }
];
