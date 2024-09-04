import { Injectable } from '@angular/core';
import { CachedKeys } from '../../models/cache-keys.type';
import { Product } from '../../models/product-model';
import { from, map, Observable, tap } from 'rxjs';

const MIN_NUM = 100;
const MAX_NUM = 10000;

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

  /**
   * The workaround to update the data must first be applied on the backend, and then we can fetch it later with a sync action.
   * @param route
   * @return Observable<Product[]>
   */
  updateAllByRoute(route: string): Observable<Product[]> {
    this.map.forEach((value: Product[], key) => {
      this.map.set(
        key,
        value.filter((product) => {
          product.price =
            Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM;
          product.rating.count =
            Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM;
          return product;
        }),
      );
    });

    return new Observable((observer) => {
      this.saveToLocalStorage();
      observer.next(this.map.get(route));
    });
  }

  /**
   * The workaround to update the data must first be applied on the backend, and then we can fetch it later with a sync action.
   * @param route
   * @param id
   * @return Observable<Product[]>
   */
  updateById(route: string, id: number): Observable<Product[]> {
    return from(this.map).pipe(
      tap(([key, value]: [string, Product[]]) => [
        key,
        key === route ? value : [],
      ]),
      map(([key, value]: [string, Product[]]) => [
        key,
        value.filter((product) => {
          if (product.id === id) {
            product.price =
              Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM;
            product.rating.count =
              Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM;
            product.rating.rate = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
          }
          return product;
        }),
      ]),
      tap(([key, updatedValue]) => this.map.set(key, updatedValue)),
      tap(() => this.saveToLocalStorage()),
      map(() => this.map.get(route)),
    );
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
