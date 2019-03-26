import { EventEmitter, Injectable } from '@angular/core';
import { Item } from './mock_data/items';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


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

@Injectable()
export class PricingWizardManagerService {

  public regex: any = {
    email: /^\w+([\.-]?\w+)+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
  }
  private marketPlaceCalculatorForm: FormGroup;

  constructor(private httpClient: HttpClient,
    private _fb: FormBuilder) {

    this.initializeForm();
  }

  initializeForm() {
    this.marketPlaceCalculatorForm = this._fb.group({
      step_number: 1,
      business_info: this._fb.group({
        businessType: ['media', [Validators.required]],
        otherBusiness: new FormControl({ value: '', disabled: true })
      }),
      objectives: ['', [Validators.required]],
      sales: this._fb.group({
        salesChannel: [0 as number, [Validators.required, Validators.min(1)]],
        globalChannel: [0 as number, [Validators.required, Validators.min(1)]]
      }),
      gmvDetails: this._fb.group({
        gmv: 0 as number,
        platformCommissionPercentage: 0 as number,
        influencerPayoutPercentage: 0 as number,
        shopperRebatePercentage: 0 as number
      }),
      selectedStores: ['', Validators.required],
      selectedCategories: ['', Validators.required],
      influencers: ['', Validators.required],
      usersPlan: ['plan1', Validators.required],
      personalInfo: this._fb.group({
        fullName: ['', Validators.required],
        companyName: '' as String,
        teleNum: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email, Validators.pattern(this.regex.email)]],
        website: '' as String,
        referredBy: '' as String,
        comments: '' as String
      })
    })


    this.businessType.valueChanges.subscribe(val => {
      if (val == 'other') {
        this.otherBusiness.setValidators(Validators.required);
        this.otherBusiness.enable();
      } else {
        this.otherBusiness.setValue('');
        this.otherBusiness.clearValidators();
        this.otherBusiness.disable();
      }
    });


  }

  emailPlanDetails() {
    return this.httpClient.post(' https://staging.admin.buybit.io/api/sendEmail', {
      jsonData: JSON.stringify(this.marketPlaceCalculatorForm.getRawValue()),
      email: this.email.value
    });
  }

  get businessInfo() { return this.marketPlaceCalculatorForm.get('business_info') };
  get businessType() { return this.marketPlaceCalculatorForm.get('business_info.businessType') };
  get otherBusiness() { return this.marketPlaceCalculatorForm.get('business_info.otherBusiness') };
  get objectives() { return this.marketPlaceCalculatorForm.get('objectives') };
  get sales() { return this.marketPlaceCalculatorForm.get('sales') };
  get salesChannel() { return this.marketPlaceCalculatorForm.get('sales.salesChannel') };
  get globalChannel() { return this.marketPlaceCalculatorForm.get('sales.globalChannel') };
  get gmvDetails() { return this.marketPlaceCalculatorForm.get('gmvDetails') };
  get gmv() { return this.marketPlaceCalculatorForm.get('gmvDetails.gmv') };
  get platformCommissionPercentage() { return this.marketPlaceCalculatorForm.get('gmvDetails.platformCommissionPercentage') };
  get influencerPayoutPercentage() { return this.marketPlaceCalculatorForm.get('gmvDetails.influencerPayoutPercentage') };
  get shopperRebatePercentage() { return this.marketPlaceCalculatorForm.get('gmvDetails.shopperRebatePercentage') };
  get selectedStores() { return this.marketPlaceCalculatorForm.get('selectedStores') };
  get selectedCategories() { return this.marketPlaceCalculatorForm.get('selectedCategories') };
  get influencers() { return this.marketPlaceCalculatorForm.get('influencers') };
  get usersPlan() { return this.marketPlaceCalculatorForm.get('usersPlan') };
  get personalInfo() { return this.marketPlaceCalculatorForm.get('personalInfo') };
  get fullName() { return this.marketPlaceCalculatorForm.get('personalInfo.fullName') };
  get companyName() { return this.marketPlaceCalculatorForm.get('personalInfo.companyName') };
  get teleNum() { return this.marketPlaceCalculatorForm.get('personalInfo.teleNum') };
  get website() { return this.marketPlaceCalculatorForm.get('personalInfo.website') };
  get referredBy() { return this.marketPlaceCalculatorForm.get('personalInfo.referredBy') };
  get comments() { return this.marketPlaceCalculatorForm.get('personalInfo.comments') };
  get email() { return this.marketPlaceCalculatorForm.get('personalInfo.email') };


  // mark all controls dirty
  markControlsTouched(group: any) {
    for (let i in group.controls) {
      group.controls[i].markAsTouched();
      if (group.controls[i] instanceof FormGroup || group.controls[i] instanceof FormArray) {
        this.markControlsTouched(group.controls[i]);
      }
    }
  }

  isBenefitTableOpen = false;
  isPlanInfoTableOpen = false;
  currentSelectedBusiness = null;
  currPlanTier = 0;

  onBenefitTableOpenEvent = new EventEmitter<boolean>();
  onPlanInfoTableOpenEvent = new EventEmitter<boolean>();
  onScrollUpToFormEvent = new EventEmitter();
  onChangeSelectedBusiness = new EventEmitter<Item>();
  onUpdatePlanTier = new EventEmitter<number>();

  openBenefitTable() {
    this.isBenefitTableOpen = true;
    this.onBenefitTableOpenEvent.emit(true);
  }

  openPlanInfoTable() {
    this.isPlanInfoTableOpen = true;
    this.onPlanInfoTableOpenEvent.emit(true);
  }

  scrollUpToForm() {
    this.onScrollUpToFormEvent.emit();
  }

  changeSelectedBusiness(selectedBusiness: Item) {
    this.currentSelectedBusiness = selectedBusiness;
    this.onChangeSelectedBusiness.emit(selectedBusiness);
  }

  updatePlanTier(updatedTier: number) {
    this.currPlanTier = updatedTier;
    this.onUpdatePlanTier.emit(updatedTier);
  }
}
