import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@models/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage = {
    isLoading: new BehaviorSubject(false),
    userProfile: new BehaviorSubject(null),
    isSidebarOpen: new BehaviorSubject(false),
  }

  public setItem<T extends keyof Storage>(
    itemName: T,
    value: Storage[T] extends BehaviorSubject<infer X> ? X : never
  ): void {
    this.storage[itemName].next(value as any);
  }

  public getItem<T extends keyof Storage>(itemName: T): Storage[T] {
    return this.storage[itemName];
  }
}
