import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from '../dto';
import { ProductRepository } from '../../domain/repositories';
import { SKU } from '../../domain/value-objects';
import { Product } from '../../domain/entities';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository') private readonly productRepository: ProductRepository
  ) {}

  async create(createProductDto: CreateProductDto, picturePath: string): Promise<Product> {
    const { name, sku, price } = createProductDto;
    const product = new Product('', name, new SKU(sku), price, picturePath);
    try {
      const result = await this.productRepository.save(product);     
      return result
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(sku: string): Promise<Product | null> {
    const prodct = await this.productRepository.findBySKU(sku);
    if (!prodct) {
      throw new HttpException(`product with ${sku} not found`, HttpStatus.NOT_FOUND);
    }
    return prodct;
  }
}
