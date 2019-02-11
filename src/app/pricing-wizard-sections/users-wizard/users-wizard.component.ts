import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-wizard',
  templateUrl: './users-wizard.component.html',
  styleUrls: ['./users-wizard.component.css']
})
export class UsersWizardComponent implements OnInit {

  selected: 'please select';
  itens = [
    { title: "Item 1", checked: false },
    { title: "Item 2", checked: true },
    { title: "Item 3", checked: false },
  ];
  updateSelection (position, itens, title) {
    // alert('a')
    itens.forEach((subscription, index) => {
      if (position != index) {
        subscription.checked = false;
      }
      this.selected = title;
    });
  }
  constructor() { }

  ngOnInit() {
  }

  // updateSelection(position, entities) {
  //   entities.forEach(obj => function (obj, index) {
  //     if (position !== index) {
  //       obj.checked = false;
  //     }
  //   });
  // }
}
