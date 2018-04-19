import { Component, OnInit, Inject } from '@angular/core';
import { LoginComponent } from '../login.component';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FormService, LoginService } from '../../services/index.service';

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  // styleUrls: ['./dialog-popup.component.css']
})
export class DialogPopupComponent implements OnInit {

  email: string;
  invalid: boolean;
  resetForm: FormControl;

  reset(): void {
    this.loginService.resetPassword(this.email).then(s => {
      //
    });
  }

  constructor(
    public dialogReg: MatDialogRef<LoginComponent>,
    private formService: FormService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.resetForm = this.formService.resetForm();
  }

}
