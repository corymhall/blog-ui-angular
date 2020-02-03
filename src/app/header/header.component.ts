import { Component, OnInit } from '@angular/core';


import { FireBaseAuthComponent } from '../auth/firebase-auth.component';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    providers: [UserService, FirebaseAuthService]
    /*styleUrls: ['./header.component.css']*/
})

export class HeaderComponent implements OnInit {

    isCreator: boolean;
    isLoggedIn2: boolean;
    user: User[];

    constructor(private afService: FirebaseAuthService, private userService: UserService) { }



    getUserAccess(id: string) {
        this.userService.getUser(id).subscribe(user => {
            if (user['role'] === 'Creator') {
                this.isCreator = true;
            } else {
                this.isCreator = false;
            }
        });
    }

    ngOnInit() {
        this.afService.user.subscribe((auth) => {
            if (auth == null) {
                this.isLoggedIn2 = false;
            } else {
                this.isLoggedIn2 = true;
                this.getUserAccess(auth.uid);
            }
            // console.log(this.isLoggedIn2);
        });
    }

}
