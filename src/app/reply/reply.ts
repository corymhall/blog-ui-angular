import { User } from '../user/user';

export class Reply {
  constructor(
    public user: User,
    public id: string,
    public reply_text: string,
    public reply_date: string,
  ) {  }

}

export class ReplyResponse {
  constructor(
    public reply: Reply,
  ) {  }
}
