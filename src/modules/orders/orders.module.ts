import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './application/controllers/order.controller';
import { OrderService } from './application/services/order.service';
import { OrderRepositoryImpl } from './infrastructure/repositories';
import { OrderDocument, OrderSchema } from './infrastructure/schemas';
import {
    ProductModule,
} from  '../products/products.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: OrderDocument.name, schema: OrderSchema }]),
        ProductModule,
    ],
    controllers: [OrderController],
    providers: [
        OrderService,
        {
            provide: 'OrderRepository',
            useClass: OrderRepositoryImpl,
        },
    ],
})
export class OrderModule {}
