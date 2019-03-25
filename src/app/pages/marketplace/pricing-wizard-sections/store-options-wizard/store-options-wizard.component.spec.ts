import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOptionsWizardComponent } from './store-options-wizard.component';

describe('StoreOptionsWizardComponent', () => {
  let component: StoreOptionsWizardComponent;
  let fixture: ComponentFixture<StoreOptionsWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreOptionsWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOptionsWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
