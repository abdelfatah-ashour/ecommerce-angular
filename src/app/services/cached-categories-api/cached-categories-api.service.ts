import { Injectable } from '@angular/core';
import { CachedKeys } from '../../models/cache-keys.type';

@Injectable({
  providedIn: 'root',
})
export class CachedCategoriesApiService {
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

  delete(route: string) {
    this.map.delete(route);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const data = Array.from(this.map.entries());
    localStorage.setItem(this.storageKey, JSON.stringify(data));
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
