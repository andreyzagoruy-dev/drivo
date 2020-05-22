import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { StorageService } from '@services/storage.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.storage.setItem('isLoading', true);

    return next.handle(request)
      .pipe(
        finalize(() => { this.storage.setItem('isLoading', false); })
      );
  }
}
