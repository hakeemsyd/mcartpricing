export interface IMCartPlan {
  tier: string;
  planName: string;
  stores: string;
  shoppers: string;
  influencers: string;
  admin: string;
  productCategory: string;
  mCarts: string;
}

export const mCartPlan: IMCartPlan[] = [
  {
    tier: '1',
    planName: '1 Month Pilot Plan',
    stores: '5',
    shoppers: '100K',
    influencers: '500',
    admin: '1',
    productCategory: '100',
    mCarts: '100',
  },
  {
    tier: '2',
    planName: 'Standard',
    stores: '30',
    shoppers: '1M',
    influencers: '200',
    admin: '5',
    productCategory: '300',
    mCarts: '1500',
  },
  {
    tier: '3',
    planName: 'Enterprise',
    stores: '30',
    shoppers: '3M',
    influencers: '1000',
    admin: '12',
    productCategory: '800',
    mCarts: '5000',
  },
  {
    tier: '4',
    planName: 'Unlimited',
    stores: 'Unlimited',
    shoppers: 'Unlimited',
    influencers: 'Unlimited',
    admin: '5',
    productCategory: 'Unlimited',
    mCarts: 'Unlimited',
  },
];