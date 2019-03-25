import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingWizardComponent } from './pricing-wizard.component';

describe('PricingWizardComponent', () => {
  let component: PricingWizardComponent;
  let fixture: ComponentFixture<PricingWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
