import { Component, ViewChild, QueryList, AfterViewInit, OnInit } from '@angular/core';
import { GmvWizardComponent } from './pricing-wizard-sections/gmv-wizard/gmv-wizard.component';
import { PricingWizardComponent } from './pricing-wizard/pricing-wizard.component';

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
  currPriceWizardStep: number = 4;

  @ViewChild (PricingWizardComponent) priceInstance: PricingWizardComponent;

  gmvInstance: GmvWizardComponent;

  onClickPlan(val: number) {
    if (val === Plan.Annual) {
      this.annualStyle = {
        'background-color': '#94ded8', 'color': '#fff'
      };
      this.monthlyStyle = { 'background-color': '#f6f6f6', 'color': '#515151' };
      if (this.priceInstance) {
        this.priceInstance.gmvWizardInstance.switchBillingPlan();
      }
    } else if (val === Plan.Monthly) {
      this.annualStyle = { 'background-color': '#f6f6f6', 'color': '#515151' };
      this.monthlyStyle = { 'background-color': '#94ded8', 'color': '#fff' };
      if (this.priceInstance) {
        this.priceInstance.gmvWizardInstance.switchBillingPlan();
      }
    }
  }

  getTotalProfit() {
    return this.priceInstance.gmvWizardInstance.profitString;
  }

  getPriceRange() {
    return 'TBD';
  }

  stepChangedHandler(event: number) {
    this.currPriceWizardStep = event;
  }

  ngOnInit() { }

}
