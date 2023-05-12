import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './products.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private readonly products = [
    {
      productId: 1,
      productname: 'test',
      password: 'test',
    },
  ];

  async findOne(id: string): Promise<Product> {
    //    return this.products.find(product=>product.productname===productname)
    return await this.productModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().sort({ _id: -1 }).exec();
  }

  async create(productDTO: any): Promise<Product> {
    return await this.productModel.create(productDTO);
  }

  async update(id: string, productDTO: any): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, productDTO).exec();
  }

  async delete(id: string) {
    return await this.productModel.findOneAndDelete({ _id: id }).exec();
  }

  async upload(productsArray: Product[]) {
    return await this.productModel.insertMany(productsArray);
  }
}
