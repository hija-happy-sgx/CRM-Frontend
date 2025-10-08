import { TestBed } from '@angular/core/testing';
import { SrmService } from './srm-service';



describe('SrmService', () => {
  let service: SrmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
