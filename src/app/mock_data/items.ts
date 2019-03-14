export interface Item {
  name: string;
  value: string;
  otherValue?: any;
}

export const BusinessOptions: Item[] = [
  {
    name: 'Media',
    value: 'media'
  },
  {
    name: 'CPG',
    value: 'cpg'
  },
  {
    name: 'Malls',
    value: 'malls'
  },
  {
    name: 'Procurement',
    value: 'procurement'
  },
  {
    name: 'Agency',
    value: 'agency'
  },
  {
    name: 'Other',
    value: 'other'
  }
];

export const ObjectivesOptions: Item[] = [
  {
    name: 'User Acqusition',
    value: 'item_1'
  },
  {
    name: 'User Retention',
    value: 'item_2'
  },
  {
    name: 'Revenue Generation',
    value: 'item_3'
  },
  {
    name: 'Content Monetization',
    value: 'item_4'
  },
  {
    name: 'Data Analysis',
    value: 'item_5'
  }
];
