import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  async findOne(id: string): Promise<Vehicle> {
    //    return this.vehicles.find(vehicle=>vehicle.vehiclename===vehiclename)
    return await this.vehicleModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleModel.find().exec();
  }

  async create(vehicleDTO: any): Promise<Vehicle> {
    return await this.vehicleModel.create(vehicleDTO);
  }

  async update(id: string, vehicleDTO: any): Promise<Vehicle> {
    return await this.vehicleModel.findByIdAndUpdate(id, vehicleDTO).exec();
  }

  async delete(id: string) {
    return await this.vehicleModel.findOneAndDelete({ _id: id }).exec();
  }
}
