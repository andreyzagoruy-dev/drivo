import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { EMPTY } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { StorageService } from '@services/storage.service';
import { ApiService } from '@services/api.service';
import { User } from '@models/user';
import { Car } from '@app/models/car';

@Injectable({
  providedIn: 'root'
})
export class CarsResolver implements Resolve<Car[]> {
  constructor(
    private router: Router,
    private api: ApiService,
    private storage: StorageService
  ) { }

  resolve() {
    const userProfile: User = this.storage.getItem('userProfile').value;

    if (!userProfile) {
      this.router.navigate(['trips']);
      return EMPTY;
    }

    return this.api.getCars(userProfile.id).pipe(
      tap((carsFromServer) => {
        if (carsFromServer.length === 0) {
          this.router.navigate(['cars']);
        }
      }),
      first()
    );
  }
}
