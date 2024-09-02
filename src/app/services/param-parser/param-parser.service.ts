import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParamParserService {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  getQueryParams(): Observable<Record<string, string>> {
    return this.activatedRoute.queryParamMap.pipe(
      map((queryParamMap) => {
        const queryParams: Record<string, string> = {};
        queryParamMap.keys.forEach(
          (key) => (queryParams[key] = queryParamMap.get(key) || ''),
        );
        return queryParams;
      }),
    );
  }
}
