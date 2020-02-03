import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { Posts } from './posts';
import { PostsService } from './posts.service';
import { TinyComponent } from '../tiny/tiny.component';
import { UserService } from '../user/user.service';
import { FirebaseAuthService } from '../auth/firebase-auth.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    providers: [PostsService, UserService]
})

export class PostComponent implements OnInit {

    errorMessage: string;
    posts: Posts[] = [];
    isLoaded = false;
    mode = 'Observable';
    totalPages: number;
    totalElements: number;
    last = true;
    first = true;
    size = 2;
    numberOfElements: number;
    isCreator: boolean;


    constructor(
        private postsService: PostsService,
        private router: Router, private userService: UserService, private afService: FirebaseAuthService) { }


    getUserAccess(id: string) {
        this.userService.getUser(id).subscribe(user => {
            if (user['role'] === 'Creator') {
                this.isCreator = true;
            } else {
                this.isCreator = false;
            }
        });
    }

    getPosts(): void {
        this.postsService.getPosts()
            .subscribe(
            posts => {
                console.log(posts);
                this.posts = posts;
                this.isLoaded = true;
            },
                error => this.errorMessage = <any>error);
    }


    ngOnInit(): void {
        this.getPosts();
        this.afService.user.subscribe((auth) => {
            if (auth == null) {
            } else {
                this.getUserAccess(auth.uid);
            }
            // console.log(this.isLoggedIn2);
        });

    }

    gotoDetail(post: Posts) {
        this.router.navigate(['/detail', post.id]);
    }

    editPost(post: Posts) {
        this.router.navigate(['/edit', post.id]);
    }

}
