import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../../../../services/http-client/http-client.service';
import { Product } from '../../../../models/product-model';
import { CacheProductsApiService } from '../../../../services/cache-products-api/cache-products-api.service';
import { Observable } from 'rxjs';

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
    return new Observable<Product[]>((observer) => {
      const route = '/products';
      const cachedProducts = this.cached.get<Product[]>(route);

      if (cachedProducts) {
        observer.next(cachedProducts);
      } else {
        this.http.get<Product[]>('/products').subscribe((res) => {
          this.cached.set<Product[]>(route, res);
          observer.next(res);
        });
      }
    });
  }

  getProductsByCategory(categoryId: string) {
    return new Observable<Product[]>((observer) => {
      const route = '/products/category/' + categoryId;
      const cachedProducts = this.cached.get<Product[]>(route);

      if (cachedProducts) {
        observer.next(cachedProducts);
      } else {
        this.http.get<Product[]>(route).subscribe((res) => {
          this.cached.set<Product[]>(route, res);
          observer.next(res);
        });
      }
    });
  }
}
