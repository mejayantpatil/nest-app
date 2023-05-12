import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './jobs.schema';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async findOne(id: string): Promise<Job> {
    //    return this.jobs.find(job=>job.jobname===jobname)
    return await this.jobModel.findOne({ jobCardNo: id }).exec();
  }

  async findAll(): Promise<Job[]> {
    return await this.jobModel.find().exec();
  }

  async create(jobDTO: any): Promise<Job> {
    return await this.jobModel.create(jobDTO);
  }

  async update(id: string, jobDTO: any): Promise<Job> {
    return await this.jobModel.findByIdAndUpdate({ _id: id }, jobDTO).exec();
  }

  async delete(id: string) {
    return await this.jobModel.findOneAndDelete({ _id: id }).exec();
  }
}
