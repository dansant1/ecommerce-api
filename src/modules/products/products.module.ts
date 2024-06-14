import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from '../products/application/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductDocument, ProductSchema } from './infrastructure/schemas';
import {
  ProductRepositoryImpl
} from './infrastructure/repositories/product.repository';

@Module({
    imports: [
      MongooseModule
      .forFeature([{ 
          name: ProductDocument.name, 
          schema: ProductSchema 
      }]),
    ],
    controllers: [ProductController],
    providers: [
      ProductService,
      {
        provide: 'ProductRepository',
        useClass: ProductRepositoryImpl,
      },
    ],
    exports: [
      {
        provide: 'ProductRepository',
        useClass: ProductRepositoryImpl,
      },
    ]
})
export class ProductModule {};


