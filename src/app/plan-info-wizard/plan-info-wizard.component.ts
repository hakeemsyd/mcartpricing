import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plan-info-wizard',
  templateUrl: './plan-info-wizard.component.html',
  styleUrls: ['./plan-info-wizard.component.css']
})
export class PlanInfoWizardComponent implements OnInit {

  @Input() currPriceWizardStep: number;

  constructor() { }

  ngOnInit() {
  }

}
