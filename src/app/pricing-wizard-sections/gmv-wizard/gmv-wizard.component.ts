import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gmv-wizard',
  templateUrl: './gmv-wizard.component.html',
  styleUrls: ['./gmv-wizard.component.css',
    '../../pricing-wizard/pricing-wizard.component.css']
})
export class GmvWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;

  mCart = {
    min: 0,
    max: 200,
    value: 200
  };

  platformCommission = {
    min: 0,
    max: 40,
    value: 0
  };

  influencerPayout = {
    min: 0,
    max: 50,
    value: 0
  };

  shopperRebate = {
    min: 0,
    max: 20,
    value: 0
  };

  gmv: number = 0;
  currPlan = 1;

  getmCartPercentage(): number {
    let percentage: number = 200;

    if (this.gmv >= 50000000000) {
      percentage = 0.78;
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
    this.mCart.value = this.getmCartPercentage();
    this.platformCommission.value = this.getPlatformPercentage();
    this.influencerPayout.value = this.getInfluencerPayout();
    this.shopperRebate.value = this.getShopperRebate();
  }

  constructor() { }

  ngOnInit() {
  }

  submitGMV() {
    this.parentForm.controls['gmv'].setValue(this.gmv);
  }
}
