import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './orders/orders.module';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        OrderModule,
        ProductModule,
        AuthModule,
    ],
})
export class AppModule {}
