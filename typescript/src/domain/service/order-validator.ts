import { Order } from "../model/order";
import { InsufficientInventoryError } from "../exception/inventory";

export class OrderValidator {
  validateOrder(order: Order, availableGrams: number): void {
    if (order.quantityGrams <= 0) {
      throw new InsufficientInventoryError();
    }

    if (availableGrams < order.quantityGrams) {
      throw new InsufficientInventoryError();
    }
  }
}
