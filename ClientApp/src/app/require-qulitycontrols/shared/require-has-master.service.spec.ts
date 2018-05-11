import { TestBed, inject } from '@angular/core/testing';

import { RequireHasMasterService } from './require-has-master.service';

describe('RequireHasMasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireHasMasterService]
    });
  });

  it('should be created', inject([RequireHasMasterService], (service: RequireHasMasterService) => {
    expect(service).toBeTruthy();
  }));
});
