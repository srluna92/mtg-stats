import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LoginService {

  user = new BehaviorSubject<firebase.User>(null);

  login(u: string, p: string): Promise<void | Observable<any>> {
    return firebase.auth().signInWithEmailAndPassword(u, p).then(s => {
      if (s) {
        this.router.navigateByUrl('overview');
      }
    }).catch(e => {
      return of(e);
    });
  }
  signUp(u: string, p: string): Promise<void | Observable<any>> {
    return firebase.auth().createUserWithEmailAndPassword(u, p).then(s => {
        if (s) {
          this.router.navigateByUrl('overview');
        }
    }).catch(e => {
      return of(e);
    });
  }
  logout() {
    firebase.auth().signOut().then(r => this.router.navigateByUrl('login'));
  }
  loginPopup(s: string): Promise<void | Observable<any>> {
    let provider = null;
    if (s === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (s === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    }
    return firebase.auth().signInWithPopup(provider).then(r => {
      if (r) {
        this.router.navigateByUrl('overview');
      }
    }).catch(e => {
      return of(e);
    });
  }
  authUser(): void {
    firebase.auth().onAuthStateChanged(u => {
      this.user.next(u);
    });
  }
  constructor(
    private fire: AngularFirestore,
    private router: Router
  ) { }

}
