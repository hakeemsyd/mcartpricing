import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PricingWizardManagerService } from '../../marketplace.service';

@Component({
  selector: 'app-quote-personal-info',
  templateUrl: './quote-personal-info.component.html',
  styleUrls: ['./quote-personal-info.component.scss']
})
export class QuotePersonalInfoComponent implements OnInit {

  @Input() parentForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;

  constructor(public pricingWizardManagerService: PricingWizardManagerService) { }

  ngOnInit() {

  }
}
