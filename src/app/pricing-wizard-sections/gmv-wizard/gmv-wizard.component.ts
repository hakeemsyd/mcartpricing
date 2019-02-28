import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import numeral from 'numeral';

@Component({
  selector: 'app-gmv-wizard',
  templateUrl: './gmv-wizard.component.html',
  styleUrls: ['./gmv-wizard.component.css',
    '../../pricing-wizard/pricing-wizard.component.css']
})
export class GmvWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;

  @Output() approxProfitEmitter: EventEmitter<number> = new EventEmitter();
  @Output() priceRangeEmitter: EventEmitter<number> = new EventEmitter();
  public isAnnualBilling = true;

  variableFee: number = 200;
  approxProfit: number = 0;

  priceRange: String = 'TBD';
  profitString: String = 'TBD';
  mCart = {
    min: 0,
    max: 200,
    value: 200
  };

  platformCommission = {
    min: 5,
    max: 40,
    value: 5
  };

  influencerPayout = {
    min: 30,
    max: 50,
    value: 30
  };

  shopperRebate = {
    min: 5,
    max: 15,
    value: 5
  };

  gmv: number = 0;
  currPlan = 1;

  constructor() { }

  ngOnInit() {
  }

  submitGMV() {
    this.parentForm.controls['gmv'].setValue(this.gmv);
  }

  getVraiableFeeForMAvatar(): number {
    let percentage: number = 200;

    if (this.gmv >= 50000000000) {
      percentage = 0.78;
      this.priceRange = '';
    } else if (this.gmv >= 5000000000) {
      percentage = 1.56;
    } else if (this.gmv >= 500000000) {
      percentage = 3.13;
    } else if (this.gmv >= 50000000) {
      percentage = 6.25;
    } else if (this.gmv >= 10000000) {
      percentage = 12.5;
    } else if (this.gmv >= 5000000) {
      percentage = 20;
    } else if (this.gmv >= 3000000) {
      percentage = 40;
    } else if (this.gmv >= 1500000) {
      percentage = 100;
    }

    return percentage;
  }


  getVraiableFee(): number {
    let percentage = 20;

    if (this.gmv >= 50000000000) {
      percentage = 5;
      this.priceRange = '';
    } else if (this.gmv >= 5000000000) {
      percentage = 5;
    } else if (this.gmv >= 500000000) {
      percentage = 10;
    } else if (this.gmv >= 50000000) {
      percentage = 20;
    } else if (this.gmv >= 10000000) {
      percentage = 20;
    } else if (this.gmv >= 5000000) {
      percentage = 20;
    } else if (this.gmv >= 3000000) {
      percentage = 30;
    } else if (this.gmv >= 1500000) {
      percentage = 30;
    }

    return percentage / 100;
  }

  getPlatformPercentage(): number {
    return 10;
  }

  getInfluencerPayout(): number {
    return 50;
  }

  getShopperRebate(): number {
    return 10;
  }

  calculateGMVValues() {
    let softwareFee = 0;
    let platformRevenue = 0;
    let rebateEquation = 0;
    let mCartLicenseFee = 0; //fee2
    this.variableFee = this.getVraiableFee();

    platformRevenue = this.gmv * (this.platformCommission.value / 100);
    mCartLicenseFee = platformRevenue * this.variableFee;

    rebateEquation = platformRevenue * ((this.platformCommission.value + this.shopperRebate.value) / 100);
    softwareFee = 100000 + mCartLicenseFee;

    if (this.isAnnualBilling === false) {
      softwareFee /= 12;
    }
    this.approxProfit = Math.ceil(platformRevenue - softwareFee - rebateEquation);
    this.profitString = numeral(this.approxProfit).format('$0a');
    this.priceRangeEmitter.emit(this.approxProfit);
  }

  switchBillingPlan() {
    this.isAnnualBilling = !this.isAnnualBilling;
    this.calculateGMVValues();
  }
}
