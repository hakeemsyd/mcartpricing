import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { PricingWizardComponent } from './pricing-wizard/pricing-wizard.component';
import { BusinessWizardComponent } from './pricing-wizard-sections/business-wizard/business-wizard.component';
import { ObjectiveWizardComponent } from './pricing-wizard-sections/objective-wizard/objective-wizard.component';
import { SalesWizardComponent } from './pricing-wizard-sections/sales-wizard/sales-wizard.component';
import { GmvWizardComponent } from './pricing-wizard-sections/gmv-wizard/gmv-wizard.component';
import { StoreWizardComponent } from './pricing-wizard-sections/store-wizard/store-wizard.component';
import { CategoriesWizardComponent } from './pricing-wizard-sections/categories-wizard/categories-wizard.component';
import { InfluencersWizardComponent } from './pricing-wizard-sections/influencers-wizard/influencers-wizard.component';
import { UsersWizardComponent } from './pricing-wizard-sections/users-wizard/users-wizard.component';
import { QuoteWizardComponent } from './pricing-wizard-sections/quote-wizard/quote-wizard.component';
import { AddStoreModalComponent } from './pricing-wizard-sections/store-wizard/add-store-modal/add-store-modal.component';
import { QuotePersonalInfoComponent } from './pricing-wizard-sections//quote-personal-info/quote-personal-info.component';


@NgModule({
  declarations: [
    AppComponent,
    PricingWizardComponent,
    BusinessWizardComponent,
    ObjectiveWizardComponent,
    SalesWizardComponent,
    GmvWizardComponent,
    StoreWizardComponent,
    CategoriesWizardComponent,
    InfluencersWizardComponent,
    UsersWizardComponent,
    QuoteWizardComponent,
    AddStoreModalComponent,
    QuotePersonalInfoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ArchwizardModule,
    Ng5SliderModule,
    NgbModule,
    MatRadioModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
