import { TestBed, inject } from '@angular/core/testing';

import { MasterListService } from './master-list.service';

describe('MasterListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterListService]
    });
  });

  it('should be created', inject([MasterListService], (service: MasterListService) => {
    expect(service).toBeTruthy();
  }));
});
