
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Observable, Subscription  } from 'rxjs';
import { Posts } from './posts';
import { PostsService } from './posts.service';
import { Comments } from '../comments/comments';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { CommentsService } from '../comments/comments.service';


@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    providers: [PostsService, FirebaseAuthService, CommentsService]
})

export class PostDetailComponent implements OnInit {

    isLoggedIn: boolean;
    post: Posts;
    post$: Observable<Posts>;
    comments: Comments[] = [];
    errorMessage: string;
    subscription: Subscription;

    constructor(
        private postsService: PostsService, public afService: FirebaseAuthService,
        private route: ActivatedRoute, private commentsService: CommentsService ) {

        this.post$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
              this.postsService.getPost(params.get('id'))
            )
        );

        this.subscription = this.commentsService.getChildComment().subscribe(
          comment => {
            this.comments.push(comment);
          });
    }

    ngOnInit() {
      console.log(this.route);

      console.log(this.route.snapshot.paramMap.get('id'));

      // this.post = this.postsService.getPost(this.route.snapshot.paramMap.get('id'))
        this.post$ = this.route.paramMap.pipe(
          switchMap(params => {
            console.log('here');
              console.log(params.get('id'));
              return this.postsService.getPost(params.get('id'));
          }
            )
        );
        this.post$.subscribe(post => this.post = post);

        // this.comments = this.post$['comments'];
    }

    /*ngOnInit() {

      this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.postsService.getPost(params.get('id'))
            .subscribe(
            post => {
                this.post = post;
                this.comments = post['comments'];
                // console.log("initialized");
                // console.log(post);
            }))
      );
    }*/
}
