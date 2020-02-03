import { User } from '../user/user';

export class Posts {
  constructor (
    public user: User,
    public id: string,
    public post_text: string,
    public posted_date: string,
    public author: string,
    public title: string,
    public image_location: string,
    public home_text: string,
  ) {  }
}
