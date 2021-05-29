import { TestBed } from '@angular/core/testing';

import { ScullyService } from './scully.service';

describe('ScullyService', () => {
  let service: ScullyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScullyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
