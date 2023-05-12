interface SpareParts {
  partNo: string;
  partName: string;
  quantity: number;
  rate: number;
  unit: string;
  netAmount: number;
  ledgerPageNumber: string;
  categoryId: string;
}

export interface JobDTO {
  jobCardNo: number;
  recordNo: number;
  paymentMode: string;
  jobCardDate: string;
  billDate: string;
  spareParts: SpareParts[];
  mechanicName: string;
  chasisNumber: string;
  engineNumber: string;
  registrationNumber: string;
  modelName: string;
  kmCovered: number;
  oilChange: string;
  problem: string;
  netAmount: number;
  comment: string;
  status: string;
}

interface CardData {
  recordNo: string;
  paymentMode: string;
  jobCardDate: string;
  billDate: string;
  spareParts: SpareParts[];
  mechanicName: string;
  chasisNumber: string;
  engineNumber: string;
  registrationNumber: string;
  modelName: string;
  kmCovered: number;
  oilChange: string;
  problem: string;
  netAmount: number;
  comment: string;
  status: string;
}

export interface JobNewDTO {
  jobCardNo: string;
  cardData: CardData[];
}
