import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './services/login.service';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  user: User;

  logout(): void {
    this.loginService.logout();
  }
  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.user.asObservable().subscribe(u => {
      this.user = u;
    });
    this.loginService.authUser();
  }
}
