import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../../entities';
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {} 

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
      const { clientName, total, productList } = createOrderDto;
      return this.orderService.createOrder(clientName, total, productList);
    }   
    
    @Put(':id')
    async updateOrder(
      @Param('id') id: string,
      @Body() updateOrderDto: CreateOrderDto,
    ): Promise<Order> {
      const { clientName, total, productList } = updateOrderDto;
      return this.orderService.updateOrder(id, clientName, total, productList);
    }

    @Get('/total-sold-price-last-month')
    async getTotalSoldPriceLastMonth(): Promise<{
      total: number,
    }> {
      return this.orderService.getTotalSoldPriceLastMonth();
    }   

    @Get('/highest-amount-order')
    async getHighestAmountOrder(): Promise<Order> {
      return this.orderService.getHighestAmountOrder();
    }
}
