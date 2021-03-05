import { TestBed } from '@angular/core/testing';

import { AdminDetailService } from './admin-detail.service';

describe('AdminDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminDetailService = TestBed.get(AdminDetailService);
    expect(service).toBeTruthy();
  });
});
