import { TestBed, inject } from '@angular/core/testing';

import { WorkGroupQcService } from './workgroup-qc.service';

describe('WorkgroupQcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkGroupQcService]
    });
  });

  it('should be created', inject([WorkGroupQcService], (service: WorkGroupQcService) => {
    expect(service).toBeTruthy();
  }));
});
