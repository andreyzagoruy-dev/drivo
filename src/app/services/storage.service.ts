import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@models/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage = {
    userProfile: new BehaviorSubject(null),
  }

  public setItem<T extends keyof Storage>(itemName: T, value: Storage[T] extends BehaviorSubject<infer X> ? X : never): void {
    this._storage[itemName].next(value as any);
  }

  public getItem<T extends keyof Storage>(itemName: T): Storage[T] {
    return this._storage[itemName];
  }
}
