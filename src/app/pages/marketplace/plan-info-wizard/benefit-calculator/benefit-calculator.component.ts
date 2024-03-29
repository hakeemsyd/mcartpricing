import { Component, OnInit } from '@angular/core';
import { benefits as BENEFITS, IBenefit } from 'src/app/pages/marketplace/mock_data/benefit/benefit';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PricingWizardManagerService } from '../../marketplace.service';
import { Item } from '../../mock_data/items';
@Component({
  selector: 'app-benefit-calculator',
  templateUrl: './benefit-calculator.component.html',
  styleUrls: ['./benefit-calculator.component.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})

export class BenefitCalculatorComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;

  totalBenefits: IBenefit[] = BENEFITS;
  selectedBenefits: IBenefit;
  constructor(config: NgbCarouselConfig, private pricingWizardManagerService: PricingWizardManagerService) {
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
