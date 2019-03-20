import { EventEmitter } from '@angular/core';
import { Item } from './mock_data/items';

export class PricingWizardManagerService {

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
