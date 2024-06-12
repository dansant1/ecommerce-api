import { Injectable, Inject } from '@nestjs/common';
import { CreateProductDto } from '../dto';
import { ProductRepository } from '../../domain/repositories';
import { SKU } from '../../domain/value-objects';
import { Product } from '../../entities';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository') private readonly productRepository: ProductRepository
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, sku, price, picture } = createProductDto;
    const product = new Product('', name, new SKU(sku), price, picture);
    return this.productRepository.save(product);
  }

  async findOne(sku: string): Promise<Product | null> {
    return this.productRepository.findBySKU(sku);
  }
}
