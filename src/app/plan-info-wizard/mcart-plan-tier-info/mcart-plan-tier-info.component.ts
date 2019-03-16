import { Component, OnInit } from '@angular/core';
import { mCartPlan as MCARTPLANARRAY, IMCartPlan } from '../../mock_data/mCartPlan';
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
  constructor() {
    this.selectedPlan = this.mCartPlans[2];
  }

  ngOnInit() {
  }

  onShowPlanTable() {
    this.showPlanTable = true;
    // this.showBenefitDetailTable.emit(true);
  }

}
