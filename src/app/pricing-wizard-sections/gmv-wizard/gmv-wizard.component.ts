import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import numeral from 'numeral';
import { Item } from 'src/app/mock_data/items';
import { PricingWizardManagerService } from 'src/app/pricing-wizard-manager.service';

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

  @Input() currStepNumber = 0;
  currPlanTier = 1;

  variableFee: number = 200;
  approxProfit: number = 0;

  priceRange: String = 'TBD';
  profitString: String = 'TBD';
  greaterThan100B = false;

  businessTypeValue = "media";

  // isGMVSliderDisabled = false;

  mCart = {
    min: 0,
    max: 100,
    value: 100
  };

  platformCommission = {
    min: 0,
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
    max: 20,
    value: 5
  };

  gmvSlider = {
    min: 10000,
    max: 1000000000,
    value: 10000,
  };

  // gmv: number = 0;
  currPlan = 1;
  salesChanneValue = 0;
  globalChannelValues = 0;

  gmvType = 1;

  constructor(private pricingWizardManagerService: PricingWizardManagerService) {

  }

  ngOnInit() {
  }

  loadGMVVariables() {
    let businessType: Item = this.parentForm.controls['businessType'].value;
    this.businessTypeValue = businessType.value;

    let _gmv = 10000;

    if (this.businessTypeValue === 'media' || this.businessTypeValue === 'procurement' || this.businessTypeValue === 'agency') {
      this.gmvType = 1;
      // this.stepNo = 3;
    } else {
      this.gmvType = 2;
      this.salesChanneValue = (<FormGroup>this.parentForm.controls['sales']).controls['salesChannel'].value;
      this.globalChannelValues = (<FormGroup>this.parentForm.controls['sales']).controls['globalChannel'].value;
      _gmv = this.salesChanneValue * this.globalChannelValues * (this.mCart.value / 100);
      // this.stepNo = 4;
    }
    this.gmvSlider.value = Math.ceil(_gmv);
    this.calculateGMVProfile(null);
  }

  onGMVValueInput(event) {
    let value = event.currentTarget.value;
    if (value >= this.gmvSlider.min && value <= this.gmvSlider.max) {
      this.gmvSlider.value = value;
    } else if (value < this.gmvSlider.min) {
      this.gmvSlider.value = this.gmvSlider.min;
    } else if (value > this.gmvSlider.min) {
      this.gmvSlider.value = this.gmvSlider.max;
      this.greaterThan100B = true;
    }
    this.calculateGMVProfile(null);
  }


  onSubmitGMV() {
    (<FormGroup>this.parentForm.controls['gmv']).controls['gmv'].patchValue(this.gmvSlider.value);
    (<FormGroup>this.parentForm.controls['gmv']).controls['platformCommissionPercentage'].patchValue(this.platformCommission.value);
    (<FormGroup>this.parentForm.controls['gmv']).controls['influencerPayoutPercentage'].patchValue(this.influencerPayout.value);
    (<FormGroup>this.parentForm.controls['gmv']).controls['shopperRebatePercentage'].patchValue(this.shopperRebate.value);
  }

  // remove this function
  calculateGMVmCartValues(mCartValue) {
    let _gmv = 0;
    _gmv = this.salesChanneValue * this.globalChannelValues * (mCartValue / 100);
    _gmv = Math.ceil(_gmv);
    return _gmv;
  }



  onChangeGMV(value) {
    console.log(value);
  }

  calculatePlanTier(gmvValue) {
    if (gmvValue < 3000000) {
      this.currPlanTier = 1;
      this.pricingWizardManagerService.updatePlanTier(1);
      return;
    } else if (gmvValue < 500000000) {
      this.currPlanTier = 2;
      this.pricingWizardManagerService.updatePlanTier(2);
      return;
    } else if (gmvValue < 5000000000) {
      this.currPlanTier = 3;
      this.pricingWizardManagerService.updatePlanTier(3);
      return;
    } else {
      this.currPlanTier = 4;
      this.pricingWizardManagerService.updatePlanTier(4);
      return;
    }
  }

  calculateGMVProfile(callingSource) {

    let gmvValue = this.gmvSlider.value;
    let mCartValue = this.mCart.value;
    let platformCommissionValue = this.platformCommission.value;
    let influencerPayoutValue = this.influencerPayout.value;
    let shopperRebateValue = this.shopperRebate.value;

    if (callingSource !== null && callingSource !== undefined) {
      if (callingSource.currentTarget && callingSource.currentTarget.id === 'gmvInput') {
        gmvValue = parseInt(callingSource.currentTarget.value);
      }

      if (callingSource.source) {
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

    if (this.gmvType === 2) {
      gmvValue = this.calculateGMVmCartValues(mCartValue);
      this.gmvSlider.value = gmvValue;
    }

    this.calculatePlanTier(this.gmvSlider.value);
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

    this.priceRange = numeral(softwareFee).format('$0a');
    this.priceRangeEmitter.emit(parseInt(this.priceRange.toString()));

    let finalProfile = Math.ceil(intermediateProfit - softwareFee);
    this.approxProfit = finalProfile;
    this.profitString = numeral(this.approxProfit).format('$0a');
    this.approxProfitEmitter.emit(this.approxProfit);
    // this.gmv = gmvValue;
  }

  switchBillingPlan() {
    this.isAnnualBilling = !this.isAnnualBilling;
    this.calculateGMVProfile(null);
  }

  getSelectedGMV(gmvID: number) {
    if (gmvID === this.gmvType) {
      return true;
    } else {
      return false;
    }
  }

  toggleGreaterThan100B(e) {
    this.greaterThan100B = e.target.checked;
    if (e.target.checked) {
      this.calculatePlanTier(100000000000);
    } else {
      this.calculatePlanTier(this.gmvSlider.value);
    }
  }

  checkIfGreateThan100B() {
    return this.greaterThan100B;
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

  getGMVThumbValue(value: number | null): String {
    if (!value) {
      return '$' + 0;
    }
    if (value) {
      let str: String = (numeral(value).format('$0a'));
      str = str.toUpperCase();
      return str;
    }
  }

  getValueWithPercentage(value: number | null): String {
    if (!value) {
      return 0 + '%';
    }
    if (value) {
      return value + '%';
    }
  }
}
