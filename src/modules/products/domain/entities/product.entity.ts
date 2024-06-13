import { SKU } from '../value-objects';

export class Product {
  public _id: string;
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly sku: SKU,
    public readonly price: number,
    public readonly picture: string,
  ) {}
}
