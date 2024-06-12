import { Order } from '../../entities';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  getTotalSoldPriceLastMonth(): Promise<number>;
  getHighestAmountOrder(): Promise<Order>;
}
