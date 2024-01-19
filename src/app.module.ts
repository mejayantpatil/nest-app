import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { GroupModule } from './groups/group.module';
import { ProductModule } from './products/products.module';
import { UserModule } from './users/users.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TransactionModule } from './transactions/transactions.module';
import { JobModule } from './jobs/jobs.module';
import { SupplyOrderModule } from './supply-order/supply-order.module';
import { CardModule } from './cards/cards.module';
import { WorkOrderModule } from './work-order/work-order.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/vishwayodhaDB'),
    UserModule,
    GroupModule,
    CategoryModule,
    ProductModule,
    AccountModule,
    VehicleModule,
    TransactionModule,
    JobModule,
    SupplyOrderModule,
    CardModule,
    WorkOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
