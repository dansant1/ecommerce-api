import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':sku')
  async findOne(@Param('sku') sku: string) {
    return this.productService.findOne(sku);
  }

}

