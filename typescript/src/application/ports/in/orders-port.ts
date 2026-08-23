import { Order } from "../../../domain/model/order";

export interface OrdersPort {
  getOrders(): Order[];
  processOrder(order: Order): void;
}
