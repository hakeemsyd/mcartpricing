import { Component, OnInit } from '@angular/core';
import { benefits as BENEFITS, IBenefit, benefits } from 'src/app/mock_data/benefit/benefit';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { PricingWizardManagerService } from 'src/app/pricing-wizard-manager.service';
import { Item } from 'src/app/mock_data/items';
@Component({
  selector: 'app-benefit-calculator',
  templateUrl: './benefit-calculator.component.html',
  styleUrls: ['./benefit-calculator.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})

export class BenefitCalculatorComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;

  totalBenefits: IBenefit[] = BENEFITS;
  selectedBenefits: IBenefit;
  constructor(config: NgbCarouselConfig, private pricingWizardManagerService: PricingWizardManagerService) {
    console.log('benefits', this.benefits);
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    this.selectedBenefits = this.totalBenefits[0];

    this.pricingWizardManagerService.onChangeSelectedBusiness.subscribe(
      (selectedBusiness: Item) => {
        this.changeBenefitCategory(selectedBusiness);
      });
  }

  ngOnInit() {
  }

  changeBenefitCategory(benefitItem: Item) {
    let index: number = -1;
    index = this.totalBenefits.findIndex(x => x.value === benefitItem.value);
    this.selectedBenefits = this.totalBenefits[index];
  }

  getImageName(name) {
    return `../../../assets/images/${name}`;
  }

  getIconName(name) {
    return `../../../assets/icons/${name}`;
  }

  isImageArray(image) {
    if (image && image.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  scrollUpToForm() {
    this.pricingWizardManagerService.scrollUpToForm();
  }
}
