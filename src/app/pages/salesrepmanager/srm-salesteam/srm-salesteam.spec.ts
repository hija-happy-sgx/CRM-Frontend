import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrmSalesteam } from './srm-salesteam';

describe('SrmSalesteam', () => {
  let component: SrmSalesteam;
  let fixture: ComponentFixture<SrmSalesteam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SrmSalesteam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrmSalesteam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
