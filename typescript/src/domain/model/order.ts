import { BrewMethod } from "./brew-method";
import { OrderStatus } from "./order-status";

export interface Order {
  id: number;
  coffeeBeanId: number;
  quantityGrams: number;
  brewMethod: BrewMethod;
  status: OrderStatus;
}
