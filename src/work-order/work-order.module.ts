import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkOrderController } from './work-order.controller';
import { WorkOrder, WorkOrderSchema } from './work-order.schema';
import { WorkOrderService } from './work-order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkOrder.name, schema: WorkOrderSchema },
    ]),
  ],
  providers: [WorkOrderService],
  controllers: [WorkOrderController],
})
export class WorkOrderModule {}
