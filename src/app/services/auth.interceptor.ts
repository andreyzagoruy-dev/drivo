import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '@services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('Interceptor:', request);

    const userToken = this.auth.getUserToken();
    console.log('Token present:', userToken);

    if (userToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getUserToken()}`
        }
      })
    }

    return next.handle(request);
  }
}
