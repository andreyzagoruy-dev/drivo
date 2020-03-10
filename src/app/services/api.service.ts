import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { User } from '@models/user';

type Request = 'GET' | 'POST' | 'PUT' | 'DETELE';

const API_BASE_URL = 'https://reqres.in/api/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<User> {
    return this._request('POST', 'login', {email, password});
  }

  public getUserById(id: number): Observable<User> {
    return this._request('GET', `users/${id}`);
  }

  private _request(requestType: Request, url: string, payload: object = {}) {
    return this.http[requestType.toLowerCase()](`${API_BASE_URL}${url}`, payload);
  }
}
