import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class Data {
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
  newRate: number;
  @Prop()
  discountPercentage: number;
  @Prop()
  discount: number;
  @Prop()
  grossAmount: number;
  @Prop()
  sgstPercentage: number;
  @Prop()
  sgstAmount: number;
  @Prop()
  cgstPercentage: number;
  @Prop()
  cgstAmount: number;
  @Prop()
  netAmount: number;
}

@Schema()
export class Transaction {
  @Prop()
  transactionNo: number;
  @Prop()
  paymentMode: string;
  @Prop()
  supplierInvoiceNo: string;
  @Prop()
  purchaseOrderNo: string
  @Prop()
  supplierName: string;
  @Prop()
  date: string;
  @Prop()
  data: Data[];
  @Prop()
  grossAmount: number;
  @Prop()
  gst: number;
  @Prop()
  tradeDiscount: number;
  @Prop()
  igst: number;
  @Prop()
  grandTotal: number;
  @Prop()
  roundOff: number;
  @Prop()
  cashDiscount: number;
  @Prop()
  otherCharges: number;
  @Prop()
  netAmount: number;
  @Prop()
  comment: string;
  @Prop()
  type: string;
}

export type TransactionDocument = HydratedDocument<Transaction>;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
