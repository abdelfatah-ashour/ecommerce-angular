import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../../../../services/http-client/http-client.service';
import { Product } from '../../../../models/product-model';
import { CacheProductsApiService } from '../../../../services/cache-products-api/cache-products-api.service';
import { map, Observable, of, tap } from 'rxjs';

const MIN_NUM = 100;
const MAX_NUM = 10000;

@Injectable({
  providedIn: 'root',
})
export class GetProductsService {
  private http = inject(HttpClientService).httpClient;
  cached = inject(CacheProductsApiService);
  constructor() {
    this.cached.loadFromLocalStorage();
  }

  getAllProducts() {
    const route = '/products';
    const cachedProducts = this.cached.get<Product[]>(route);

    if (cachedProducts) {
      return of(cachedProducts);
    } else {
      return this.http.get<Product[]>(route).pipe(
        tap((res) => this.cached.set<Product[]>(route, res)), // Cache the result
      );
    }
  }

  getProductsByCategory(categoryId: string) {
    const route = `/products/category/${categoryId}`;
    const cachedProducts = this.cached.get<Product[]>(route);

    if (cachedProducts) {
      return of(cachedProducts);
    } else {
      return this.http.get<Product[]>(route).pipe(
        tap((res) => this.cached.set<Product[]>(route, res)), // Cache the result
      );
    }
  }

  mapProduct(product: Product): Product {
    product.price =
      Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM;
    product.rating.count =
      Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM;
    product.rating.rate = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    return product;
  }

  syncAllProducts(route: string) {
    return this.getAllProducts().pipe(
      map((res) => res.map((product) => this.mapProduct(product))), // Transform each product
      tap((transformedProducts) =>
        this.cached.set<Product[]>(route, transformedProducts),
      ),
    );
  }

  syncProductsById(route: string, id: number): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) =>
        products.map((product) => {
          if (product.id === id) {
            this.mapProduct(product);
          }
          return product;
        }),
      ),
      tap((transformedProducts) => {
        this.cached.set<Product[]>(route, transformedProducts);
      }),
    );
  }
}
