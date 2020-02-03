import { Component, Input, OnInit } from '@angular/core';

import { Reply } from './reply';
import { ReplyResponse } from './reply';
import { ReplyService } from './reply.service';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html'
})

export class ReplyComponent  {

    @Input() reply: ReplyResponse;

    constructor(private replyService: ReplyService) {

    }
}
