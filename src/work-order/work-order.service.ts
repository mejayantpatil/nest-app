import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkOrder, WorkOrderDocument } from './work-order.schema';

@Injectable()
export class WorkOrderService {
  constructor(
    @InjectModel(WorkOrder.name)
    private workOrderModel: Model<WorkOrderDocument>,
  ) {}

  async findOne(id: string): Promise<WorkOrder> {
    //    return this.workOrders.find(workOrder=>workOrder.workOrdername===workOrdername)
    return await this.workOrderModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<WorkOrder[]> {
    return await this.workOrderModel.find().exec();
  }

  async create(workOrderDTO: any): Promise<WorkOrder> {
    return await this.workOrderModel.create(workOrderDTO);
  }

  async update(id: string, workOrderDTO: any): Promise<WorkOrder> {
    return await this.workOrderModel.findByIdAndUpdate(id, workOrderDTO).exec();
  }

  async delete(id: string) {
    return await this.workOrderModel.findOneAndDelete({ _id: id }).exec();
  }
}
