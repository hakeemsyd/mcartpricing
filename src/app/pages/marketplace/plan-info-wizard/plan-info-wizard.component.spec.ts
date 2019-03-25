import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanInfoWizardComponent } from './plan-info-wizard.component';

describe('PlanInfoWizardComponent', () => {
  let component: PlanInfoWizardComponent;
  let fixture: ComponentFixture<PlanInfoWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanInfoWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanInfoWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
