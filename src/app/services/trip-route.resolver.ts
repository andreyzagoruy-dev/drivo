import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { EMPTY } from 'rxjs';
import { first } from 'rxjs/operators';
import { StorageService } from '@services/storage.service';
import { ApiService } from '@services/api.service';
import { LatLng } from '@models/map';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class TripRouteResolver implements Resolve<LatLng[]> {
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

    const {
      homeLatitude,
      homeLongitude,
      workLatitude,
      workLongitude
    } = userProfile;

    return this.api.getRoute([homeLatitude, homeLongitude], [workLatitude, workLongitude]).pipe(
      first()
    );
  }
}
