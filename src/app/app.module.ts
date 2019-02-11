import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ArchwizardModule } from 'angular-archwizard';
import { Ng5SliderModule } from 'ng5-slider';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ArchwizardModule,
    Ng5SliderModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
