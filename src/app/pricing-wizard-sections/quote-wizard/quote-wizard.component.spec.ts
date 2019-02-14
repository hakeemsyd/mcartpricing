import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteWizardComponent } from './quote-wizard.component';

describe('QuoteWizardComponent', () => {
  let component: QuoteWizardComponent;
  let fixture: ComponentFixture<QuoteWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
