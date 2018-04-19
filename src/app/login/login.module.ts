import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { LoginComponent } from './login.component';
import { DialogPopupModule } from './dialog-popup/dialog-popup.module';
import { DialogPopupComponent } from './dialog-popup/dialog-popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    // DialogPopupModule
  ],
  declarations: [LoginComponent, DialogPopupComponent],
  exports: [LoginComponent],
  entryComponents: [DialogPopupComponent]
})
export class LoginModule { }
