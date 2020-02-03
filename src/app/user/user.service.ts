
import {throwError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { Headers, Response, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';




import { User } from './user';

@Injectable()
export class UserService {

    public isCreator: boolean;

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // private UserUrl = 'http://localhost:5000/api'; //URL to web api
    // private UserUrl = 'http://sample-env-1.mcddtt3nis.us-east-1.elasticbeanstalk.com/api';
    private UserUrl = environment.API_URL + '/user';
    private user = 'user';
    private login = 'login';

    constructor(private http: HttpClient) { }

    getUser(id: string) {
        const url = `${this.UserUrl}/${id}`;
        return this.http.get<User[]>(url)
          .pipe(
            catchError(this.handleError)
          );
    }

    createUser(user: User) {
        return this.http.post<User>(this.UserUrl, user, this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
    }

    loginUser(id: string) {
        const url = `${this.UserUrl}/${id}`;
        return this.http.get<User>(url)
          .pipe(
            catchError(this.handleError)
          );
    }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
