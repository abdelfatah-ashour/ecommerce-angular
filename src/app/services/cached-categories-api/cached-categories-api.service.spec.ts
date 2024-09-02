import { TestBed } from '@angular/core/testing';

import { CachedCategoriesApiService } from './cached-categories-api.service';

describe('CacheApiService', () => {
  let service: CachedCategoriesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachedCategoriesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
