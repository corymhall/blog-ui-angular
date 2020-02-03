import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Comments } from './comments';
import { CommentsService } from './comments.service';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { Posts } from '../posts/posts';
import { User } from '../user/user';
import { ToasterService } from '../toaster/toaster.service';

@Component({
    selector: 'app-add-comment',
    templateUrl: './add-comment.component.html',
    providers: [FirebaseAuthService]
})

export class AddCommentComponent {

    commentForm: FormGroup;
    @Input() post: Posts[];
    errorMessage: string;
    commentId: string;

    constructor(
      private fb: FormBuilder, private router: Router, private afService: FirebaseAuthService, private commentsService: CommentsService,
        private route: ActivatedRoute, private toasterService: ToasterService) {

        this.commentId = this.route.snapshot.params['id'];
        // console.log(this.commentId);

        this.createForm();
    }

    createForm() {
        this.commentForm = this.fb.group({
            comment_text: ['', Validators.required],
        });
    }

    addComment(comment: Comments) {
        if (!comment.user.id || !comment.post_id || !comment.comment_text) { console.log('no data'); return; }
        this.commentsService.addComment(comment)
            .subscribe(
            data => {
                this.commentsService.childPush(data);
                this.toasterService.subj_notification.next('Comment Added!');
            },
            error => this.errorMessage = <any>error);
        this.commentForm.reset();
    }

    onSubmit() {

      const user = new User(
        this.afService.authState.uid,
        '',
        '',
        '',
        '',
        '',
      );
      const newComment = new Comments(
        user,
        '',
        this.post['id'],
        this.commentForm.get('comment_text').value,
        '',
      );

        this.addComment(newComment);
    }

}
