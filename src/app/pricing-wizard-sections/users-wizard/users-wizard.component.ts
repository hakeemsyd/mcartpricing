import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-wizard',
  templateUrl: './users-wizard.component.html',
  styleUrls: ['./users-wizard.component.css',
    '../../pricing-wizard/pricing-wizard.component.css']
})
export class UsersWizardComponent implements OnInit {

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      usersPlan: ['plan1', Validators.required]
    });
  }

  // selected: 'please select';
  // items = [
  //   { title: "Item 1", checked: false },
  //   { title: "Item 2", checked: true },
  //   { title: "Item 3", checked: false },
  // ];
  // updateSelection (position, itens, title) {
  //   // alert('a')
  //   console.log(position, itens, title);
  //   itens.forEach((subscription, index) => {
  //     if (position != index) {
  //       subscription.checked = false;
  //     }
  //     this.selected = title;
  //   });
  // }

  ngOnInit() {
  }

  // updateSelection(position, entities) {
  //   entities.forEach(obj => function (obj, index) {
  //     if (position !== index) {
  //       obj.checked = false;
  //     }
  //   });
  // }

  isSelectedGroup(name: String): boolean {
    if (this.form.value.usersPlan === name) {
      return true;
    } else {
      return false;
    }
  }
}
