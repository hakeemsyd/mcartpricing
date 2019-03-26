import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmvWizardComponent } from './gmv-wizard.component';

describe('GmvWizardComponent', () => {
  let component: GmvWizardComponent;
  let fixture: ComponentFixture<GmvWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmvWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmvWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
