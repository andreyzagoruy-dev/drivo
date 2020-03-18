import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NewUser } from '@models/user';
import { catchError } from 'rxjs/operators';

const API_URL: string = '//localhost:3000/api'

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private http: HttpClient
  ) { }

  public addUser(user: NewUser): Observable<NewUser> {
    console.log('work')
    return this.http.post<NewUser>(API_URL, user)
    .pipe(
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse){
    return Observable.throw(error.message || "server error.");
  }
  

}
