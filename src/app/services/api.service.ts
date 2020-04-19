import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@models/user';

type Request = 'GET' | 'POST' | 'PUT' | 'DETELE';

const API_BASE_URL = '//localhost:3000/api/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  public getUserById(id: number): Observable<User> {
    return this._request('GET', `users/${id}`);
  }

  private _request(requestType: Request, url: string, payload: object = {}) {
    return this.http[requestType.toLowerCase()](`${API_BASE_URL}${url}`, payload);
  }

  public addUser(email: string, password: string) {
    const body = {
      email,
      password
    }

    return this.http.post(`${API_BASE_URL}users/`, body)
    .pipe(
      catchError(this.handleError)
    )
  }

  public updateProfile(body: User, id: number) {
    console.log('update profile:', body, id)
    return this.http.put(`${API_BASE_URL}users/${id}`, body)
    .pipe(
      catchError(this.handleError)
    )
  }

  public handleError(error: HttpErrorResponse){
    return Observable.throw(error.message || "server error.");
  }
}
