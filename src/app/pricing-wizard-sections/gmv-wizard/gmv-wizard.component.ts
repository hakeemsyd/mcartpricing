import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-gmv-wizard',
  templateUrl: './gmv-wizard.component.html',
  styleUrls: ['./gmv-wizard.component.css',
    '../../pricing-wizard/pricing-wizard.component.css']
})
export class GmvWizardComponent implements OnInit {

  captureValue: number = 50;
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
  platformValue: number = 50;
  platformOptions: Options = {
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
  influencerValue: number = 50;
  influencerOptions: Options = {
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

  rebateValue: number = 50;
  rebateOptions: Options = {
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

  gmv$: number = 70000;

  constructor() { }

  ngOnInit() {
  }

}
