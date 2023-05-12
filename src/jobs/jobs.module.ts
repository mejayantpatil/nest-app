import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobController } from './jobs.controller';
import { Job, JobSchema } from './jobs.schema';
import { JobService } from './jobs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  providers: [JobService],
  controllers: [JobController],
})
export class JobModule {}
