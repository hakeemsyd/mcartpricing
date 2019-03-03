import { Component, OnInit, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { Item, BusinessOptions } from '../../mock_data/items';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-business-wizard',
  templateUrl: './business-wizard.component.html',
  styleUrls: ['./business-wizard.component.css', '../../pricing-wizard/pricing-wizard.component.css'],
})

export class BusinessWizardComponent implements OnInit, AfterViewInit {

  @Input() parentForm: FormGroup;
  itemsList: Item[] = BusinessOptions;
  radioSelected = '';

  constructor() {
    this.itemsList = BusinessOptions;
    this.radioSelected = this.itemsList[0].value;
    // Selecting Default Radio item here
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.parentForm.controls['businessType'].setValue(this.itemsList[0]);
  }

  onRadioSelect(item: Item) {
    this.parentForm.controls['businessType'].setValue(item);
  }

}
