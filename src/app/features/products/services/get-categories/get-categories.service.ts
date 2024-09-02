import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../../../../services/http-client/http-client.service';
import { CacheProductsApiService } from '../../../../services/cache-products-api/cache-products-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetCategoriesService {
  private http = inject(HttpClientService).httpClient;
  cached = inject(CacheProductsApiService);

  getAllCategories() {
    return new Observable<string[]>((observer) => {
      const route = '/products/categories';
      const cachedCategories = this.cached.get<string[]>(route);
      if (cachedCategories) {
        observer.next(cachedCategories);
      } else {
        this.http.get<string[]>(route).subscribe((res) => {
          observer.next(res);
        });
      }
    });
  }
}
