import { Component, OnInit, Input } from '@angular/core';
import { mCartPlan as MCARTPLANARRAY, IMCartPlan } from '../../mock_data/mCartPlan';
import { PricingWizardManagerService } from 'src/app/pricing-wizard-manager.service';
@Component({
  selector: 'app-mcart-plan-tier-info',
  templateUrl: './mcart-plan-tier-info.component.html',
  styleUrls: ['./mcart-plan-tier-info.component.css',
    '../plan-info-wizard.component.css'],
})
export class McartPlanTierInfoComponent implements OnInit {

  mCartPlans: IMCartPlan[] = MCARTPLANARRAY;
  selectedPlan: IMCartPlan;
  showPlanTable = false;
  @Input() currPlanTier = 1;
  constructor(private pricingWizardManagerService: PricingWizardManagerService) {
    this.selectedPlan = this.mCartPlans[0];
  }

  ngOnInit() {
  }

  onShowPlanTable() {
    this.showPlanTable = true;
    this.pricingWizardManagerService.openBenefitTable();
    // this.showBenefitDetailTable.emit(true);
  }

  updatePlanTier(updatedTier) {
    this.selectedPlan = this.mCartPlans[updatedTier - 1];
  }

}
