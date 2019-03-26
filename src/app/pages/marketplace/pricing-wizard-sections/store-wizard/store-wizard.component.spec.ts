import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreWizardComponent } from './store-wizard.component';

describe('StoreWizardComponent', () => {
  let component: StoreWizardComponent;
  let fixture: ComponentFixture<StoreWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
