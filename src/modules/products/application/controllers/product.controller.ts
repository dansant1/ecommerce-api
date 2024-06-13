import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto';
import { JwtAuthGuard } from '../../../auth/shared';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':sku')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('sku') sku: string) {
    return this.productService.findOne(sku);
  }

}

