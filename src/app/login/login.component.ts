import { Component, OnInit } from '@angular/core';
import { FireService } from '../services/fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  constructor(
    private fire: FireService
  ) { }

  login() {
    this.fire.login(this.username, this.password);
  }

  ngOnInit() {
  }

}
