import { OrdersPort } from "../ports/in/orders-port";
import { OrderRepository } from "../ports/out/order-repository";
import { InventoryRepository } from "../ports/out/inventory-repository";
import { Order } from "../../domain/model/order";
import { OrderStatus } from "../../domain/model/order-status";
import { OrderValidator } from "../../domain/service/order-validator";

export class OrderService implements OrdersPort {
  private inventory: InventoryRepository;
  private orderRepository: OrderRepository;
  private orderValidator: OrderValidator;

  constructor(
    inventory: InventoryRepository,
    orderRepository: OrderRepository,
    orderValidator: OrderValidator
  ) {
    this.inventory = inventory;
    this.orderRepository = orderRepository;
    this.orderValidator = orderValidator;
  }

  getOrders(): Order[] {
    return this.orderRepository.getOrders();
  }

  processOrder(order: Order): void {
    const coffeeBean = this.inventory.findCoffeeBean(order.coffeeBeanId);

    this.orderValidator.validateOrder(order, coffeeBean.availableGrams);

    this.inventory.removeStock(order.coffeeBeanId, order.quantityGrams);

    order.status = OrderStatus.Confirmed;

    this.orderRepository.save(order);
  }
}
