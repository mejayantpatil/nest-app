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
import { GroupService } from './group.service';
import { backupPath } from 'src/main';
import * as fs from 'fs';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) { }

  @Get()
  async getGroups() {
    return this.groupService
      .findAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: 'No Groups available.' };
      });
  }

  @Post()
  async createGroup(@Body() groupDTO: any) {
    return this.groupService
      .create(groupDTO)
      .then((res) => {
        return { mesage: 'Done' };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant create group.',
        };
      });
  }

  @Put(':id')
  async updateGroup(@Param('id') id: string, @Body() groupDTO: any) {
    return await this.groupService
      .update(id, groupDTO)
      .then((res) => {
        return {
          mesage: 'Updated',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant update group.',
        };
      });
  }

  @Delete(':id')
  async deleteGroup(@Param('id') id: string) {
    return await this.groupService
      .delete(id)
      .then((res) => {
        return {
          mesage: 'Deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant Delete group.',
        };
      });
  }

  @Get(':id')
  async getGroup(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Post('backup')
  async getBackup(@Res() response) {
    return this.groupService.findAll().then(async (res) => {
      let result = '';
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      await fs.writeFile(
        backupPath +
        '/group-backup-' +
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
