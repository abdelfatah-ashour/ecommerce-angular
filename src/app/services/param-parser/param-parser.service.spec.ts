import { TestBed } from '@angular/core/testing';

import { ParamParserService } from './param-parser.service';

describe('ParamParserService', () => {
  let service: ParamParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
