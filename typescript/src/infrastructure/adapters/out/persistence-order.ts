import { OrderRepository } from "../../../application/ports/out/order-repository";
import { Order } from "../../../domain/model/order";

export class Orders implements OrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  getOrders(): Order[] {
    return [...this.orders];
  }

  save(order: Order): void {
    this.orders.push({ ...order });
  }
}
