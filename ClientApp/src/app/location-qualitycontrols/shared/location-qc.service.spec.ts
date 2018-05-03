import { TestBed, inject } from '@angular/core/testing';

import { LocationQcService } from './location-qc.service';

describe('LocationQcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationQcService]
    });
  });

  it('should be created', inject([LocationQcService], (service: LocationQcService) => {
    expect(service).toBeTruthy();
  }));
});
