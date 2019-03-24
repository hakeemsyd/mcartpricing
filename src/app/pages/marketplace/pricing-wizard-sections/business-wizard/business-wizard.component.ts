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
  }
}
