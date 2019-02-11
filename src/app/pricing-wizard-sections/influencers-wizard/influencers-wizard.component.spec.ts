import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencersWizardComponent } from './influencers-wizard.component';

describe('InfluencersWizardComponent', () => {
  let component: InfluencersWizardComponent;
  let fixture: ComponentFixture<InfluencersWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencersWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencersWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
