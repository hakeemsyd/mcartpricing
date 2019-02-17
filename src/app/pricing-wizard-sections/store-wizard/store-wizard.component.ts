import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-store-wizard',
  templateUrl: './store-wizard.component.html',
  styleUrls: ['./store-wizard.component.css',
    '../../pricing-wizard/pricing-wizard.component.css']
})
export class StoreWizardComponent implements OnInit {

  form: FormGroup;
  storeForm: FormGroup;
  orders = [
    { id: 100, name: 'Athleta' },
    { id: 200, name: 'Banana Republic' },
    { id: 300, name: 'Bergdorf Goodman' },
    { id: 400, name: 'Betsey Johnson' },
    { id: 500, name: 'Bloomingdale\'s' },
  ];

  suggestedStores = [
    { id: 100, name: 'Lululemon' },
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

  ngOnInit() {
  }

  addStore() {
    alert('store added');
  }

}
