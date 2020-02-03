import { Component } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { FirebaseAuthService } from './firebase-auth.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';


@Component({
    selector: 'app-fire-auth',
    templateUrl: './firebase-auth.component.html',
    providers: [UserService, FirebaseAuthService]
})

export class FireBaseAuthComponent {

    constructor(public afService: FirebaseAuthService, private router: Router, private userService: UserService) { }

    login() {
        this.afService.loginWithGoogle().then((data) => {
            // console.log('loginWithGoogle: ');
            // console.log(data);
            this.userService.loginUser(data.user.uid).subscribe(user => {
                // console.log('getUser: ');
                // console.log(user['present']);
                if (user['present'] === false) {
                  const newUser = new User(
                    data.user.uid,
                    data.user.displayName,
                    data.user.email,
                    data.user.photoURL,
                    data.user.providerId,
                    'Reader'
                  );
                    this.userService.createUser(newUser)
                        .subscribe(userData => {
                            // console.log(user);
                        });
                }

            });

            this.router.navigate(['']);
        });
    }

    logout() {
        this.afService.logout().then(() => {
            this.router.navigate(['']);
        });
    }


}



