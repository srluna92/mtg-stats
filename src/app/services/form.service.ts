import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

const cardForm = /^\d{11}(\d{5})?$/; // /^4300\d{12}$/;
const pointValue = /^\d+(?:[\.]\d{2})?$/;
const emailForm = /(?:^[\w\d!|#|$|&|\'|\*|\+|\-|\/|=|\?|`|{|\|}|~]+)(?:(\.[\d\w!|#|$|&|\'|\*|\+|\-|\/|=|\?|`|{|\|}|~]+)*\@)(?:[a-zA-Z0-9]([a-zA-Z-]{0,61}[a-zA-Z0-9])?)([^\s!|#|$|&|\'|\*|\+|\-|\/|=|\?|`|{|\|}|~@]*)(?:\.[a-zA-Z]{2,}$)/;

@Injectable()
export class FormService {
  fb: FormBuilder = new FormBuilder();

  loginForm(): FormGroup {
    return this.fb.group({
      'username': ['', [Validators.required, Validators.pattern(emailForm)]],
      'password': ['', Validators.required],
    });
  }
  registerForm(): FormGroup {
    return this.fb.group({
      'username': ['', [Validators.required, Validators.pattern(emailForm)]],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
    }, {
      validator: PasswordValidation.matchPassword
    });
  }
  resetForm(): FormControl {
    return new FormControl('', {validators: [Validators.required, Validators.pattern(emailForm)]});
  }
  constructor() { }

}

export class PasswordValidation {
  static matchPassword(AC: AbstractControl) {
    const p = AC.get('password').value;
    const confP = AC.get('confirmPassword').value;
    if (p !== confP) {
      AC.get('confirmPassword').setErrors({matchPassword: true});
    } else {
      return null;
    }
  }
}
