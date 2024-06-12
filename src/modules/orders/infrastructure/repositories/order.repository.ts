import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from '../schemas';
import { Order } from '../../entities';
import { OrderRepository } from '../../domain/repositories';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectModel(OrderDocument.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = new this.orderModel(order);
    const orderDocument = await createdOrder.save();
    return this.mapDocumentToEntity(orderDocument);
  }

  async findById(id: string): Promise<Order> {
    const orderDocument = await this.orderModel.findById(id).exec();
    return this.mapDocumentToEntity(orderDocument);
  }

  async update(order: Order): Promise<Order> {
    const { id, ...updateData } = order;
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
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

  private mapDocumentToEntity(orderDocument: OrderDocument): Order {
    if (!orderDocument) {
      return null;
    }
    const { clientName, total, productList, _id } = orderDocument;
    return new Order(_id as string, clientName, total, productList);
  }
}
