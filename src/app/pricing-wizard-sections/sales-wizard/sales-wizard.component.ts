import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/mock_data/items';

@Component({
  selector: 'app-sales-wizard',
  templateUrl: './sales-wizard.component.html',
  styleUrls: ['./sales-wizard.component.css',
    '../../pricing-wizard/pricing-wizard.component.css']
})
export class SalesWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;
  salesChannel: number = 1;
  globalChannel: number = 10000;
  submitted = false;

  salesMin = 1;
  globalMin = 10000;

  salesCalculator: FormGroup;
  businessType = 1;
  heading1 = '';
  heading2 = '';
  @Input() currStepNumber = 0;

  constructor(private formBuilder: FormBuilder) {
  }

  // convenience getter for easy access to form fields
  get f() { return this.salesCalculator.controls; }

  ngOnInit() {
    this.salesCalculator = this.formBuilder.group({
      salesChannel: [0 as number, [Validators.required,  Validators.min(1000)]],
      globalChannel: [0 as number, [Validators.required, Validators.min(1)]],
    });
  }

  submitSales(): boolean {
    this.submitted = true;

    let error = this.salesCalculator.controls.globalChannel.errors;

    // stop here if form is invalid
    if (this.salesCalculator.invalid) {
      return false;
    }
    (<FormGroup>this.parentForm.controls['sales']).controls['salesChannel'].patchValue(this.salesCalculator.controls['salesChannel'].value);
    (<FormGroup>this.parentForm.controls['sales']).controls['globalChannel'].patchValue(this.salesCalculator.controls['globalChannel'].value);
    // (<FormGroup>this.parentForm.controls['sales']).controls['salesChannel'].patchValue(this.salesChannel);
    // (<FormGroup>this.parentForm.controls['sales']).controls['globalChannel'].patchValue(this.globalChannel);
    return true;
  }

  onSalesChannelInput(event) {
    const value = event.currentTarget.value;
    if (value >= this.salesMin) {
      this.salesChannel = value;
    } else if (value < this.salesMin) {
      this.salesChannel = this.salesMin;
    }
  }
  onGlobalChannelInput(event) {
    const value = event.currentTarget.value;
    if (value >= this.globalMin) {
      this.globalChannel = value;
    } else if (value < this.globalMin) {
      this.globalChannel = this.globalMin;
    }
  }

  loadSalesVariables() {
    const businessType: Item = this.parentForm.controls['businessType'].value;
    if (businessType.value === 'malls') {
      this.businessType = 2;
    } else {
      this.businessType = 1;
    }

    if (this.businessType === 1) {
      this.heading1 = '1.How many sales channel do you have?';
      this.heading2 = '2.How much is your global sales?';
    } else {
      this.heading1 = '1.How much is your square footage?';
      this.heading2 = '2.How much is your sales/square foot?';
    }
  }
}
