import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private readonly users = [
    {
      userId: 1,
      username: 'test',
      password: 'test',
    },
  ];

  async findOne(id: string): Promise<User> {
    //    return this.users.find(user=>user.username===username)
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async create(userDTO: any): Promise<User> {
    return await this.userModel.create(userDTO);
  }

  async update(id: string, userDTO: any): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, userDTO).exec();
  }

  async delete(id: string) {
    return await this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
