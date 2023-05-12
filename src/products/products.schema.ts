import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Product {
  @Prop()
  partNumber: string;
  @Prop()
  partName: string;
  @Prop()
  saleRate: number;
  @Prop()
  newRate: number;
  @Prop()
  quantity: number;
  @Prop()
  purchasedQuantity: number;
  @Prop()
  consumedQuantity: number;
  @Prop()
  closingQuantity: number;
  @Prop()
  unit: string;
  @Prop()
  storeLocation: string;
  @Prop()
  ledgerPageNumber: string;
  @Prop()
  category: string;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
