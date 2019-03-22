import { Component, OnInit, Input } from '@angular/core';
import { Item, ObjectivesOptions } from '../../mock_data/items';
import { FormGroup } from '@angular/forms';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-objective-wizard',
  templateUrl: './objective-wizard.component.html',
  styleUrls: ['./objective-wizard.component.scss',
    '../../pricing-wizard/pricing-wizard.component.scss']
})
export class ObjectiveWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;
  itemsList: Array<any> = [];
  @Input() currStepNumber = 1;

  constructor() {
    const tempArr = ObjectivesOptions;
    tempArr.forEach(item => {
      this.itemsList.push({ ...item, isChecked: false as boolean });
    });
  }

  // Get row item from array
  ngOnInit() {
  }

  onSelectCheckbox(item) {

  }

  submitObjectives() {
    let checkedValues = [];
    this.itemsList.forEach(item => {
      if (item.isChecked === true) {
        checkedValues.push(item);
      }
    });
    this.parentForm.controls['objectives'].setValue(checkedValues);
  }
}
