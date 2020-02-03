import {throwError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';



import { Posts } from './posts';

@Injectable()
export class PostsService {

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    private headers = new Headers({ 'Content-Type': 'application/json' });
    // private PostsUrl = 'http://localhost:5000/api'; //URL to web api
    private PostsUrl = environment.API_URL + '/posts';
    private options = new RequestOptions({ headers: this.headers });
    private posts = 'posts';

    constructor(private http: HttpClient) { }

    getPosts() {
        return this.http.get<Posts[]>(this.PostsUrl)
          .pipe(
            catchError(this.handleError)
          );
    }

    getPost(id: string) {
        const url = `${this.PostsUrl}/${id}`;
        return this.http.get<Posts>(url)
          .pipe(
            catchError(this.handleError)
          );
    }

    delete(id: number): Observable<{}> {
        const url = `${this.PostsUrl}/${this.posts}/${id}`;
        return this.http.delete(url, this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
    }

    create(post: Posts) {
        return this.http.post<Posts>(this.PostsUrl, post, this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
    }

    update(post: Posts) {
        const url = `${this.PostsUrl}/${post.id}`;
        return this.http.put<Posts>(url, post, this.httpOptions)
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
