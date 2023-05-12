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
export class WorkOrder {
  @Prop()
  partsData: PartsData[];
  @Prop()
  workOrderNumber: number;
  @Prop()
  serviceProviderName: string;
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

export type WorkOrderDocument = HydratedDocument<WorkOrder>;
export const WorkOrderSchema = SchemaFactory.createForClass(WorkOrder);
