import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductRepository } from '../../domain/repositories';
import { Product } from '../../entities';
import { ProductDocument } from '../schemas';
import { SKU } from '../../domain/value-objects';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
    constructor(
        @InjectModel(ProductDocument.name) private productModel: Model<ProductDocument>
    ) {}

    async save(product: Product): Promise<Product> {
      try {
        const createdProduct = new this.productModel({
          name: product.name,
          sku: product.sku.getValue(),
          price: product.price,
          picture: product.picture,
        });
        const result = await createdProduct.save();
        return new Product(result.id, result.name, new SKU(result.sku), result.price, result.picture);
      } catch (error) {
        if (error.code === 11000) { // Mongoose error code for duplicate key
          throw new Error(`SKU '${product.sku.getValue()}' already exists.`);
        }
        throw error; // Rethrow other unexpected errors
      }
        
    }

    async findById(id: string): Promise<Product | null> {
        const result = await this.productModel.findById(id).exec();
        if (!result) {
          return null;
        }
        return new Product(result.id, result.name, new SKU(result.sku), result.price, result.picture);
    }

    async findBySKU(sku: string): Promise<Product | null> {
        const result = await this.productModel.findOne({ sku }).exec();
        if (!result) {
          return null;
        }
        return new Product(result.id, result.name, new SKU(result.sku), result.price, result.picture);
    }
}
