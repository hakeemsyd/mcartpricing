import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsSidebarComponent } from './benefits-sidebar.component';

describe('BenefitsSidebarComponent', () => {
  let component: BenefitsSidebarComponent;
  let fixture: ComponentFixture<BenefitsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
