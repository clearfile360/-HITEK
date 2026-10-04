export type ServiceCategory = 
  | 'inverters'
  | 'batteries'
  | 'ro-purifiers'
  | 'solar'
  | 'appliances'
  | 'electrician'
  | 'plumber';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  number: string;
  title: string;
  tamilTitle: string;
  summary: string;
  features: string[];
  brands?: string[];
  enquiryTag: string;
}

export interface ApplianceItem {
  id: string;
  name: string;
  watts: number;
  icon: string;
  count: number;
  max: number;
}
