import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McartPlanTierInfoComponent } from './mcart-plan-tier-info.component';

describe('McartPlanTierInfoComponent', () => {
  let component: McartPlanTierInfoComponent;
  let fixture: ComponentFixture<McartPlanTierInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McartPlanTierInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McartPlanTierInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
