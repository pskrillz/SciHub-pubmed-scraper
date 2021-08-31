import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ExternalArticle } from './interfaces/ExternalArticle'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }


  api = environment.url


  getArticles(){
    return this.http
      .get(`${this.api}/articles`)
      // .pipe(catchError(this.handleError));
  }


}
