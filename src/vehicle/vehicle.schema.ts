import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Vehicle {
  @Prop()
  vehicleNumber: string;
  @Prop()
  vehicleType: string;
  @Prop()
  currentKM: number
}

export type VehicleDocument = HydratedDocument<Vehicle>;
export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
