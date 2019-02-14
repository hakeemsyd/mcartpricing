import { Component, OnInit } from '@angular/core';
import { Item, ObjectivesOptions } from '../../mock_data/items';

@Component({
  selector: 'app-objective-wizard',
  templateUrl: './objective-wizard.component.html',
  styleUrls: ['./objective-wizard.component.css',
  '../../pricing-wizard/pricing-wizard.component.css']
})
export class ObjectiveWizardComponent implements OnInit {

  itemsList: Item[] = ObjectivesOptions;

  constructor() {
    this.itemsList = ObjectivesOptions;
    // Selecting Default Radio item here
  }

  // Get row item from array
  ngOnInit() {
  }

}
