import { Component, ViewChild, QueryList, AfterViewInit, OnInit, AfterViewChecked, ElementRef, Renderer2 } from '@angular/core';
import { GmvWizardComponent } from './pricing-wizard-sections/gmv-wizard/gmv-wizard.component';
import { PricingWizardComponent } from './pricing-wizard/pricing-wizard.component';
import { PlanInfoWizardComponent } from './plan-info-wizard/plan-info-wizard.component';
import { PricingWizardManagerService } from './pricing-wizard-manager.service';

enum Plan {
  Annual = 0,
  Monthly = 1
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PricingWizardManagerService]
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
  planUpdated = false;
  @ViewChild('planTable') public planTable: ElementRef;
  @ViewChild('benefitTable') public benefitTable: ElementRef;
  @ViewChild('pricingWizardDiv') public pricingWizardDiv: ElementRef;

  showPlanInfoTable = false;
  showBenefitTable = false;

  constructor(private renderer: Renderer2, private pricingWizardManagerService: PricingWizardManagerService) {
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
      if (this.planInfoWizardInstance.benefitSidebarInstnace) {
        this.planInfoWizardInstance.benefitSidebarInstnace.isClickedAreaBelongToThisWizard(e);
      }
    });

    pricingWizardManagerService.onPlanInfoTableOpenEvent.subscribe(
      async (isPlanInfoTableOpen) => {
        this.showPlanInfoTable = isPlanInfoTableOpen;
        await new Promise(resolve => setTimeout(resolve, 500));
        this.scrollToPlanInfoTable();
      }
    );

    pricingWizardManagerService.onBenefitTableOpenEvent.subscribe(
      async (isBenefitTableOpen) => {
        this.showBenefitTable = isBenefitTableOpen;
        await new Promise(resolve => setTimeout(resolve, 500));
        this.scrollToBenefitTable();
      }
    );

    pricingWizardManagerService.onScrollUpToFormEvent.subscribe(() => {
      this.scrollToForm();
    });
  }

  ngAfterViewChecked() {
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

  getCurrStep(): number {
    return this.priceWizardInstance.wizardCurrStep;
  }

  stepChangedHandler(event: number) {
    this.currPriceWizardStep = event;
  }

  getShowHideBenefitPanel() {
    if (this.isCurrStepBeforeGMV()) {
      return this.planInfoWizardInstance.showBenefit;
    } else {
      return false;
    }
  }

  getShowPlanTable() {
    if (this.isCurrStepBeforeGMV() === false) {
      return this.planInfoWizardInstance.showPlanTable;
    }
  }

  ngOnInit() { }

  // TODO: remove it
  onBenefitEventChange($event: boolean) {
    this.benefitUpdated = true;
    if (this.benefitTable) {
      this.benefitTable.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // TODO: remove it
  onPlanEventChange($event: boolean) {
    this.planUpdated = true;
    if (this.planTable) {
      this.planTable.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToPlanInfoTable() {
    this.planUpdated = true;
    if (this.planTable) {
      this.planTable.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToBenefitTable() {
    this.benefitUpdated = true;
    if (this.benefitTable) {
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

  getShowBenefitTable() {
    if (this.showBenefitTable && this.isCurrStepBeforeGMV()) {
      return true;
    } else {
      return false;
    }
  }

  getShowPlanInfoTable() {
    if (this.showPlanInfoTable && !this.isCurrStepBeforeGMV()) {
      return true;
    } else {
      return false;
    }
  }

  getCurrPlanTier(): number {
    return this.priceWizardInstance.gmvWizardInstance.currPlanTier;
  }
}
