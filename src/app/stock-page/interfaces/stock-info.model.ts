export interface StockInfoModel {
  address1: string;
  city: string;
  companyOfficers: CompanyOfficerModel[];
  country: string;
  industry: string;
  longBusinessSummary: string;
  phone: string;
  sector: string;
  state: string;
  website: string;
}

export interface CompanyOfficerModel {
  name: string;
  title: string;
}
