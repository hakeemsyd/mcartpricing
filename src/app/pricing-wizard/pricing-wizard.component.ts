import { Component, OnInit, ViewChild } from '@angular/core';
import { QuotePersonalInfoComponent } from '../pricing-wizard-sections/quote-personal-info/quote-personal-info.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NumberSymbol } from '@angular/common';
import { Item } from '../mock_data/items';
import { ObjectiveWizardComponent } from '../pricing-wizard-sections/objective-wizard/objective-wizard.component';
import { StoreWizardComponent } from '../pricing-wizard-sections/store-wizard/store-wizard.component';
import { CategoriesWizardComponent } from '../pricing-wizard-sections/categories-wizard/categories-wizard.component';

interface Store {
  name: String;
  website: String | null;
  regions: Array<String> | null;
  directRelation: boolean | null;
}

interface Influencers {
  name: String;
  id: String;
}

@Component({
  selector: 'app-pricing-wizard',
  templateUrl: './pricing-wizard.component.html',
  styleUrls: ['./pricing-wizard.component.css'],
})
export class PricingWizardComponent implements OnInit {

  @ViewChild(QuotePersonalInfoComponent) quoteChildWizard: QuotePersonalInfoComponent;
  @ViewChild(ObjectiveWizardComponent) objectivesWizardInstance: ObjectiveWizardComponent;
  @ViewChild(StoreWizardComponent) storeWizardInstance: StoreWizardComponent;
  @ViewChild(CategoriesWizardComponent) categoriesWizardInstance: CategoriesWizardComponent;

  planCalculatorForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.planCalculatorForm = this.fb.group({
      businessType: {} as Item,
      objectives: [{}] as Array<Item>,
      sales: this.fb.group({
        salesChannel: '' as String,
        globalChannel: '' as String,
      }),
      gmv: 0 as Number,
      selectedStores: [{}] as Array<Store>,
      category: [{}] as Array<Item>,
      influencers: [{}] as Array<Influencers>,
      personalInfo: this.fb.group({
        fullName: '' as String,
        companyName: '' as String,
        teleNum: '' as String,
        email: '' as String,
        website: '' as String,
        referredBy: '' as String,
        comments: '' as String
      })
    });
  }

  finishFunction() {
    console.log('Wizard ended');
  }

  onRequestQuote() {
    this.quoteChildWizard.onSubmit();
  }

  onSubmitObjectives() {
    this.objectivesWizardInstance.submitObjectives();
  }

  onSubmitStores() {
    this.storeWizardInstance.submitStores();
  }

  onSubmitCategories() {
    this.categoriesWizardInstance.submitStores();
  }
}
