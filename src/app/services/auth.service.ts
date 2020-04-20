import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '@models/user';
import { environment } from '@environments/environment';

const API_BASE_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(email: string, password: string) {
    const body = {
      email,
      password
    };

    return this.http.post(`${API_BASE_URL}/users/login`, body)
      .pipe(
        tap(this.saveUser)
      );
  }

  public logout() {
    this.removeUser();
  }

  public isLoggedIn(): boolean {
    return !!this.getUserToken();
  }

  public getUserToken(): string {
    return localStorage.getItem('token');
  }

  public getUserId(): number {
    return Number(localStorage.getItem('user_id'));
  }

  public saveUser(user: User): void {
    localStorage.setItem('user_id', user.id.toString());
    localStorage.setItem('token', user.token);
  }

  private removeUser(): void {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
  }
}
