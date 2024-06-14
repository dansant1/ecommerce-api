import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrderDocument } from '../schemas';
import { Order } from '../../domain/entities';
import { OrderRepository } from '../../domain/repositories';
import {
  Product,
} from '../../../products/domain/entities';
import { ProductRepository } from '../../../products/domain/repositories';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectModel(OrderDocument.name) private readonly orderModel: Model<OrderDocument>,
    @Inject('ProductRepository') private readonly productRepository: ProductRepository,

  ) {}

  async create(order: Order): Promise<Order> {
    const { productList } = order;
    await this.productRepository.validateIdsExists(productList as string[]);
    const createdOrder = new this.orderModel(order);
    const orderDocument = await createdOrder.save();
    return this.mapDocumentToEntity(orderDocument);
  }

  async findById(id: string): Promise<Order> {
    const orderDocument = await this.orderModel
    .findById(id)
    .exec();
    return this.mapDocumentToEntity(orderDocument);
  }

  async update(order: Order): Promise<Order> {
    const { id, productList, ...updateData } = order;
    await this.productRepository.validateIdsExists(productList as string[]);
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, {
      ...updateData,
      productList
    }, { new: true }).exec();
    return this.mapDocumentToEntity(updatedOrder);
  }

  async delete(id: string): Promise<void> {
    await this.orderModel.findByIdAndDelete(id).exec();
  }

  async getTotalSoldPriceLastMonth(): Promise<number> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const result = await this.orderModel
    .aggregate([
      { 
        $match: { 
          createdAt: { 
            $gte: lastMonth 
          } 
        } 
      },
      { 
        $group: { 
          _id: null, 
          total: { 
            $sum: '$total' 
          } 
        } 
      },
    ])
    .exec();

    return result[0]?.total || 0;
  }

  async getHighestAmountOrder(): Promise<Order> {
    const result = await this.orderModel.findOne().sort({ total: -1 }).exec();
    return this.mapDocumentToEntity(result);
  }

  async findAllWithProductDetails(): Promise<Order[]> {
    console.log("init");
    const orderDocuments = await this.orderModel
      .find()
      .populate('productList')
      .exec();
    return orderDocuments.map(orderDocument => this.mapDocumentToEntityList(orderDocument));
  }

  private mapDocumentToEntity(orderDocument: OrderDocument): Order {
    if (!orderDocument) {
      return null;
    }
    const { clientName, total, productList, _id } = orderDocument;
    return new Order(_id as string, clientName, total, productList as unknown as string[]);
  }

  private mapDocumentToEntityList(orderDocument: OrderDocument): Order {
    if (!orderDocument) {
      return null;
    }
    const { clientName, total, _id } = orderDocument;

    let productList: any[] = [];
    if (Array.isArray(orderDocument.productList)) {
      productList = orderDocument.productList;
    } else if (orderDocument.productList) {
      productList = [orderDocument.productList];
    }

    if (!productList.length) {
      return new Order(_id.toString(), clientName, total, []);
    }

    const formattedProductList = productList.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      sku: product.sku,
      price: product.price,
      picture: product.picture,
    }));

    return new Order(_id.toString(), clientName, total, formattedProductList as Product[]);
  }
}
