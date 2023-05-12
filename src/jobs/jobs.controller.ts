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
import { JobService } from './jobs.service';
import { backupPath } from 'src/main';
import * as fs from 'fs';

@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) { }

  @Get()
  async getJobs() {
    return this.jobService
      .findAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: 'No Jobs available.' };
      });
  }

  @Post()
  async createJob(@Body() jobDTO: any) {
    return this.jobService
      .create(jobDTO)
      .then((res) => {
        return { mesage: 'Done' };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant create job.',
        };
      });
  }

  @Put(':id')
  async updateJob(@Param('id') id: string, @Body() jobDTO: any) {
    return await this.jobService
      .update(id, jobDTO)
      .then((res) => {
        return {
          mesage: 'Updated',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant update job.',
        };
      });
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    return await this.jobService
      .delete(id)
      .then((res) => {
        return {
          mesage: 'Deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant Delete job.',
        };
      });
  }

  @Get(':id')
  async getJob(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Post('getByDate')
  async getJobsByDate(@Body() payload: any) {
    return this.jobService.findAll().then((res) => {
      const startDate = new Date(payload.startDate);
      const endDate = new Date(payload.endDate);
      const data = [];
      res.map((t) => {
        const d = [];
        t.cardData.map((j) => {
          const jDate = new Date(j.jobCardDate);
          if (
            jDate.getTime() >= startDate.getTime() &&
            jDate.getTime() <= endDate.getTime()
          ) {
            d.push({ jobCardNo: t.jobCardNo, ...j });
          }
        });

        d.length > 0 && data.push(...d);
      });
      return data;
    });
  }

  @Post('backup')
  async getBackup(@Res() response) {
    return this.jobService.findAll().then(async (res) => {
      let result = '';
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      await fs.writeFile(
        backupPath +
        '/jobs-backup-' +
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
