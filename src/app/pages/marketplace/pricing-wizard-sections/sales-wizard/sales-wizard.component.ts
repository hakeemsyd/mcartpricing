import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PricingWizardManagerService } from '../../marketplace.service';

@Component({
  selector: 'app-sales-wizard',
  templateUrl: './sales-wizard.component.html',
  styleUrls: ['./sales-wizard.component.scss',
    '../../pricing-wizard/pricing-wizard.component.scss']
})
export class SalesWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;
  submitted = false;

  salesMin = 1;
  globalMin = 10000;

  salesCalculator: FormGroup;
  businessType = 1;
  heading1 = '';
  heading2 = '';
  @Input() currStepNumber = 0;

  constructor(private formBuilder: FormBuilder,
    public pricingWizardManagerService: PricingWizardManagerService) {
  }

  // convenience getter for easy access to form fields
  get f() { return this.salesCalculator.controls; }

  ngOnInit() {
    this.salesCalculator = this.formBuilder.group({
      salesChannel: [0 as number, [Validators.required, Validators.min(1)]],
      globalChannel: [0 as number, [Validators.required, Validators.min(1)]],
    });
  }

  submitSales() {
    this.submitted = true;
  }

  loadSalesVariables() {
    const businessType = this.pricingWizardManagerService.businessType.value;
    if (businessType.value === 'malls') {
      this.heading1 = '1.How much is your square footage?';
      this.heading2 = '2.How much is your sales/square foot?';
    } else {
      this.heading1 = '1.How many sales channel do you have?';
      this.heading2 = '2.How much is your global sales?';
    }
  }
}
