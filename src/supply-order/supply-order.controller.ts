import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { SupplyOrderService } from './supply-order.service';
import { backupPath } from 'src/main';
import * as fs from 'fs';

@Controller('supplyOrders')
export class SupplyOrderController {
  constructor(private supplyOrderService: SupplyOrderService) { }

  @Get()
  async getSupplyOrders() {
    return this.supplyOrderService
      .findAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: 'No SupplyOrders available.' };
      });
  }

  @Post()
  async createSupplyOrder(@Body() supplyOrderDTO: any) {
    return this.supplyOrderService
      .create(supplyOrderDTO)
      .then((res) => {
        return { mesage: 'Done' };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant create supplyOrder.',
        };
      });
  }

  @Put(':id')
  async updateSupplyOrder(
    @Param('id') id: string,
    @Body() supplyOrderDTO: any,
  ) {
    return await this.supplyOrderService
      .update(id, supplyOrderDTO)
      .then((res) => {
        return {
          mesage: 'Updated',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant update supplyOrder.',
        };
      });
  }

  @Delete(':id')
  async deleteSupplyOrder(@Param('id') id: string) {
    return await this.supplyOrderService
      .delete(id)
      .then((res) => {
        return {
          mesage: 'Deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant Delete supplyOrder.',
        };
      });
  }

  @Get(':id')
  async getSupplyOrder(@Param('id') id: string) {
    return this.supplyOrderService.findOne(id);
  }

  @Post('backup')
  async getBackup(@Res() response) {
    return this.supplyOrderService.findAll().then(async (res) => {
      let result = '';
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      await fs.writeFile(
        backupPath +
        '/supplyOrder-backup-' +
        // new Date().toISOString().substring(0, 10) +
        '.json',
        JSON.stringify(res),
        (err) => {
          if (err) {
            console.log('Error writing file', err);
            result = 'error while backup.';
            response.json({ message: result });
          } else {
            console.log('Successfully wrote file');
            result = 'backuped successfully.';
            response.json({ message: result });
          }
        },
      );
      return result;
    });
  }
}
