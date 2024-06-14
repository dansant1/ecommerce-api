import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductRepository } from '../../domain/repositories';
import { Product } from '../../domain/entities';
import { ProductDocument } from '../schemas';
import { SKU } from '../../domain/value-objects';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
    constructor(
        @InjectModel(ProductDocument.name) private productModel: Model<ProductDocument>
    ) {}

    async validateIdsExists(productList: string[]): Promise<void> {
      const invalidIds = productList.filter(productId => !Types.ObjectId.isValid(productId as string));
      if (invalidIds.length > 0) {
        throw new BadRequestException(`Invalid product IDs: ${invalidIds.join(', ')}`);
      }
      const products = await this.productModel.find({ _id: { $in: productList } }).exec();
      if (products.length !== productList.length) {
        const existingIds = products.map(product => product._id.toString());
        const missingIds = productList.filter(id => !existingIds.includes(id));
        throw new NotFoundException(`Products not found: ${missingIds.join(', ')}`);
      }
    }

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
        if (error.code === 11000) { 
          throw new Error(`SKU '${product.sku.getValue()}' already exists.`);
        }
        throw error; 
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
