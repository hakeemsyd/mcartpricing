import { Component, ViewChild, QueryList, AfterViewInit, OnInit } from '@angular/core';
import { GmvWizardComponent } from './pricing-wizard-sections/gmv-wizard/gmv-wizard.component';
import { PricingWizardComponent } from './pricing-wizard/pricing-wizard.component';
import { PlanInfoWizardComponent } from './plan-info-wizard/plan-info-wizard.component';

enum Plan {
  Annual = 0,
  Monthly = 1
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'mcartpricing';
  selectedPlan: Plan = Plan.Annual;
  annualStyle = { 'background-color': '#94ded8', 'color': '#fff' };
  monthlyStyle = { 'background-color': '#f6f6f6', 'color': '#515151' };
  currPriceWizardStep: number = 0;
  showBenefit = false;
  @ViewChild(PricingWizardComponent) priceWizardInstance: PricingWizardComponent;
  @ViewChild(PlanInfoWizardComponent) planInfoWizardInstance: PlanInfoWizardComponent;
  gmvInstance: GmvWizardComponent;

  onClickPlan(val: number) {
    if (val === Plan.Annual) {
      this.annualStyle = {
        'background-color': '#94ded8', 'color': '#fff'
      };
      this.monthlyStyle = { 'background-color': '#f6f6f6', 'color': '#515151' };
      if (this.priceWizardInstance) {
        this.priceWizardInstance.gmvWizardInstance.switchBillingPlan();
      }
    } else if (val === Plan.Monthly) {
      this.annualStyle = { 'background-color': '#f6f6f6', 'color': '#515151' };
      this.monthlyStyle = { 'background-color': '#94ded8', 'color': '#fff' };
      if (this.priceWizardInstance) {
        this.priceWizardInstance.gmvWizardInstance.switchBillingPlan();
      }
    }
  }

  getTotalProfit() {
    return this.priceWizardInstance.gmvWizardInstance.profitString;
  }

  getPriceRange() {
    return 'TBD';
  }

  stepChangedHandler(event: number) {
    this.currPriceWizardStep = event;
  }

  getShowHideBenefitPanel(){
    return this.planInfoWizardInstance.showBenefit;
  }

  ngOnInit() { }

}
