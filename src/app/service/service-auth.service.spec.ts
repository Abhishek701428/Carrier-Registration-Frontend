import { TestBed } from '@angular/core/testing';

import { ServiceAuthService } from './service-auth.service';

describe('ServiceAuthService', () => {
  let service: ServiceAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
