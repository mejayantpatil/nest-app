import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './accounts.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private productModel: Model<AccountDocument>,
  ) {}

  private readonly products = [
    {
      productId: 1,
      productname: 'test',
      password: 'test',
    },
  ];

  async findOne(id: string): Promise<Account> {
    //    return this.products.find(product=>product.productname===productname)
    return await this.productModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<Account[]> {
    return await this.productModel.find().sort({ _id: -1 }).exec();
  }

  async create(productDTO: any): Promise<Account> {
    return await this.productModel.create(productDTO);
  }

  async update(id: string, productDTO: any): Promise<Account> {
    return await this.productModel.findByIdAndUpdate(id, productDTO).exec();
  }

  async delete(id: string) {
    return await this.productModel.findOneAndDelete({ _id: id }).exec();
  }
}
