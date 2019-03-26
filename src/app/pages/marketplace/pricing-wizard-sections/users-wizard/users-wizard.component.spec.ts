import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWizardComponent } from './users-wizard.component';

describe('UsersWizardComponent', () => {
  let component: UsersWizardComponent;
  let fixture: ComponentFixture<UsersWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
