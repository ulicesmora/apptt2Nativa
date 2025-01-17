import { TestBed } from '@angular/core/testing';

import { IllnesService } from './illnes.service';

describe('IllnesService', () => {
  let service: IllnesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IllnesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
