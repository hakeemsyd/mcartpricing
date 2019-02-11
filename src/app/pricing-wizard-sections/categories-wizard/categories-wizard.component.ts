import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-categories-wizard',
  templateUrl: './categories-wizard.component.html',
  styleUrls: ['./categories-wizard.component.css']
})
export class CategoriesWizardComponent implements OnInit {

  form: FormGroup;
  storeForm: FormGroup;
  orders = [
    { id: 100, name: 'order 1' },
    { id: 200, name: 'order 2' },
    { id: 300, name: 'order 3' },
    { id: 400, name: 'order 4' },
    { id: -1, name: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' }
  ];

  suggestedStores = [
    { id: 100, name: 'order 1' },
  ];

  imageUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

  constructor(private formBuilder: FormBuilder) {
    // Create a new array with a form control for each order
    const controls = this.orders.map(c => new FormControl(false));
    controls[0].setValue(true); // Set the first checkbox to true (checked)

    this.form = this.formBuilder.group({
      orders: new FormArray(controls)
    });

    // Create a new array with a form control for each order
    const storeControl = this.suggestedStores.map(c => new FormControl(false));
    storeControl[0].setValue(true); // Set the first checkbox to true (checked)

    this.storeForm = this.formBuilder.group({
      suggestedStores: new FormArray(storeControl)
    });
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.orders[i].id : null)
      .filter(v => v !== null);

    console.log(selectedOrderIds);
  }

  addCategory(){}

  ngOnInit() {
  }

}
