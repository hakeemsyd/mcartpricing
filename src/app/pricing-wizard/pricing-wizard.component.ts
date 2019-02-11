import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-wizard',
  templateUrl: './pricing-wizard.component.html',
  styleUrls: ['./pricing-wizard.component.css']
})
export class PricingWizardComponent implements OnInit {

  ngOnInit() {
  }

  alert1(arg) {
    alert(arg);
  }
}
