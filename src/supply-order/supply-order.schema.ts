import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class PartsData {
  @Prop()
  partNumber: string;
  @Prop()
  partName: string;
  @Prop()
  quantity: number;
  @Prop()
  rate: number;
  @Prop()
  unit: string;
  @Prop()
  netAmount: number;
  @Prop()
  gst: number;
}

@Schema()
export class SupplyOrder {
  @Prop()
  partsData: PartsData[];
  @Prop()
  supplyOrderNumber: number;
  @Prop()
  supplierName: string;
  @Prop()
  totalQuantity: number;
  @Prop()
  totalAmount: number;
  @Prop()
  status: string;
  @Prop()
  comment: string;
  @Prop()
  date: string;
}

export type SupplyOrderDocument = HydratedDocument<SupplyOrder>;
export const SupplyOrderSchema = SchemaFactory.createForClass(SupplyOrder);
