import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrmTarget } from './srm-target';

describe('SrmTarget', () => {
  let component: SrmTarget;
  let fixture: ComponentFixture<SrmTarget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SrmTarget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrmTarget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
