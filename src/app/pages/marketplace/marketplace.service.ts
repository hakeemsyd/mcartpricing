import { EventEmitter, Injectable } from '@angular/core';
import { Item } from './mock_data/items';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Injectable()
export class PricingWizardManagerService {

  private marketPlaceCalculatorForm: FormGroup;

  constructor(
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
      objective: ['', [Validators.required]]
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

  get businessInfo() { return this.marketPlaceCalculatorForm.get('business_info') };
  get businessType() { return this.marketPlaceCalculatorForm.get('business_info.businessType') };
  get otherBusiness() { return this.marketPlaceCalculatorForm.get('business_info.otherBusiness') };


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
