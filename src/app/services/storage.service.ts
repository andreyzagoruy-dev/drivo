import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _userProfile = new BehaviorSubject<User>(null);

  public setItem(itemName: string, value) {
    this._checkStorageItem(itemName);

    this[`_${itemName}`].next(value);
  }

  public getItem(itemName: string) {
    this._checkStorageItem(itemName);

    return this[`_${itemName}`];
  }

  public getItemValue(itemName: string) {
    this._checkStorageItem(itemName);

    return this[`_${itemName}`].value
  }

  private _checkStorageItem(itemName: string): void {
    if (this[`_${itemName}`] === undefined) {
      throw `"${itemName}" missing from storage`;
    }
  }
}
