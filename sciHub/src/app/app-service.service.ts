import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ExternalArticle } from './interfaces/ExternalArticle'
import { environment } from 'src/environments/environment';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

constructor(private http: HttpClient) { }


  api = environment.url

  getArticles() {
    return this.http
    .get(`${this.api}/articles`)
    .pipe(catchError(this.handleError));
  }

  getAbstract(id: string){
    console.log("appservice", id)
    return this.http
    .get(`${this.api}/abstract/${id}`)
    .pipe(catchError(this.handleError))
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return EMPTY;
  }
}
