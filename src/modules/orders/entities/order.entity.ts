
export class Order {
    public id: string;
    public clientName: string;
    public total: number;
    public productList: string[]; 
    public createdAt: Date = new Date();
  
    constructor(id: string, clientName: string, total: number, productList: string[]) {
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
  
    public getProductList(): string[] {
      return this.productList;
    }
  
}
  