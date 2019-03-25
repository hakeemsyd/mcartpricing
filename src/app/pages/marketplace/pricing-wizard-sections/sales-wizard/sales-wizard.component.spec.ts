import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesWizardComponent } from './sales-wizard.component';

describe('SalesWizardComponent', () => {
  let component: SalesWizardComponent;
  let fixture: ComponentFixture<SalesWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
