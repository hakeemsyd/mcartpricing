import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-categories-wizard',
  templateUrl: './categories-wizard.component.html',
  styleUrls: ['./categories-wizard.component.css',
    '../../pricing-wizard/pricing-wizard.component.css']
})
export class CategoriesWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;

  orders = [
    { id: 100, name: 'Athleta' },
    { id: 200, name: 'Banana Republic' },
    { id: 300, name: 'Bergdorf Goodman' },
    { id: 400, name: 'Betsey Johnson' },
    { id: 500, name: 'Bloomingdale\'s' },
  ];
  selectAllChecked: boolean = false;

  suggestedStores = [
    { id: 100, name: 'Kids' },
    { id: 101, name: 'Women' },

  ];

  ordersListWCheck = [];


  imageUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

  constructor(private formBuilder: FormBuilder) {

    this.orders.forEach(item => {
      this.ordersListWCheck.push({ ...item, isChecked: false as boolean });
    });
  }

  addCategory() { }

  ngOnInit() {
  }

  submitStores() {
    let checkedValues = [];
    this.ordersListWCheck.forEach(item => {
      if (item.isChecked === true) {
        checkedValues.push(item);
      }
    });
    this.parentForm.controls['category'].setValue(checkedValues);
  }

  onTriggerSelectAll() {
    this.selectAllChecked = this.ordersListWCheck.every(function (item: any) {
      return item.isChecked === true;
    });

    for (let i = 0; i < this.ordersListWCheck.length; i++) {
      this.ordersListWCheck[i].isChecked = !this.selectAllChecked;
    }
  }
}
