import { Component, OnInit } from '@angular/core';
import { benefits as BENEFITS, IBenefit, benefits } from 'src/app/mock_data/benefit/benefit';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-benefit-calculator',
  templateUrl: './benefit-calculator.component.html',
  styleUrls: ['./benefit-calculator.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class BenefitCalculatorComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);



  benefits: IBenefit = BENEFITS[0];
  constructor(config: NgbCarouselConfig) {
    console.log('benefits', this.benefits);
    // customize default values of carousels used by this component tree
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
  }

  ngOnInit() {
  }

  getImageName(name) {
    console.log('name', name);
    if (name === 1) {
      return 'https://www.sign.nl/wp-content/uploads/2016/10/mcart-Large.jpg';
    }
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDIIqgzItFlNkxALQlnyhSjgK8bmM4Dpj8U1vTn9aFg12Gj6uggw';
  }

  getIconName(name) {
    return 'https://www.sibon.nl/wp-content/uploads/2016/06/Logo-McArt.jpg';
  }
}
