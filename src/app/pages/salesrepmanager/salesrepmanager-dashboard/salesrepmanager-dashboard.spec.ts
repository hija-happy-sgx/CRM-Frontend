import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepmanagerDashboard } from './salesrepmanager-dashboard';

describe('SalesrepmanagerDashboard', () => {
  let component: SalesrepmanagerDashboard;
  let fixture: ComponentFixture<SalesrepmanagerDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesrepmanagerDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesrepmanagerDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
