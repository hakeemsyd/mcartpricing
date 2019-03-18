import { EventEmitter } from '@angular/core';

export class PricingWizardManagerService {

  isBenefitTableOpen = false;
  isPlanInfoTableOpen = false;

  onBenefitTableOpenEvent = new EventEmitter<boolean>();
  onPlanInfoTableOpenEvent = new EventEmitter<boolean>();
  onScrollUpToFormEvent = new EventEmitter();

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
}
