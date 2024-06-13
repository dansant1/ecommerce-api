import {
  Product,
} from '../../../products/domain/entities';

export class Order {
    public id: string;
    public clientName: string;
    public total: number;
    public productList: Product[] | string[]; 
    public createdAt: Date = new Date();
  
    constructor(id: string, clientName: string, total: number, productList: Product[] | string[]) {
        this.id = id;
        this.clientName = clientName;
        this.total = total;
        this.productList = productList;
    }
  
    public getClientName(): string {
      return this.clientName;
    }
  
    public getTotal(): number {
      return this.total;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
      }
  
    public getProductList(): Product[] | string[] {
      return this.productList;
    }
  
}
  