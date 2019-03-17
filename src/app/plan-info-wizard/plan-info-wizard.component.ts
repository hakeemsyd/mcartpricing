import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { McartPlanTierInfoComponent } from './mcart-plan-tier-info/mcart-plan-tier-info.component';
import { BenefitsSidebarComponent } from './benefits-sidebar/benefits-sidebar.component';

@Component({
  selector: 'app-plan-info-wizard',
  templateUrl: './plan-info-wizard.component.html',
  styleUrls: ['./plan-info-wizard.component.css']
})
export class PlanInfoWizardComponent implements OnInit {

  @Output() public showBenefitDetailTable: EventEmitter<boolean> = new EventEmitter();
  @Input() currPriceWizardStep: number;
  @Input() isCurrStepBeforeGMV: boolean = false;
  showBenefit = false;
  showPlanTable = false;
  @Input() currPlanTier = 1;
  oldPlanTier = 1;

  currentActiveInforCard = 0;
  constructor() { }

  @ViewChild(McartPlanTierInfoComponent) mcartPlanInfoTierInstance: McartPlanTierInfoComponent;
  @ViewChild(BenefitsSidebarComponent) benefitSidebarInstnace: BenefitsSidebarComponent;
  // @ViewChild(BusinessWizardComponent) businessChildWizardInstance: BusinessWizardComponent;

  ngOnInit() {
  }

  showBenefitPanel() {
    this.showBenefit = true;
    this.showBenefitDetailTable.emit(true);
  }

  updatePlanTier() {
    if (this.mcartPlanInfoTierInstance) {
      this.mcartPlanInfoTierInstance.updatePlanTier(this.currPlanTier);
    }
  }

  getCurrPlanTier() {
    if (this.currPlanTier !== this.oldPlanTier) {
      this.mcartPlanInfoTierInstance.updatePlanTier(this.currPlanTier);
    }
    this.oldPlanTier = this.currPlanTier;
    return this.currPlanTier;
  }
}
