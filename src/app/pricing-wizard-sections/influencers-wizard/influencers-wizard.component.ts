import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-influencers-wizard',
  templateUrl: './influencers-wizard.component.html',
  styleUrls: ['./influencers-wizard.component.css']
})
export class InfluencersWizardComponent implements OnInit {

  mCartsSelected = "500";

  countryForm: FormGroup;
  countries = ['USA', 'Canada', 'Uk'];

  influencersList = [
    {
      name: 'waleed',
      img: 'https://connect-prd-cdn.unity.com/a3fd7b05-3b7c-4a24-a725-083505a5c30e',
      id: 1,
    },
    {
      name: 'farooqi',
      img: 'https://lh3.googleusercontent.com/a-/AAuE7mA1_9SpAPEHY-kBPrc_Z_-q_U0l3kn9dYc0LUGU2w=s640-rw-il',
      id: 2,
    }
  ];

  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.countryForm = this.fb.group({
      countryControl: ['Canada']
    });
  }

}
