import { TestBed } from '@angular/core/testing';

import { FunctionsService } from './functions.service';

describe('FunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunctionsService = TestBed.get(FunctionsService);
    expect(service).toBeTruthy();
  });
});
