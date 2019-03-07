import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-plan-info-wizard',
  templateUrl: './plan-info-wizard.component.html',
  styleUrls: ['./plan-info-wizard.component.css']
})
export class PlanInfoWizardComponent implements OnInit {

  @Output() public showBenefitDetailTable: EventEmitter<boolean> = new EventEmitter();
  @Input() currPriceWizardStep: number;
  showBenefit = false;
  currentActiveInforCard = 0;
  constructor() { }

  ngOnInit() {
  }

  showBenefitPanel() {
    this.showBenefit = !this.showBenefit;
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
}
