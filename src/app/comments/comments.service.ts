
import {throwError,  Observable ,  Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
// import 'rxjs/add/operator/toPromise';

import { Comments } from './comments';

@Injectable()
export class CommentsService {
    // Observable string sources
    private parentCommentSource = new Subject<Comments>();
    private parentChildSource = new Subject<Comments>();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // private CommentsUrl = 'http://localhost:5000/api'; //URL to web api
    private CommentsUrl = environment.API_URL + '/comments';
    // private options = new RequestOptions({ headers: this.headers });
    private posts = 'posts';

    constructor(private http: HttpClient) { }

    getComments() {
        return this.http.get<Comments[]>(this.CommentsUrl)
          .pipe(
            catchError(this.handleError)
          );
    }

    addComment(comment: Comments) {
        return this.http.post<Comments>(this.CommentsUrl, comment , this.httpOptions)
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
    getParentComment(): Observable<Comments> {
      return this.parentCommentSource.asObservable();
    }
    getChildComment(): Observable<Comments> {
      return this.parentChildSource.asObservable();
    }

    parentPush(comment: Comments) {
        this.parentCommentSource.next(comment);
        console.log(comment);
    }
    childPush(comment: Comments) {
        this.parentChildSource.next(comment);
        // console.log("pushed");
        // console.log(comment);
    }

}
