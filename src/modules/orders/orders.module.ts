import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './application/controllers/order.controller';
import { OrderService } from './application/services/order.service';
import { OrderRepositoryImpl } from './infrastructure/repositories';
import { OrderDocument, OrderSchema } from './infrastructure/schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: OrderDocument.name, schema: OrderSchema }]),
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
