import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SupplyOrder, SupplyOrderDocument } from './supply-order.schema';

@Injectable()
export class SupplyOrderService {
  constructor(
    @InjectModel(SupplyOrder.name)
    private supplyOrderModel: Model<SupplyOrderDocument>,
  ) {}

  async findOne(id: string): Promise<SupplyOrder> {
    //    return this.supplyOrders.find(supplyOrder=>supplyOrder.supplyOrdername===supplyOrdername)
    return await this.supplyOrderModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<SupplyOrder[]> {
    return await this.supplyOrderModel.find().exec();
  }

  async create(supplyOrderDTO: any): Promise<SupplyOrder> {
    return await this.supplyOrderModel.create(supplyOrderDTO);
  }

  async update(id: string, supplyOrderDTO: any): Promise<SupplyOrder> {
    return await this.supplyOrderModel
      .findByIdAndUpdate(id, supplyOrderDTO)
      .exec();
  }

  async delete(id: string) {
    return await this.supplyOrderModel.findOneAndDelete({ _id: id }).exec();
  }
}
