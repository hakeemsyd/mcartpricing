import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesWizardComponent } from './categories-wizard.component';

describe('CategoriesWizardComponent', () => {
  let component: CategoriesWizardComponent;
  let fixture: ComponentFixture<CategoriesWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
