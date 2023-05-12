import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplyOrderController } from './supply-order.controller';
import { SupplyOrder, SupplyOrderSchema } from './supply-order.schema';
import { SupplyOrderService } from './supply-order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupplyOrder.name, schema: SupplyOrderSchema },
    ]),
  ],
  providers: [SupplyOrderService],
  controllers: [SupplyOrderController],
})
export class SupplyOrderModule {}
