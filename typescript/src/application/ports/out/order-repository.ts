import { Order } from "../../../domain/model/order";

export interface OrderRepository {
  getOrders(): Order[];
  save(order: Order): void;
}
