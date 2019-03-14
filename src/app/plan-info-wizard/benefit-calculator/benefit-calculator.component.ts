import { Component, OnInit } from '@angular/core';
import { benefits as BENEFITS, IBenefit, benefits } from 'src/app/mock_data/benefit/benefit';

@Component({
  selector: 'app-benefit-calculator',
  templateUrl: './benefit-calculator.component.html',
  styleUrls: ['./benefit-calculator.component.css']
})
export class BenefitCalculatorComponent implements OnInit {

  benefits: IBenefit = BENEFITS[0];
  constructor() {
    console.log('benefits', this.benefits);
  }

  ngOnInit() {
  }

  getImageName(name) {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDIIqgzItFlNkxALQlnyhSjgK8bmM4Dpj8U1vTn9aFg12Gj6uggw';
  }

  getIconName(name) {
    return 'https://www.sibon.nl/wp-content/uploads/2016/06/Logo-McArt.jpg';
  }
}
