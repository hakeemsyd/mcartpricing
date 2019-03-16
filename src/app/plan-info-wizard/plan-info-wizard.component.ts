import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { McartPlanTierInfoComponent } from './mcart-plan-tier-info/mcart-plan-tier-info.component';

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
  // @ViewChild(BusinessWizardComponent) businessChildWizardInstance: BusinessWizardComponent;

  @ViewChild('infoButton1') infoButton1: ElementRef;
  @ViewChild('infoButton2') infoButton2: ElementRef;
  @ViewChild('infoButton3') infoButton3: ElementRef;
  @ViewChild('infoButton4') infoButton4: ElementRef;

  @ViewChild('card1') card1: ElementRef;
  @ViewChild('card2') card2: ElementRef;
  @ViewChild('card3') card3: ElementRef;
  @ViewChild('card4') card4: ElementRef;

  ngOnInit() {
  }

  showBenefitPanel() {
    this.showBenefit = true;
    this.showBenefitDetailTable.emit(true);
  }


  onPressInfo(cardNum) {
    this.currentActiveInforCard = cardNum;
  }

  onCloseCardRequest() {
    this.currentActiveInforCard = 0;
  }

  showInfoPanel(num) {
    if (this.currentActiveInforCard === num) {
      return true;
    }
    return false;
  }

  isClickedAreaBelongToThisWizard(e: Event) {
    if (this.currentActiveInforCard === 0) {
      return;
    }
    if (this.currentActiveInforCard === 1 && e.target !== this.infoButton1.nativeElement
      && this.card1 && !this.card1.nativeElement.contains(e.target)) {
      this.currentActiveInforCard = 0;
    }
    if (this.currentActiveInforCard === 2 && e.target !== this.infoButton2.nativeElement
      && this.card2 && !this.card2.nativeElement.contains(e.target)) {
      this.currentActiveInforCard = 0;
    }
    if (this.currentActiveInforCard === 3 && e.target !== this.infoButton3.nativeElement
      && this.card3 && !this.card3.nativeElement.contains(e.target)) {
      this.currentActiveInforCard = 0;
    }
    if (this.currentActiveInforCard === 4 && e.target !== this.infoButton4.nativeElement
      && this.card4 && !this.card4.nativeElement.contains(e.target)) {
      this.currentActiveInforCard = 0;
    }

    return false;
  }

  updatePlanTier() {
    if (this.mcartPlanInfoTierInstance) {
      this.mcartPlanInfoTierInstance.updatePlanTier();
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
