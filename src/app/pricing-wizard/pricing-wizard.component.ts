import { Component, OnInit, ViewChild, Output, ElementRef } from '@angular/core';
import { QuotePersonalInfoComponent } from '../pricing-wizard-sections/quote-personal-info/quote-personal-info.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Item } from '../mock_data/items';
import { ObjectiveWizardComponent } from '../pricing-wizard-sections/objective-wizard/objective-wizard.component';
import { StoreWizardComponent } from '../pricing-wizard-sections/store-wizard/store-wizard.component';
import { CategoriesWizardComponent } from '../pricing-wizard-sections/categories-wizard/categories-wizard.component';
import { InfluencersWizardComponent } from '../pricing-wizard-sections/influencers-wizard/influencers-wizard.component';
import { UsersWizardComponent } from '../pricing-wizard-sections/users-wizard/users-wizard.component';
import { GmvWizardComponent } from '../pricing-wizard-sections/gmv-wizard/gmv-wizard.component';
import { EventEmitter } from '@angular/core';
import { WizardComponent } from '../../../modules/angular-archwizard';
import { BusinessWizardComponent } from '../pricing-wizard-sections/business-wizard/business-wizard.component';
import { SalesWizardComponent } from '../pricing-wizard-sections/sales-wizard/sales-wizard.component';

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

  @ViewChild(BusinessWizardComponent) businessChildWizardInstance: BusinessWizardComponent;
  @ViewChild(ObjectiveWizardComponent) objectivesWizardInstance: ObjectiveWizardComponent;
  @ViewChild(StoreWizardComponent) storeWizardInstance: StoreWizardComponent;
  @ViewChild(CategoriesWizardComponent) categoriesWizardInstance: CategoriesWizardComponent;
  @ViewChild(InfluencersWizardComponent) influencersWizardInstance: InfluencersWizardComponent;
  @ViewChild(UsersWizardComponent) usersWizardInstance: UsersWizardComponent;
  @ViewChild(QuotePersonalInfoComponent) quoteChildWizardInstance: QuotePersonalInfoComponent;
  @ViewChild(QuotePersonalInfoComponent) quoteWizardInstance: QuotePersonalInfoComponent;
  @ViewChild(GmvWizardComponent) gmvWizardInstance: GmvWizardComponent;
  @ViewChild(SalesWizardComponent) salesWizardInstance: SalesWizardComponent;

  @Output() stepChanged: EventEmitter<number> = new EventEmitter();
  @ViewChild('archWiz') public wizard: WizardComponent;

  planCalculatorForm: FormGroup;

  wizardCurrStep = 0;
  wizardSelectedPathIndex = 0;
  wizardPathArray: Array<Array<number>> = [
    [0, 1, 3, 4, 5, 6, 7, 8, 9], // Media
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // CPG
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 9] // Malls, step 10 is extra step in malls category
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.planCalculatorForm = this.fb.group({
      businessType: { name: '', value: '' } as Item,
      objectives: [{}] as Array<Item>,
      sales: this.fb.group({
        salesChannel: 0 as number,
        globalChannel: 0 as number,
      }),
      gmv: 0 as Number,
      selectedStores: [{}] as Array<Store>,
      category: [{}] as Array<Item>,
      influencers: [{}] as Array<Influencers>,
      usersPlan: {},
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

  onSubmitBusiness() {
    this.gmvWizardInstance.loadGMVVariables();
    this.salesWizardInstance.loadSalesVariables();
  }

  onSubmitObjectives() {
    this.objectivesWizardInstance.submitObjectives();
  }

  onSubmitSales() {
    let isValid = this.salesWizardInstance.submitSales();
    if (isValid) {
      this.gmvWizardInstance.loadGMVVariables();
      this.goToNextStep();
    }
  }

  onSubmitGMV() {
    this.gmvWizardInstance.submitGMV();
  }

  onSubmitStores() {
    this.storeWizardInstance.submitStores();
  }

  onSubmitCategories() {
    this.categoriesWizardInstance.submitStores();
  }

  onSubmitInfluencers() {
    this.influencersWizardInstance.submitInfluencers();
  }

  onSubmitUsers() {
    this.usersWizardInstance.onSubmitUsers();
  }

  onSubmitQuote() {
    this.quoteWizardInstance.onSubmitPersnalInfo();
  }

  onRequestQuote() {
    this.quoteWizardInstance.onSubmit();
  }

  enterStep(step: number) {
    // this.wizardCurrStep = step;
    // this.stepChanged.emit(step);
  }

  selectPath(): void {
    const selectedPath: Item = this.planCalculatorForm.controls['businessType'].value;

    switch (selectedPath.value) {
      case 'media':
        this.wizardSelectedPathIndex = 0;
        break;
      case 'cpg':
        this.wizardSelectedPathIndex = 1;
        break;
      case 'malls':
        this.wizardSelectedPathIndex = 2;
        break;
      default:
        this.wizardSelectedPathIndex = 0;
        break;
    }
  }

  goToNextStep() {
    const currArr = this.wizardPathArray[this.wizardSelectedPathIndex];
    const nextStep = currArr[this.wizardCurrStep + 1];
    this.wizardCurrStep = this.wizardCurrStep + 1;
    this.wizard.navigation.goToStep(nextStep);
  }

  goToPrevStep() {
    const currArr = this.wizardPathArray[this.wizardSelectedPathIndex];
    const nextStep = currArr[this.wizardCurrStep - 1];
    this.wizardCurrStep = this.wizardCurrStep - 1;
    this.wizard.navigation.goToStep(nextStep);
  }
}
