import { Injectable, Inject } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories';
import { Order } from '../../entities';

@Injectable()
export class OrderService {
    constructor(
      @Inject('OrderRepository') private readonly orderRepository: OrderRepository,
    ) {}

    async createOrder(clientName: string, total: number, productList: string[]): Promise<Order> {
      const order = new Order(null, clientName, total, productList);
      return this.orderRepository.create(order);
    }

    async findOrderById(id: string): Promise<Order> {
      return this.orderRepository.findById(id);
    }

    async updateOrder(id: string, clientName: string, total: number, productList: string[]): Promise<Order> {
      const existingOrder = await this.orderRepository.findById(id);
      if (!existingOrder) {
        throw new Error(`Order with id ${id} not found`);
      }

      // Update order fields
      existingOrder.clientName = clientName;
      existingOrder.total = total;
      existingOrder.productList = productList;

      return this.orderRepository.update(existingOrder);
    }

    async deleteOrder(id: string): Promise<void> {
      await this.orderRepository.delete(id);
    }

    async getTotalSoldPriceLastMonth(): Promise<{
      total: number
    }> {
      const total = await this.orderRepository.getTotalSoldPriceLastMonth();
      return {
        total,
      }
    }

    async getHighestAmountOrder(): Promise<Order> {
      return this.orderRepository.getHighestAmountOrder();
    }
}   

