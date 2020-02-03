
import {throwError,  Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { HttpResponse, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';



import {Octopus} from './octopus';


@Injectable()
export class EmailOctopusService {


      private headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
    private OctopusUrl = 'REPLACE_ME';

    constructor(private http: HttpClient, private jsonp: Jsonp) { }

    subscribe(api_key: string, email_address: string, first_name: string, last_name: string) {
        const url = `${this.OctopusUrl}`;
        const body = new URLSearchParams();
        body.append('api_key', api_key);
        body.append('email_address', email_address);
        body.append('first_name', first_name);
        body.append('last_name', last_name);
        return this.http.post<HttpResponse<Octopus>>(url, body.toString(), {headers: this.headers, observe: 'response'})
          .pipe(
            catchError(this.handleError)
          );
    }

/*    private extractData(res: Response) {
        // let body = res.json() as Octopus[];
        console.log(res.status)
        // console.log(body)
        // console.log(body);
        // console.log(body['comments']);
        return res.status;
    }*/

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
