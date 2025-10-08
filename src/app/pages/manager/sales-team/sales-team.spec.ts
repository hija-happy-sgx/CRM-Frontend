import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTeam } from './sales-team';

describe('SalesTeam', () => {
  let component: SalesTeam;
  let fixture: ComponentFixture<SalesTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesTeam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTeam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
