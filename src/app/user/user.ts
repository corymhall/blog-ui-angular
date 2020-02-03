export class User {
  constructor(
    public id: string,
    public display_name: string,
    public photo_url: string,
    public email?: string,
    public provider_id?: string,
    public role?: string,
  ) {  }
}
