import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePersonalInfoComponent } from './quote-personal-info.component';

describe('QuotePersonalInfoComponent', () => {
  let component: QuotePersonalInfoComponent;
  let fixture: ComponentFixture<QuotePersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotePersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
