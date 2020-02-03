import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Reply } from './reply';
import { User } from '../user/user';
import { ReplyService } from './reply.service';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { Comments } from '../comments/comments';
import { ToasterService } from '../toaster/toaster.service';

@Component({
    selector: 'app-add-reply',
    templateUrl: './add-reply.component.html',
    providers: [FirebaseAuthService]
})

export class AddReplyComponent {

    replyForm: FormGroup;
    @Input() comment: Comments;
    errorMessage: string;
    commentId: string;

    constructor(private fb: FormBuilder, private router: Router, private afService: FirebaseAuthService, private replyService: ReplyService,
        private route: ActivatedRoute, private toasterService: ToasterService) {

        // this.commentId = this.route.snapshot.params['id'];
        // console.log(this.commentId);

        this.createForm();
    }

    createForm() {
        this.replyForm = this.fb.group({
            reply_text: ['', Validators.required],
        });
    }

    addReply(reply: Reply) {
        if (!reply.user.id ||  !reply.reply_text) { console.log('no data'); return; }
        this.replyService.addReply(reply)
            .subscribe(
            data => {
                this.replyService.childPush(data);
                this.toasterService.subj_notification.next('Reply Added!');
            },
            error => this.errorMessage = <any>error);
        this.replyForm.reset();

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
      const newReply = new Reply(
        user,
        this.comment['post_id'] + '#' + this.comment['id'],
        this.replyForm.get('reply_text').value,
        '',
      );
        this.addReply(newReply);
    }

}
