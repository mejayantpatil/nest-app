import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transactions.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) { }

  async findOne(id: string): Promise<Transaction> {
    //    return this.transactions.find(transaction=>transaction.transactionname===transactionname)
    return await this.transactionModel.findOne({ transactionNo: id }).exec();
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionModel.find().sort({ _id: -1 }).exec();
  }

  async create(transactionDTO: any): Promise<Transaction> {
    return await this.transactionModel.create(transactionDTO);
  }

  async update(id: string, transactionDTO: any): Promise<Transaction> {
    return await this.transactionModel
      .findByIdAndUpdate(id, transactionDTO)
      .exec();
  }

  async delete(id: string) {
    return await this.transactionModel.findOneAndDelete({ _id: id }).exec();
  }
}
