import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Item, BusinessOptions } from '../../mock_data/items';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-business-wizard',
  templateUrl: './business-wizard.component.html',
  styleUrls: ['./business-wizard.component.css', '../../pricing-wizard/pricing-wizard.component.css'],
})

export class BusinessWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;
  itemsList: Item[] = BusinessOptions;
  radioSelected = '';

  constructor() {
    this.itemsList = BusinessOptions;
    // Selecting Default Radio item here
  }
  ngOnInit() {
  }

  onRadioSelect(item: Item) {
    this.parentForm.controls['businessType'].setValue(item);
  }

}
