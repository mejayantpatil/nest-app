import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// class Data {
//     @Prop()

// }

@Schema()
export class Card {
  @Prop()
  jobIDandCardMap: string;
}

export type CardDocument = HydratedDocument<Card>;
export const CardSchema = SchemaFactory.createForClass(Card);
