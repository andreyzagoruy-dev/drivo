import { Injectable } from '@angular/core';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _userProfile: User = null;

  constructor() { }

  public getItem(itemName: string) {
    this._checkStorageItem(itemName);

    return this[`_${itemName}`];
  }

  public setItem(itemName: string, value): void {
    this._checkStorageItem(itemName);

    this[`_${itemName}`] = value;
  }

  private _checkStorageItem(itemName: string): void {
    if (this[`_${itemName}`] === undefined) {
      throw `"${itemName}" missing from storage`;
    }
  }
}
