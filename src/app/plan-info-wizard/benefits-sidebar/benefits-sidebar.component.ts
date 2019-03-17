import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { IBenefitItem } from 'src/app/mock_data/benefit/benefit';

@Component({
  selector: 'app-benefits-sidebar',
  templateUrl: './benefits-sidebar.component.html',
  styleUrls: ['./benefits-sidebar.component.css',
    '../plan-info-wizard.component.css']
})
export class BenefitsSidebarComponent implements OnInit {


  @ViewChildren('card') cardComponents: QueryList<ElementRef>;
  @ViewChildren('infoButton') infoButtonComponents: QueryList<ElementRef>;

  @ViewChild('infoButton1') infoButton1: ElementRef;
  @ViewChild('infoButton2') infoButton2: ElementRef;
  @ViewChild('infoButton3') infoButton3: ElementRef;
  @ViewChild('infoButton4') infoButton4: ElementRef;

  @ViewChild('card1') card1: ElementRef;
  @ViewChild('card2') card2: ElementRef;
  @ViewChild('card3') card3: ElementRef;
  @ViewChild('card4') card4: ElementRef;

  currentActiveInforCard = -1;

  selectedBenefits: IBenefitItem[] = [{
    heading: 'Content Monetization',
    icon: 'content-monetization.png',
    description: 'Tap into the vast potential of omnichannel commerce. mCart lets you establish your own omnichannel marketplaces and partnerships with top retailers to monetize the digital, video and print content you’re already creating by making it shop-able. See what kind of revenue you should expect based on current site traffic.',
    mainImage: [
      'marketplace-revenue-site-traffic-table.png',
      'contextual-commerce-impression-purchase.png',
    ],
  },
  {
    heading: 'User Acquisition',
    icon: 'user-acquisition.png',
    description: 'In mCart marketplaces, content sell products and products sell content! Every mCart is linked to original content . mCart marketplaces converge media and commerce, centralizing your entire content base from social and/or mainstream in one location.',
    mainImage: [
      'miss-arizona-maddie-rose-holler-magzine-cover.png',
      'jewelery-cart-menu.png',
    ],
  },
  {
    heading: 'Advertiser Retention',
    icon: 'advertiser-retention.png',
    description: 'Use mCart to track every banner, billboard, commercial, infomercial, and advertisement campaign to sales dollars. Keep your advertisers on board by proving the ROI of their TV, print, and digital media advertising.',
    mainImage: [
      'dashboard-influencers-productivity-report-chart.png',
      'dashboard-influencers-productivity-report-chart-zoom.png'
    ],
  },
  {
    heading: 'Managing An External Salesforce with No Back Office Efforts',
    icon: 'managing-external-salesforce.png',
    description: 'Your original content is influencing articles, blogs, and social posts, and their creators can commercially exploit it without giving you a penny. mCart allows those creators to be part of your team and get paid without any back-office accounting through a digital wallet on blockchain.',
    mainImage: [
      'contextual-commerce.png',
      'featured-mcarts-products-tables',
    ],
  },
  ];

  constructor() { }

  ngOnInit() {
  }

  getIconName(benefitItem) {
    return `../../../assets/icons/${benefitItem}`;
  }


  onPressInfo(cardNum) {
    this.currentActiveInforCard = cardNum;
    console.log(cardNum);
  }

  onCloseCardRequest() {
    this.currentActiveInforCard = -1;
  }

  showInfoPanel(num) {
    if (this.currentActiveInforCard === num) {
      return true;
    }
    return false;
  }

  getIDNum(id: string): number {
    const lastChar = id[id.length - 1];
    const lastCharNum = parseInt(lastChar);
    return lastCharNum;
  }

  doesBelongsToInfoButton(e: Event): boolean {
    let _strID = (e.target as HTMLInputElement).id as string;
    if (_strID.includes('infoButton')) {
      return false;
    } else {
      return true;
    }
  }

  isClickedAreaBelongToThisWizard(e: Event) {
    if (this.currentActiveInforCard === -1) {
      return;
    }
    // assumption, cardComponent will always have only one child i.e. currently open card
    if (this.cardComponents.first && this.currentActiveInforCard === this.getIDNum(this.cardComponents.first.nativeElement.id)
      && !this.cardComponents.first.nativeElement.contains(e.target) && this.doesBelongsToInfoButton(e)) {
      this.currentActiveInforCard = -1;
    }
  }

  getImageName(name) {
    return `../../../assets/images/${name}`;
  }
}
