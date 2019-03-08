import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import numeral from 'numeral';
import { Item } from 'src/app/mock_data/items';

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
  isGreateThan100B = true;

  businessTypeValue = "media";
  // isGMVSliderDisabled = false;

  mCart = {
    min: 0,
    max: 100,
    value: 100
  };

  platformCommission = {
    min: 40,
    max: 40,
    value: 40,
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

  gmvSlider = {
    min: 10000,
    max: 1000000000,
    value: 10000,
  };

  gmv: number = 0;
  currPlan = 1;
  salesChanneValue = 0;
  globalChannelValues = 0;

  constructor() {
  }

  ngOnInit() {
  }

  loadGMVVariables() {
    let businessType: Item = this.parentForm.controls['businessType'].value;
    this.businessTypeValue = businessType.value;

    let _gmv = 10000;
    if (this.businessTypeValue !== 'media') {
      this.salesChanneValue = (<FormGroup>this.parentForm.controls['sales']).controls['salesChannel'].value;
      this.globalChannelValues = (<FormGroup>this.parentForm.controls['sales']).controls['globalChannel'].value;
      _gmv = this.salesChanneValue * this.globalChannelValues * (this.mCart.value / 100);
    }
    this.gmvSlider.value = Math.ceil(_gmv);
    this.calculateGMVProfile();
  }

  submitGMV() {
    this.parentForm.controls['gmv'].setValue(this.gmv);
  }

  // remove this function
  calculateGMVmCartValues(mCartValue) {
    let _gmv = 0;
    _gmv = this.salesChanneValue * this.globalChannelValues * (mCartValue / 100);
    return _gmv;
  }

  onChangeGMV(value) {
    console.log(value);
  }

  calculateGMVProfile(callingSource) {

    let gmvValue = this.gmvSlider.value;
    let mCartValue = this.mCart.value;
    let platformCommissionValue = this.platformCommission.value;
    let influencerPayoutValue = this.influencerPayout.value;
    let shopperRebateValue = this.shopperRebate.value;

    if (callingSource !== undefined) {
      if (callingSource.source._elementRef.nativeElement.id === 'gmvSlider') {
        gmvValue = callingSource.value;
      } else if (callingSource.source._elementRef.nativeElement.id === 'mCartSlider') {
        mCartValue = callingSource.value;
      } else if (callingSource.source._elementRef.nativeElement.id === 'commissionSlider') {
        platformCommissionValue = callingSource.value;
      } else if (callingSource.source._elementRef.nativeElement.id === 'influencerSlider') {
        influencerPayoutValue = callingSource.value;
      } else if (callingSource.source._elementRef.nativeElement.id === 'shopperSlider') {
        shopperRebateValue = callingSource.value;
      }
    }

    // Sales(GMV) = $G(this is annual sales done on all products by FXG)
    // Commission = (C % * GMV)(this is what FXG gets from the sales)
    // Influencer payout = I % * Commission(Influencer payout I % is cut from commission of fxg in that they got in step 2)
    // Shopper Rebate = R % * Commission(Shopper rebate is R % of commission of fxg that they got)
    // Variable Fee = 40 % of Commission

    // Note: Commission is what FXG makes, then they pay following cuts in the order
    // i.Influencer(I %) + shoppers rebate(R %)
    // iii.Mavatar gets 40 % of what is left from i & ii.
    //   Outputs:
    // 1. Software fee
    // 2. Profit


    // FORMULA FOR CPG:

    // Software Fee = mavatar's 40% of Intermediate profit + Annual $10K fixed

    // Revenue = (Comission % * GMV)
    // Intermediate profit = Revenue - [(Influencer payout + Shopper rebate ) % * Revenue]
    // Final Profit = Intermediate Profit - (40 % * Intermediate Profit) - $10K

    // FORMULA FOR REST(MEDIA, MALLS, PROCUREMENT & AGENENCY):

    // GMV = captured by macart * GMV entered in step before

    // Software Fee = mavatar's 40% of Intermediate profit + Annual $10K fixed

    // Revenue = (Comission % * GMV)
    // Intermediate profit = Revenue - [(Influencer payout + Shopper rebate ) % * Revenue]
    // Final Profit = Intermediate Profit - (40 % * Intermediate Profit) - $10K

    if (this.businessTypeValue !== 'media') {
      gmvValue = this.calculateGMVmCartValues(mCartValue);
    }

    let revenue = 0;
    let variableFee = 0.4;

    revenue = (platformCommissionValue / 100) * gmvValue;
    let intermediateProfit = revenue - ((influencerPayoutValue + shopperRebateValue) / 100) * revenue;
    let softwareFee = (variableFee * intermediateProfit) - 10000;

    if (softwareFee < 0) {
      softwareFee *= -1;
    }

    softwareFee = Math.ceil(softwareFee);

    // Verify this part
    if (this.isAnnualBilling === false) {
      softwareFee /= 12;
    }

    let finalProfile = Math.ceil(intermediateProfit - softwareFee);
    this.approxProfit = finalProfile;
    this.profitString = numeral(this.approxProfit).format('$0a');
    this.priceRangeEmitter.emit(this.approxProfit);
    this.gmv = gmvValue;
  }

  switchBillingPlan() {
    this.isAnnualBilling = !this.isAnnualBilling;
    this.calculateGMVProfile();
  }

  getSelectedGMV(gmvID: number) {
    if (gmvID === 0) {
      if (this.businessTypeValue === "media") {
        return true;
      } else return false;
    } else {
      if (this.businessTypeValue === "media") {
        return false;
      } else return true;

    }
    return false;
  }

  toggleGreaterThan100B(e) {
    this.isGreateThan100B = e.target.checked;
    this.isGMVSliderDisabled = e.target.checked;
  }

  isGMVSliderDisabled() {
    return this.isGreateThan100B;
  }
  getGMVSliderMin() {
    let str: String = (numeral(this.gmvSlider.min).format('$0a'));
    str = str.toUpperCase();
    return str;
  }

  getGMVSliderMax() {
    let str: String = (numeral(this.gmvSlider.max).format('$0a'));
    str = str.toUpperCase();
    return str;
  }

}
