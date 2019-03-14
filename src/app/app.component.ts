import { Component, ViewChild, QueryList, AfterViewInit, OnInit, AfterViewChecked, ElementRef, Renderer2 } from '@angular/core';
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

export class AppComponent implements OnInit, AfterViewChecked {

  title = 'mcartpricing';
  selectedPlan: Plan = Plan.Annual;
  annualStyle = { 'background-color': '#94ded8', 'color': '#fff' };
  monthlyStyle = { 'background-color': '#f6f6f6', 'color': '#515151' };
  currPriceWizardStep: number = 0;
  @ViewChild(PricingWizardComponent) priceWizardInstance: PricingWizardComponent;
  @ViewChild(PlanInfoWizardComponent) planInfoWizardInstance: PlanInfoWizardComponent;
  gmvInstance: GmvWizardComponent;
  benefitUpdated = false;
  showPlansTable = false;
  @ViewChild('benefitTable') public benefitTable: ElementRef;
  @ViewChild('pricingWizardDiv') public pricingWizardDiv: ElementRef;

  constructor(private renderer: Renderer2) {
    /**
     * This events get called by all clicks on the page
     */
    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      this.planInfoWizardInstance.isClickedAreaBelongToThisWizard(e);
    });
  }

  ngAfterViewChecked() {
    if (this.benefitTable) {
      this.scrollBenefitTable();
    }
  }

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
    if (this.isCurrStepBeforeGMV()) {
      return 'TBD';
    } else {
      return this.priceWizardInstance.gmvWizardInstance.profitString;
    }
  }

  getPriceRange() {
    if (this.isCurrStepBeforeGMV()) {
      return 'TBD';
    } else {
      return this.priceWizardInstance.gmvWizardInstance.priceRange;
    }
  }

  stepChangedHandler(event: number) {
    this.currPriceWizardStep = event;
  }

  getShowHideBenefitPanel() {
    return this.planInfoWizardInstance.showBenefit;
  }

  ngOnInit() { }

  onBenefitEventChange($event: boolean) {
    this.benefitUpdated = true;
    if (this.benefitTable) {
      this.benefitTable.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollBenefitTable() {
    if (this.benefitTable && this.benefitUpdated) {
      this.benefitTable.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.benefitUpdated = false;
    }
  }

  scrollToForm() {
    this.pricingWizardDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  isCurrStepBeforeGMV() {
    return this.priceWizardInstance.isCurrStepBeforeGMV();
  }
}
