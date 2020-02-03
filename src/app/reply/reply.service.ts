
import {throwError,  Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Reply } from './reply';

@Injectable()
export class ReplyService {

    // Observable string sources
    private parentReplySource = new Subject<Reply>();
    private parentChildSource = new Subject<Reply>();

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // private ReplyUrl = 'http://localhost:5000/api'; //URL to web api
    // private ReplyUrl = 'http://sample-env-1.mcddtt3nis.us-east-1.elasticbeanstalk.com/api';
    private ReplyUrl = environment.API_URL + '/reply';

    constructor(private http: HttpClient) { }

    getReply() {
        return this.http.get<Reply[]>(this.ReplyUrl)
          .pipe(
            catchError(this.handleError)
          );
    }

    addReply(reply: Reply) {
        return this.http.post<Reply>(this.ReplyUrl, reply, this.httpOptions)
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


    // Observable string streams
    getParentReply(): Observable<Reply> {
      return this.parentReplySource.asObservable();
    }
    getChildReply(): Observable<Reply> {
      return this.parentChildSource.asObservable();
    }
    // Service message commands
    parentPush(reply: Reply) {
        this.parentReplySource.next(reply);
    }
    childPush(reply: Reply) {
        this.parentChildSource.next(reply);
    }
}
