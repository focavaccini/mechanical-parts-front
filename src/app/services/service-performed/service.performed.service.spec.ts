import { TestBed } from '@angular/core/testing';

import { ServicePerformedService } from './service.performed.service';

describe('ServicePerformedService', () => {
  let service: ServicePerformedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePerformedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
