import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from './group.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  private readonly groups = [
    {
      groupId: 1,
      groupname: 'test',
      password: 'test',
    },
  ];

  async findOne(id: string): Promise<Group> {
    //    return this.groups.find(group=>group.groupname===groupname)
    return await this.groupModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<Group[]> {
    return await this.groupModel.find().exec();
  }

  async create(groupDTO: any): Promise<Group> {
    return await this.groupModel.create(groupDTO);
  }

  async update(id: string, groupDTO: any): Promise<Group> {
    return await this.groupModel.findByIdAndUpdate(id, groupDTO).exec();
  }

  async delete(id: string) {
    return await this.groupModel.findOneAndDelete({ _id: id }).exec();
  }
}
