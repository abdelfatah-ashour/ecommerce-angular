import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../../../../services/http-client/http-client.service';
import { Product } from '../../../../models/product-model';
import { Observable } from 'rxjs';
import { CacheProductsApiService } from '../../../../services/cache-products-api/cache-products-api.service';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  private http = inject(HttpClientService).httpClient;
  private cached = inject(CacheProductsApiService);

  getProductsById(id: string) {
    return new Observable<Product>((observer) => {
      const route = `/products/${id}`;
      const productByIdCached = this.cached.get<Product>(route);

      if (productByIdCached) {
        observer.next(productByIdCached);
      } else {
        this.http.get<Product>(route).subscribe((res) => {
          this.cached.set<Product[]>(route, [res]);
          observer.next(res);
        });
      }
    });
  }
}
