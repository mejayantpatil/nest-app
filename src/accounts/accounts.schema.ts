import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Account {
  @Prop()
  accountName: string;
  @Prop()
  groupName: string;
  @Prop()
  address: string;
  @Prop()
  phone: string;
}

export type AccountDocument = HydratedDocument<Account>;
export const AccountSchema = SchemaFactory.createForClass(Account);
