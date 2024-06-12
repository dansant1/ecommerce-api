import { SKU } from '../domain/value-objects';

export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly sku: SKU,
    public readonly price: number,
    public readonly picture: string,
  ) {}
}
