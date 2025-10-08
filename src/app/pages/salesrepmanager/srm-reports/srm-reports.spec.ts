import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrmReports } from './srm-reports';

describe('SrmReports', () => {
  let component: SrmReports;
  let fixture: ComponentFixture<SrmReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SrmReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrmReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
