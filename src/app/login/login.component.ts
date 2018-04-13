import { Component, OnInit } from '@angular/core';
import { LoginService, FormService } from '../services/index.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loginControl: FormGroup;
  error: string;

  constructor(
    private loginService: LoginService,
    private formService: FormService
  ) { }

  login() {
    this.loginService.login(this.username, this.password).then((e: any) => {
      this.error = e.value.message;
    });
  }

  signIn() {
    this.loginService.signUp(this.username, this.password).then((e: any) => {
      this.error = e.value.message;
    });
  }

  popUpSignIn(s: string) {
    this.loginService.loginPopup(s).then((e: any) => {
      this.error = e.value.message;
    });
  }

  ngOnInit() {
    this.loginControl = this.formService.loginForm();
  }

}
