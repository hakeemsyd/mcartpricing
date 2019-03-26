import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { influencersListJSON } from '../../mock_data/influencers';
import { PricingWizardManagerService } from '../../marketplace.service';

@Component({
  selector: 'app-influencers-wizard',
  templateUrl: './influencers-wizard.component.html',
  styleUrls: ['./influencers-wizard.component.scss',
    '../../pricing-wizard/pricing-wizard.component.scss']
})
export class InfluencersWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;
  countryForm: FormGroup; // remove it
  countries = ['USA', 'Canada', 'Uk'];
  interests = [{ name: 'Interests' }];
  currInterest = this.interests[0];

  mCartArr = [500, 1000, 5000, 10000];
  currMCartVal = this.mCartArr[0];

  followersArr = [500, 1000, 5000, 10000];
  currFollowersVal = this.followersArr[0];

  tempInfluencers = influencersListJSON;
  influencersListWChecks = [];
  @Input() currStepNumber = 1;

  // [
  //   {
  //     name: 'Blake Benson',
  //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSum9a9eBrxWLQ6JOPTCFIvlN4WFyi4K1wwTEeeTODwPsUCLR_SvA',
  //     id: 1,
  //     isChecked: false,
  //   },
  //   {
  //     name: 'Merve Kaya',
  //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4XtuSS9gqQHhE3AvWZd7uT1nH0I8cTrkKoYGRaWpAFn6HRmIO1Q',
  //     id: 2,
  //     isChecked: false,
  //   },
  //   {
  //     name: 'David Michael',
  //     img: 'https://www.dogrulukpayi.com/image/actor/binali-yildirim/orig.png',
  //     id: 3,
  //     isChecked: true,
  //   },
  //   {
  //     name: 'Ahmet Bey',
  //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGA_Rm90mfQazbQM9_5BuhYrftDiOf1Fv-RyQCRwM-zVUYGz4g3A',
  //     id: 4,
  //     isChecked: false,
  //   },
  //   {
  //     name: 'Augusta Fitzgerald',
  //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoOilLqp99d98H-su5a4UVL_tZX5zy7iY5gxla2QwQcptH8XuCHw',
  //     id: 5,
  //     isChecked: false,
  //   },
  //   {
  //     name: 'Savas Mart',
  //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtis6fD8BtlhzgrWUYLeury-EmDsRpppkVtkou5RyRSBrfJIJH',
  //     id: 6,
  //     isChecked: false,
  //   },
  //   {
  //     name: 'Chester Carson',
  //     img: 'https://foto.sondakika.com/haber/2017/10/26/izmir-de-feto-sanigi-avukat-kilic-in-dosyasi-10175393_o.jpg',
  //     id: 7,
  //     isChecked: false,
  //   },
  //   {
  //     name: 'Brent Elliot',
  //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM6uciOQmx2kowfFaYviOr8Ploj7GJGH1EIZsHdpWk_AUEImWn',
  //     id: 8,
  //     isChecked: false,
  //   },
  //   {
  //     name: 'Jacqueline Persons',
  //     img: 'https://www.icmp.int/wp-content/uploads/2012/02/icmp-commissioner-hm-queen-noor-of-jordan.jpg',
  //     id: 9,
  //     isChecked: false,
  //   },
  //   {
  //     name: 'Gordon Persons',
  //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUukX06jIx-u-bqqeQp712tm10YWo6d9azj5vvyXEQgzKqmYR',
  //     id: 10,
  //     isChecked: false,
  //   },

  // ];

  constructor(private fb: FormBuilder, private pricingWizardManagerService: PricingWizardManagerService) {
    this.tempInfluencers.forEach(item => {
      this.influencersListWChecks.push({ ...item, isChecked: false as boolean });
    });
  }

  ngOnInit() {
    this.countryForm = this.fb.group({
      countryControl: ['Canada']
    });
  }

  onSelectMCart(val: number) {
    this.currMCartVal = val;
  }
  onSelectInterest(val) {
    this.currInterest = val;
  }

  onSelectFollowers(val) {
    this.currFollowersVal = val;
  }

  submitInfluencers() {
    let checkedValues = [];
    this.influencersListWChecks.forEach(item => {
      if (item.isChecked === true) {
        checkedValues.push(item);
      }
    });
    this.pricingWizardManagerService.influencers.setValue(checkedValues);
  }

}
