import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { Observable, from } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';




@Injectable()
export class FirebaseAuthService implements CanActivate {

    public isLoggedIn: boolean;
    public user: Observable<firebase.User>;
    public authState: any;

    constructor(public afAuth: AngularFireAuth, private router: Router) {
        this.user = this.afAuth.authState;
        this.user.subscribe(user => {
            this.authState = user;
            // console.log(this.authState);
        });
        this.afAuth.authState.subscribe((auth) => {
            // console.log('authstate: ');
            // console.log(auth);
        });
        this.afAuth.authState.subscribe((auth) => {
            if (auth == null) {
                this.isLoggedIn = false;
            } else {
                this.isLoggedIn = true;
            }
            // console.log(this.isLoggedIn);
        });
    }

     canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
        return this.user.pipe(
              take(1),
              map(user => !!user),
              tap(authenticated => {
                if (!authenticated) {
                  this.router.navigate(['']);
                }
              })
        );
      }

    loginWithGoogle() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        return this.afAuth.auth.signOut();
    }


}
