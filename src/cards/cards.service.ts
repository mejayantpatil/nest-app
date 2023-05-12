import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from './cards.schema';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async findOne(id: string): Promise<Card> {
    //    return this.cards.find(card=>card.cardname===cardname)
    return await this.cardModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<Card[]> {
    return await this.cardModel.find().exec();
  }

  async create(cardDTO: any): Promise<Card> {
    return await this.cardModel.create(cardDTO);
  }

  async update(id: string, cardDTO: any): Promise<Card> {
    return await this.cardModel.findByIdAndUpdate(id, cardDTO).exec();
  }

  async delete(id: string) {
    return await this.cardModel.findOneAndDelete({ _id: id }).exec();
  }
}
