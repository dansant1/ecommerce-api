import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../../entities';
import { JwtAuthGuard } from '../../../auth/shared';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {} 

    @Post()
    @UseGuards(JwtAuthGuard)
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
      const { clientName, total, productList } = createOrderDto;
      return this.orderService.createOrder(clientName, total, productList);
    }   
    
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateOrder(
      @Param('id') id: string,
      @Body() updateOrderDto: CreateOrderDto,
    ): Promise<Order> {
      const { clientName, total, productList } = updateOrderDto;
      return this.orderService.updateOrder(id, clientName, total, productList);
    }

    @Get('/total-sold-price-last-month')
    @UseGuards(JwtAuthGuard)
    async getTotalSoldPriceLastMonth(): Promise<{
      total: number,
    }> {
      return this.orderService.getTotalSoldPriceLastMonth();
    }   

    @Get('/highest-amount-order')
    @UseGuards(JwtAuthGuard)
    async getHighestAmountOrder(): Promise<Order> {
      return this.orderService.getHighestAmountOrder();
    }
}
