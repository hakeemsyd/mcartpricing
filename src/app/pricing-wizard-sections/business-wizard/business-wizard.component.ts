import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Item, BusinessOptions } from '../../mock_data/items';
@Component({
  selector: 'app-business-wizard',
  templateUrl: './business-wizard.component.html',
  styleUrls: ['./business-wizard.component.css', '../../pricing-wizard/pricing-wizard.component.css'],
})

export class BusinessWizardComponent implements OnInit {

  title = 'app';
  radioSel: any;
  radioSelected: string;
  radioSelectedString: string;
  itemsList: Item[] = BusinessOptions;

  constructor() {
    this.itemsList = BusinessOptions;
    // Selecting Default Radio item here
    this.radioSelected = 'item_3';
    this.getSelecteditem();
  }

  // Get row item from array
  getSelecteditem() {
    this.radioSel = this.itemsList.find(Item => Item.value === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }
  // Radio Change Event
  onItemChange(item) {
    this.getSelecteditem();
  }

  ngOnInit() {
  }

}
