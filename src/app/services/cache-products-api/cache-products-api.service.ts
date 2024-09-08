import { Injectable } from '@angular/core';
import { CachedKeys } from '../../models/cache-keys.type';
import { from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheProductsApiService {
  private storageKey = CachedKeys.category;
  private map = new Map();

  constructor() {
    this.loadFromLocalStorage();
  }

  set<T>(route: string, response: T) {
    this.map.set(route, response);
    this.saveToLocalStorage();
  }

  get<T>(route: string) {
    return this.map.get(route) as T;
  }

  private saveToLocalStorage() {
    from(this.map.entries()).pipe(
      tap((res) => {
        localStorage.setItem(this.storageKey, JSON.stringify(res));
      }),
    );
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const entries = JSON.parse(data);
      this.map = new Map(entries);
    } else {
      this.saveToLocalStorage();
    }
  }
}
