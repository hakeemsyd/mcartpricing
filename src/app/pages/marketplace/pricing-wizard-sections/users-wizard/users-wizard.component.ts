import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PricingWizardManagerService } from '../../marketplace.service';

@Component({
  selector: 'app-users-wizard',
  templateUrl: './users-wizard.component.html',
  styleUrls: ['./users-wizard.component.scss',
    '../../pricing-wizard/pricing-wizard.component.scss']
})
export class UsersWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;

  form: FormGroup;

  constructor(fb: FormBuilder, private pricingWizardManagerService: PricingWizardManagerService) {
    this.form = fb.group({
      usersPlan: ['plan1', Validators.required]
    });
  }
  @Input() currStepNumber = 1;

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
    if (this.pricingWizardManagerService.usersPlan.value === name) {
      return true;
    } else {
      return false;
    }
  }
  onSubmitUsers() {
    this.pricingWizardManagerService.usersPlan.setValue(this.form.value.usersPlan);
    this.parentForm.controls['usersPlan'].setValue(this.form.value.usersPlan);
  }
}
