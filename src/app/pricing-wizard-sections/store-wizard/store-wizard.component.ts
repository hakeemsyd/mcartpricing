import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-store-wizard',
  templateUrl: './store-wizard.component.html',
  styleUrls: ['./store-wizard.component.scss',
    '../../pricing-wizard/pricing-wizard.component.scss']
})
export class StoreWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;

  form: FormGroup;
  storeForm: FormGroup;
  orders = [
    { id: 100, name: 'Athleta' },
    { id: 200, name: 'Banana Republic' },
    { id: 300, name: 'Bergdorf Goodman' },
    { id: 400, name: 'Betsey Johnson' },
    { id: 500, name: 'Bloomingdale\'s' },
  ];
  ordersListWCheck = [];
  selectAllChecked: boolean = false;
  suggestedStores = [
    { id: 100, name: 'Lululemon' },
  ];

  imageUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
  @Input() currStepNumber = 1;

  constructor(private formBuilder: FormBuilder) {

    this.orders.forEach(item => {
      this.ordersListWCheck.push({ ...item, isChecked: false as boolean });
    });
  }
  ngOnInit() {
  }

  submitStores() {
    let checkedValues = [];
    this.ordersListWCheck.forEach(item => {
      if (item.isChecked === true) {
        checkedValues.push(item);
      }
    });
    this.parentForm.controls['selectedStores'].setValue(checkedValues);
  }

  deselectAllStores() {

  }

  selectAllStores() {

  }

  onTriggerSelectAll() {
    this.selectAllChecked = this.ordersListWCheck.every(function (item: any) {
      return item.isChecked === true;
    });

    for (let i = 0; i < this.ordersListWCheck.length; i++) {
      this.ordersListWCheck[i].isChecked = !this.selectAllChecked;
    }
    this.selectAllChecked = !this.selectAllChecked;

  }
}
