import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { User } from '@models/user';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements Resolve<User> {

  constructor(
    private storage: StorageService
  ) { }

  resolve() {
    return this.storage.getItem('userProfile').pipe(
      filter((userProfile) => userProfile !== null),
      first()
    );
  } 
}
