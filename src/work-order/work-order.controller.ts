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
import { WorkOrderService } from './work-order.service';
import { backupPath } from 'src/main';
import * as fs from 'fs';

@Controller('workOrders')
export class WorkOrderController {
  constructor(private workOrderService: WorkOrderService) { }

  @Get()
  async getWorkOrders() {
    return this.workOrderService
      .findAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: 'No WorkOrders available.' };
      });
  }

  @Post()
  async createWorkOrder(@Body() workOrderDTO: any) {
    return this.workOrderService
      .create(workOrderDTO)
      .then((res) => {
        return { mesage: 'Done' };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant create workOrder.',
        };
      });
  }

  @Put(':id')
  async updateWorkOrder(@Param('id') id: string, @Body() workOrderDTO: any) {
    return await this.workOrderService
      .update(id, workOrderDTO)
      .then((res) => {
        return {
          mesage: 'Updated',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant update workOrder.',
        };
      });
  }

  @Delete(':id')
  async deleteWorkOrder(@Param('id') id: string) {
    return await this.workOrderService
      .delete(id)
      .then((res) => {
        return {
          mesage: 'Deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant Delete workOrder.',
        };
      });
  }

  @Get(':id')
  async getWorkOrder(@Param('id') id: string) {
    return this.workOrderService.findOne(id);
  }

  @Post('getByDate')
  async getByDate(@Body() payload: any) {
    return this.workOrderService.findAll().then((res) => {
      const startDate = new Date(payload.startDate);
      const endDate = new Date(payload.endDate);
      return res.filter((t) => {
        const oDate = new Date(t.date);
        return (
          oDate.getTime() >= startDate.getTime() &&
          oDate.getTime() <= endDate.getTime()
        );
      });
    })
  }

  @Post('backup')
  async getBackup(@Res() response) {
    return this.workOrderService.findAll().then(async (res) => {
      let result = '';
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      await fs.writeFile(
        backupPath +
        '/workorder-backup-' +
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
