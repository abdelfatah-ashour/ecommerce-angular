import { TestBed } from '@angular/core/testing';

import { CacheProductsApiService } from './cache-products-api.service';

describe('CacheApiService', () => {
  let service: CacheProductsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheProductsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
