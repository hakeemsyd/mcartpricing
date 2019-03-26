import { Component, OnInit, Input } from '@angular/core';
import { mCartPlan as MCARTPLANARRAY, IMCartPlan } from '../../mock_data/mCartPlan';
import { PricingWizardManagerService } from '../../marketplace.service';

@Component({
  selector: 'app-mcart-plan-tier-info',
  templateUrl: './mcart-plan-tier-info.component.html',
  styleUrls: ['./mcart-plan-tier-info.component.scss',
    '../plan-info-wizard.component.scss'],
})
export class McartPlanTierInfoComponent implements OnInit {

  mCartPlans: IMCartPlan[] = MCARTPLANARRAY;
  selectedPlan: IMCartPlan;
  showPlanTable = false;
  @Input() currPlanTier = 1;
  constructor(private pricingWizardManagerService: PricingWizardManagerService) {
    this.selectedPlan = this.mCartPlans[0];

    this.pricingWizardManagerService.onUpdatePlanTier.subscribe(
      (updatedTier: number) => {
        this.updatePlanTier(updatedTier);
      });

  }

  ngOnInit() {
  }

  onShowPlanTable() {
    this.showPlanTable = true;
    this.pricingWizardManagerService.openPlanInfoTable();
    // this.showBenefitDetailTable.emit(true);
  }

  updatePlanTier(updatedTier) {
    this.selectedPlan = this.mCartPlans[updatedTier - 1];
    this.currPlanTier = updatedTier - 1;
  }

  getCurrTierSpectrum() {
    switch (this.currPlanTier) {
      case 0:
        return 'tier1.png';
      case 1:
        return 'tier2.png';
      case 2:
        return 'tier3.png';
      case 3:
        return 'tier4.png';
      default:
        return 'tier4.png';
    }
  }

}
