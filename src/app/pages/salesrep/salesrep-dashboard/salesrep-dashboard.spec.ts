import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepDashboard } from './salesrep-dashboard';

describe('SalesrepDashboard', () => {
  let component: SalesrepDashboard;
  let fixture: ComponentFixture<SalesrepDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesrepDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesrepDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
