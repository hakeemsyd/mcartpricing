import { Component, OnInit, ViewEncapsulation, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Item, BusinessOptions } from '../../mock_data/items';
import { FormGroup } from '@angular/forms';
import { PricingWizardManagerService } from '../../marketplace.service';

@Component({
  selector: 'app-business-wizard',
  templateUrl: './business-wizard.component.html',
  styleUrls: ['./business-wizard.component.scss', '../../pricing-wizard/pricing-wizard.component.scss'],
})

export class BusinessWizardComponent implements OnInit, AfterViewInit {

  @Input() parentForm: FormGroup;
  itemsList: Item[] = BusinessOptions;
  radioSelected = '';
  otherValue = '';
  selectedItem;
  @Output() valueChange = new EventEmitter();

  @Input() currStepNumber = 1;

  constructor(private pricingWizardManagerService: PricingWizardManagerService) {
    this.itemsList = BusinessOptions;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.onRadioSelect(this.itemsList[0]);
  }

  onRadioSelect(item: Item) {
    this.selectedItem = item;
    this.parentForm.controls['businessType'].setValue(item);
    this.pricingWizardManagerService.changeSelectedBusiness(item);
    this.valueChange.emit();
  }

  onSubmitBusiness(): boolean {
    if (this.selectedItem) {
      let item = this.selectedItem;
      item.otherValue = this.otherValue;
      this.parentForm.controls['businessType'].setValue(item);
      return true;
    }
    return false;
  }

  checkIfItemIsOthers(item: Item): boolean {
    if (item.value === 'other') {
      return true;
    } else {
      return false;
    }
  }

  isOtherCheckboxSelected(): boolean {
    if (this.radioSelected === 'other') {
      return true;
    } else {
      return false;
    }
  }
}
