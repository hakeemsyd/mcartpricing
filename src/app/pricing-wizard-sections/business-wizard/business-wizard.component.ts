import { Component, OnInit, ViewEncapsulation, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Item, BusinessOptions } from '../../mock_data/items';
import { FormGroup } from '@angular/forms';
import { PricingWizardManagerService } from 'src/app/pricing-wizard-manager.service';
@Component({
  selector: 'app-business-wizard',
  templateUrl: './business-wizard.component.html',
  styleUrls: ['./business-wizard.component.css', '../../pricing-wizard/pricing-wizard.component.css'],
})

export class BusinessWizardComponent implements OnInit, AfterViewInit {

  @Input() parentForm: FormGroup;
  itemsList: Item[] = BusinessOptions;
  radioSelected = '';
  otherValue = '';
  selectedItem;
  @ViewChild('otherInputBox') otherInputBox;
  @Output() valueChange = new EventEmitter();

  @Input() currStepNumber = 1;

  constructor(private pricingWizardManagerService: PricingWizardManagerService) {
    this.itemsList = BusinessOptions;
    this.radioSelected = this.itemsList[0].name;
    // Selecting Default Radio item here
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.parentForm.controls['businessType'].setValue(this.itemsList[0]);
    this.otherInputBox.nativeElement.disabled = true;
  }

  onRadioSelect(item: Item) {
    if (item.value === 'other') {
      this.otherInputBox.nativeElement.disabled = false;
      item.otherValue = this.otherValue;
    } else {
      this.otherInputBox.nativeElement.disabled = true;
    }
    this.selectedItem = item;
    this.parentForm.controls['businessType'].setValue(item);
    this.pricingWizardManagerService.changeSelectedBusiness(item);
    // TODO: remove this
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
