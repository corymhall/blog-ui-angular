export class Octopus {
    public api_key: string;
    public email_address: string;
    public first_name: string;
    public last_name: string;
    public subscribed: boolean;

    constuctor(data:any) {
        Object.assign(this, data);
    }
}