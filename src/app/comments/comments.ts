import { User } from '../user/user';
import { Reply } from '../reply/reply';

export class Comments {
  constructor (
    public user: User,
    public id: string,
    public post_id: string,
    public comment_text: string,
    public comment_date: string,
  ) {  }
}

export class CommentResponse {
  constructor (
    public comment: Comments,
    public replies?: Reply[],
  ) {  }
}
