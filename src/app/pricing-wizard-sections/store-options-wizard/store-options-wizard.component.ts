import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from 'src/app/mock_data/items';

@Component({
  selector: 'app-store-options-wizard',
  templateUrl: './store-options-wizard.component.html',
  styleUrls: ['./store-options-wizard.component.scss',
    '../../pricing-wizard/pricing-wizard.component.scss']
})
export class StoreOptionsWizardComponent implements OnInit, AfterViewInit {

  @Input() parentForm: FormGroup;
  wallCount = 0;
  options: Item[] = [
    {
      name: 'Shoppable Wall',
      value: 'shoppableWall',
      otherValue: 0,
    },
    {
      name: 'Advanced Analytics',
      value: 'advancedAnalytics',
    },
    {
      name: 'AI-based CRM',
      value: 'aiBasedCRM',
    },
  ];
  optionsWCheck = [];
  isWallsCheckboxDisabled = true;
  @Input() currStepNumber = 1;

  constructor() {
    this.options.forEach(item => {
      this.optionsWCheck.push({ ...item, isChecked: false as boolean });
    });
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

  test() {
    console.log('test');
  }

  increaseCount() {
    if (this.isWallsCheckboxDisabled === false) {
      this.wallCount++;
    }
  }
  decreaseCount() {
    if (this.isWallsCheckboxDisabled === false && this.wallCount > 0) {
      this.wallCount--;
    }
  }

  markChecked(index) {
    const checked = this.optionsWCheck[index].isChecked;
    this.optionsWCheck[index].isChecked = !checked;
    if (this.optionsWCheck[0].isChecked === false) {
      this.isWallsCheckboxDisabled = true;
    } else {
      this.isWallsCheckboxDisabled = false;
    }
  }

  onSubmitStoreOptions(): boolean {
    let checkedValues: Item[] = [];
    this.options[0].otherValue = this.wallCount;
    for (let i = 0; i < this.optionsWCheck.length; i++) {
      if (this.optionsWCheck[i].isChecked === true) {
        checkedValues.push(this.options[i]);
      }
    }
    this.parentForm.controls['storeOptions'].setValue(checkedValues);
    return true;
  }
}
