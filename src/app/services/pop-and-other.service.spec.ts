import { TestBed } from '@angular/core/testing';

import { PopAndOtherService } from './pop-and-other.service';

describe('PopAndOtherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopAndOtherService = TestBed.get(PopAndOtherService);
    expect(service).toBeTruthy();
  });
});
