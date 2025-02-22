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
import { AccountService } from './accounts.service';
import { backupPath } from 'src/main';
import * as fs from 'fs';

@Controller('accounts')
export class AccountsController {
  constructor(private accountService: AccountService) { }

  @Get()
  async getAccounts() {
    return this.accountService
      .findAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: 'No Accounts available.' };
      });
  }
  @Get('/group/:groupName')
  async getAccountsByGroup(@Param('groupName') groupName = '') {
    return this.accountService
      .findAll()
      .then((res) => {
        return res.filter((g) => g.groupName === groupName);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  @Post()
  async createAccount(@Body() accountDTO: any) {
    return this.accountService
      .create(accountDTO)
      .then((res) => {
        return { mesage: 'Done' };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant create account.',
        };
      });
  }

  @Put(':id')
  async updateAccount(@Param('id') id: string, @Body() accountDTO: any) {
    return await this.accountService
      .update(id, accountDTO)
      .then((res) => {
        return {
          mesage: 'Updated',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant update account.',
        };
      });
  }

  @Delete(':id')
  async deleteAccount(@Param('id') id: string) {
    return await this.accountService
      .delete(id)
      .then((res) => {
        return {
          mesage: 'Deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant Delete account.',
        };
      });
  }

  @Get(':id')
  async getAccount(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Post('backup')
  async getBackup(@Res() response) {
    return this.accountService.findAll().then(async (res) => {
      let result = '';
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      await fs.writeFile(
        backupPath +
        '/accounts-backup-' +
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
