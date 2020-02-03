import { Component, Input, OnInit } from '@angular/core';

import { Comments } from './comments';
import { CommentResponse } from './comments';
import { CommentsService } from './comments.service';
import { Reply } from '../reply/reply';
import { ReplyService } from '../reply/reply.service';
import { Observable, Subscription  } from 'rxjs';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    providers: [ReplyService]
})

export class CommentsComponent implements OnInit {

    @Input() comment: CommentResponse;
    reply: Reply[];
    showComment = false;
    subscription: Subscription;

    constructor(private commentsService: CommentsService, private replyService: ReplyService) {
      this.subscription = this.replyService.getChildReply().subscribe(
        reply => {
          this.reply.push(reply);
        });
    }

    ngOnInit() {
        console.log(this.comment);
        this.reply = this.comment['reply'];
        console.log(this.reply);
    }

    replyToComment(comment: Comments) {
        this.showComment = true;
    }

}
