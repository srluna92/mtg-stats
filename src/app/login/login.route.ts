import { Route } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginAuthService } from '../services/index.service';

export const LoginRoute: Route[] = [
  {
    path: 'login',
    canActivate: [LoginAuthService],
    component: LoginComponent
  }
];
