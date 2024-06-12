export class SKU {
    constructor(private readonly value: string) {
      if (!this.validate(value)) {
        throw new Error('Invalid SKU');
      }
    }
  
    private validate(sku: string): boolean {
      return /^[A-Z0-9-]+$/.test(sku);
    }
  
    public getValue(): string {
      return this.value;
    }
}
  