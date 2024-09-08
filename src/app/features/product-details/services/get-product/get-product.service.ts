import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../../../../services/http-client/http-client.service';
import { Product } from '../../../../models/product-model';
import { CacheProductsApiService } from '../../../../services/cache-products-api/cache-products-api.service';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  private http = inject(HttpClientService).httpClient;
  private cached = inject(CacheProductsApiService);

  getProductsById(id: string) {
    const route = `/products/${id}`;
    const productByIdCached = this.cached.get<Product>(route);

    if (productByIdCached) {
      return of(productByIdCached);
    } else {
      return this.http.get<Product>(route).pipe(
        tap((res) => {
          this.cached.set<Product>(route, res);
        }),
      );
    }
  }
}
