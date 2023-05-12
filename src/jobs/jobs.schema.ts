import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class SpareParts {
  @Prop()
  partNo: string;
  @Prop()
  partName: string;
  @Prop()
  quantity: number;
  @Prop()
  unit: string;
  @Prop()
  rate: number;
  @Prop()
  netAmount: number;
  @Prop()
  ledgerPageNumber: string;
  @Prop()
  categoryId: string;
}

class CardData {
  @Prop()
  recordNo: string;
  @Prop()
  paymentMode: string;
  @Prop()
  jobCardDate: string;
  @Prop()
  billDate: string;
  @Prop()
  spareParts: SpareParts[];
  @Prop()
  mechanicName: string;
  @Prop()
  chasisNumber: string;
  @Prop()
  engineNumber: string;
  @Prop()
  registrationNumber: string;
  @Prop()
  modelName: string;
  @Prop()
  kmCovered: number;
  @Prop()
  oilChange: string;
  @Prop()
  problem: string;
  @Prop()
  netAmount: number;
  @Prop()
  comment: string;
  @Prop()
  status: string;
}

@Schema()
export class Job {
  @Prop()
  jobCardNo: string;
  @Prop()
  cardData: CardData[];
}

export type JobDocument = HydratedDocument<Job>;
export const JobSchema = SchemaFactory.createForClass(Job);
