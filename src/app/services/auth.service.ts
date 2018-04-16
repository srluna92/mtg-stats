import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean> (obs => {
      this.loginService.user.asObservable().subscribe(u => {
        if (!u || !u.email) {
          this.router.navigateByUrl('login');
        }
        return obs.next(!!(u && u.email));
      });
    });
  }
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

}
