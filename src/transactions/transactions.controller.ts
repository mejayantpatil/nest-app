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
import { TransactionService } from './transactions.service';
import { backupPath } from 'src/main';
import * as fs from 'fs';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) { }

  @Get()
  async getTransactions() {
    return this.transactionService
      .findAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: 'No Transactions available.' };
      });
  }

  @Post()
  async createTransaction(@Body() transactionDTO: any) {
    return this.transactionService
      .create(transactionDTO)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant create transaction.',
        };
      });
  }

  @Put(':id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() transactionDTO: any,
  ) {
    return await this.transactionService
      .update(id, transactionDTO)
      .then((res) => {
        return {
          mesage: 'Updated',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant update transaction.',
        };
      });
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    return await this.transactionService
      .delete(id)
      .then((res) => {
        return {
          mesage: 'Deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant Delete transaction.',
        };
      });
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Post('getByDate')
  async getTransactionsByDate(@Body() payload: any) {
    return this.transactionService.findAll().then((res) => {
      const startDate = new Date(payload.startDate);
      const endDate = new Date(payload.endDate);
      return res.filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getTime() >= startDate.getTime() &&
          tDate.getTime() <= endDate.getTime()
        );
      });
    });
  }

  @Post('backup')
  async getBackup(@Res() response) {
    return this.transactionService.findAll().then(async (res) => {
      let result = '';
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      await fs.writeFile(
        backupPath +
        '/transactions-backup-' +
        new Date().toISOString().substring(0, 10) +
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
