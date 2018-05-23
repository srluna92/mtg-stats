import { Component, OnInit } from '@angular/core';
import { LoginService, FormService } from '../services/index.service';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogPopupComponent } from './dialog-popup/dialog-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loginControl: FormGroup;
  registerControl: FormGroup;
  error: string;

  login() {
    this.loginService.login(this.username, this.password).then((e: any) => {
      this.error = e && e.value ? e.value.message : 'An error occurred. Please Try again later.';
    });
  }
  signIn() {
    this.loginService.signUp(this.username, this.password).then((e: any) => {
      this.error = e && e.value ? e.value.message : 'An error occurred. Please Try again later.';
    });
  }
  popUpSignIn(s: string) {
    this.loginService.loginPopup(s).then((e: any) => {
      this.error = e && e.value ? e.value.message : 'An error occurred. Please Try again later.';
    });
  }
  forgotPassword(): void {
    const dialogReg = this.dialog.open(DialogPopupComponent, {
      width: '250px'
    });
  }

  constructor(
    private loginService: LoginService,
    private formService: FormService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.loginControl = this.formService.loginForm();
    this.registerControl = this.formService.registerForm();
  }
}
