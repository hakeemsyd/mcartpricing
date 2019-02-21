import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sales-wizard',
  templateUrl: './sales-wizard.component.html',
  styleUrls: ['./sales-wizard.component.css',
    '../../pricing-wizard/pricing-wizard.component.css']
})
export class SalesWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;
  salesChannel: String = '';
  globalChannel: String = '';

  constructor() { }

  ngOnInit() {
  }

  onSubmitSalesAnswer() {
    const control = this.parentForm.controls['sales'];

  }

  onSalesChannelChange(value) {
    (<FormGroup>this.parentForm.controls['sales']).controls['salesChannel'].patchValue(value);
  }

  onGlobalChannelChange(value: String) {
    (<FormGroup>this.parentForm.controls['sales']).controls['globalChannel'].patchValue(value);
  }
}
