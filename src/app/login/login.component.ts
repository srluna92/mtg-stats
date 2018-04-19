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
  error: string;

  login() {
    this.loginService.login(this.username, this.password).then((e: any) => {
      this.error = e && e.value ? e.value.message : '';
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
  }
}
