import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveWizardComponent } from './objective-wizard.component';

describe('ObjectiveWizardComponent', () => {
  let component: ObjectiveWizardComponent;
  let fixture: ComponentFixture<ObjectiveWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
