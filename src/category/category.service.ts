import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  private readonly categorys = [
    {
      categoryId: 1,
      categoryname: 'test',
      password: 'test',
    },
  ];

  async findOne(id: string): Promise<Category> {
    //    return this.categorys.find(category=>category.categoryname===categoryname)
    return await this.categoryModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async create(categoryDTO: any): Promise<Category> {
    return await this.categoryModel.create(categoryDTO);
  }

  async update(id: string, categoryDTO: any): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, categoryDTO).exec();
  }

  async delete(id: string) {
    return await this.categoryModel.findOneAndDelete({ _id: id }).exec();
  }
}
