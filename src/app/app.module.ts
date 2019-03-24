import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from '../../modules/angular-archwizard';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatCardModule, MatCheckboxModule, MatSliderModule, MatRadioModule, MatDialogModule, MatFormFieldModule, } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import 'hammerjs';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { PricingWizardComponent } from './pages/marketplace/pricing-wizard/pricing-wizard.component';
import { BusinessWizardComponent } from './pages/marketplace/pricing-wizard-sections/business-wizard/business-wizard.component';
import { ObjectiveWizardComponent } from './pages/marketplace/pricing-wizard-sections/objective-wizard/objective-wizard.component';
import { SalesWizardComponent } from './pages/marketplace/pricing-wizard-sections/sales-wizard/sales-wizard.component';
import { GmvWizardComponent } from './pages/marketplace/pricing-wizard-sections/gmv-wizard/gmv-wizard.component';
import { StoreWizardComponent } from './pages/marketplace/pricing-wizard-sections/store-wizard/store-wizard.component';
import { CategoriesWizardComponent } from './pages/marketplace/pricing-wizard-sections/categories-wizard/categories-wizard.component';
import { InfluencersWizardComponent } from './pages/marketplace/pricing-wizard-sections/influencers-wizard/influencers-wizard.component';
import { UsersWizardComponent } from './pages/marketplace/pricing-wizard-sections/users-wizard/users-wizard.component';
import { AddStoreModalComponent } from './pages/marketplace/pricing-wizard-sections/store-wizard/add-store-modal/add-store-modal.component';
import { QuotePersonalInfoComponent } from './pages/marketplace/pricing-wizard-sections/quote-personal-info/quote-personal-info.component';
import { PlanInfoWizardComponent } from './pages/marketplace/plan-info-wizard/plan-info-wizard.component';
import { StoreOptionsWizardComponent } from './pages/marketplace/pricing-wizard-sections/store-options-wizard/store-options-wizard.component';
import { BenefitCalculatorComponent } from './pages/marketplace/plan-info-wizard/benefit-calculator/benefit-calculator.component';
import { McartPlanTierInfoComponent } from './pages/marketplace/plan-info-wizard/mcart-plan-tier-info/mcart-plan-tier-info.component';
import { BenefitsSidebarComponent } from './pages/marketplace/plan-info-wizard/benefits-sidebar/benefits-sidebar.component';
import { CategoryDialogComponent } from './pages/marketplace/pricing-wizard-sections/category-dialog/category-dialog.component';
import {Ng2TelInputModule} from 'ng2-tel-input';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'marketplace',
    pathMatch: 'full'
  },
  {
    path: 'marketplace',
    component: AppComponent
  }
];

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
    AddStoreModalComponent,
    CategoryDialogComponent,
    QuotePersonalInfoComponent,
    PlanInfoWizardComponent,
    StoreOptionsWizardComponent,
    BenefitCalculatorComponent,
    McartPlanTierInfoComponent,
    BenefitsSidebarComponent,
    MarketplaceComponent
  ],
  entryComponents: [
    CategoryDialogComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ArchwizardModule,
    Ng5SliderModule,
    NgbModule,
    Ng2TelInputModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
