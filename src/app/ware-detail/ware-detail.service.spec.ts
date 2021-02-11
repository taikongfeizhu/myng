import { TestBed } from '@angular/core/testing';

import { WareDetailService } from './ware-detail.service';

describe('WareDetailService', () => {
  let service: WareDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WareDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
