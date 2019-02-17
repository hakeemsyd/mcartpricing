import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-gmv-wizard',
  templateUrl: './gmv-wizard.component.html',
  styleUrls: ['./gmv-wizard.component.css',
    '../../pricing-wizard/pricing-wizard.component.css']
})
export class GmvWizardComponent implements OnInit {

  captureValue: number = 56;
  captureOptions: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      console.log(label);
      switch (label) {
        case LabelType.Ceil:
          return '';
        case LabelType.Floor:
          return '';
        default:
          return value.toString();
      }
    }
  };
  platformValue: number = 32;
  platformOptions: Options = {
    floor: 0,
    ceil: 40,
    translate: (value: number, label: LabelType): string => {
      console.log(label);
      switch (label) {
        case LabelType.Ceil:
          return '';
        case LabelType.Floor:
          return '';
        default:
          return value.toString();
      }
    }
  };
  influencerValue: number = 37;
  influencerOptions: Options = {
    floor: 30,
    ceil: 50,
    translate: (value: number, label: LabelType): string => {
      console.log(label);
      switch (label) {
        case LabelType.Ceil:
          return '';
        case LabelType.Floor:
          return '';
        default:
          return value.toString();
      }
    }
  };

  rebateValue: number = 9;
  rebateOptions: Options = {
    floor: 5,
    ceil: 20,
    translate: (value: number, label: LabelType): string => {
      console.log(label);
      switch (label) {
        case LabelType.Ceil:
          return '';
        case LabelType.Floor:
          return '';
        default:
          return value.toString();
      }
    }
  };

  gmv$: number = 70000;

  constructor() { }

  ngOnInit() {
  }

}
