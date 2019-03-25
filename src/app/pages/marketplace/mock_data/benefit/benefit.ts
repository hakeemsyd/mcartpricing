import { MediaBenefitItem, CPGBenefit, MallsBenefit, ProcurementBenefit,
  AgencyBenefit, OtherBenefit } from './benefitData';

export interface IBenefitItem {
  heading: string;
  description: string;
  icon: string;
  mainImage: string[];
}

export interface IBenefit {
  name: string;
  value: string;
  benefitItemsList: IBenefitItem[];
}

export const benefits: IBenefit[] = [
  {
    name: 'Media',
    value: 'media',
    benefitItemsList: MediaBenefitItem as IBenefitItem[],
  },
  {
    name: 'CPG',
    value: 'cpg',
    benefitItemsList: CPGBenefit
  },
  {
    name: 'Malls',
    value: 'malls',
    benefitItemsList: MallsBenefit
  },
  {
    name: 'Procurement',
    value: 'procurement',
    benefitItemsList: ProcurementBenefit
  },
  {
    name: 'Agency',
    value: 'agency',
    benefitItemsList: AgencyBenefit
  },
  {
    name: 'Other',
    value: 'other',
    benefitItemsList: OtherBenefit
  }
];
