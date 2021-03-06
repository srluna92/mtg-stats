import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { OverviewModule } from './overview/overview.module';
import { FireService, LoginService, AuthService, FormService, LoginAuthService, CardService } from './services/index.service';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { SettingsModule } from './settings/settings.module';
import { FeedbackModule } from './feedback/feedback.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule,
    OverviewModule,
    LoginModule,
    HomeModule,
    SettingsModule,
    FeedbackModule
  ],
  providers: [AuthService, FireService, FormService, LoginService, LoginAuthService, CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
