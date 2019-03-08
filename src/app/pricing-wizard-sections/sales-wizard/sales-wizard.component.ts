import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales-wizard',
  templateUrl: './sales-wizard.component.html',
  styleUrls: ['./sales-wizard.component.css',
    '../../pricing-wizard/pricing-wizard.component.css']
})
export class SalesWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;
  salesChannel: number = 0;
  globalChannel: number = 0;
  submitted = false;

  salesCalculator: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  // convenience getter for easy access to form fields
  get f() { return this.salesCalculator.controls; }

  ngOnInit() {
    this.salesCalculator = this.formBuilder.group({
      salesChannel: [0 as number, Validators.required],
      globalChannel: [0 as number, Validators.required],
    });
  }

  submitSales() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.salesCalculator.invalid) {
      return;
    }

    (<FormGroup>this.parentForm.controls['sales']).controls['salesChannel'].patchValue(this.salesCalculator.controls['salesChannel'].value);
    (<FormGroup>this.parentForm.controls['sales']).controls['globalChannel'].patchValue(this.salesCalculator.controls['globalChannel'].value);
  }
}
