import { EventEmitter } from '@angular/core';

export class PricingWizardManagerService {

  isBenefitTableOpen = false;
  planInfoTableOpen = false;

  onBenefitTableOpenEvent = new EventEmitter<boolean>();
  openBenefitTable() {
    this.isBenefitTableOpen = true;
    this.onBenefitTableOpenEvent.emit(true);
  }

  openPlanInfoTable() {

  }
}
