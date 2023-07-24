import { TestBed } from '@angular/core/testing';

import { CurrencyapiService } from './currencyapi.service';

describe('CurrencyapiService', () => {
  let service: CurrencyapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
