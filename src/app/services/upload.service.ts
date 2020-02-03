import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';


//import 'rxjs/add/operator/toPromise';


@Injectable()
export class UploadService {

    private headers = new Headers();
    private PostsUrl = environment.API_URL + '/api/posts/fileupload';
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: HttpClient) { }

    fileUpload(files: File[]): Observable<any> {
        return Observable.create((observer:any) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append("file", files[i]);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            //console.log(formData);
            xhr.open('POST', this.PostsUrl, true);
            xhr.send(formData);
        });
    }
}
