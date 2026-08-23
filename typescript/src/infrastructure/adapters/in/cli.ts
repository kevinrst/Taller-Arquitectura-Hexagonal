import * as readline from "readline";
import { OrdersPort } from "../../../application/ports/in/orders-port";
import { InventoryPort } from "../../../application/ports/in/inventory-port";
import { Order } from "../../../domain/model/order";
import { OrderStatus } from "../../../domain/model/order-status";
import { AllBrewMethods } from "../../../domain/model/brew-method";

export class CLI {
  private orderService: OrdersPort;
  private inventoryService: InventoryPort;
  private rl: readline.Interface;

  constructor(orderService: OrdersPort, inventoryService: InventoryPort) {
    this.orderService = orderService;
    this.inventoryService = inventoryService;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  private question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  async run(): Promise<void> {
    while (true) {
      console.log("\nSpecialty Coffee Roasters");
      console.log("1. Make order");
      console.log("2. See orders");
      console.log("3. Exit");

      const option = await this.question("Select an option: ");

      switch (option.trim()) {
        case "1":
          await this.makeOrder();
          break;
        case "2":
          this.seeOrders();
          break;
        case "3":
          this.rl.close();
          return;
        default:
          console.log("Invalid option");
      }
    }
  }

  private async makeOrder(): Promise<void> {
    const beans = this.inventoryService.getCoffeeBeans();

    console.log("\nAvailable coffee beans:");
    for (const bean of beans) {
      console.log(`  ${bean.id}. ${bean.name} (${bean.availableGrams} g available)`);
    }

    const coffeeBeanId = parseInt(await this.question("\nCoffee bean ID: "), 10);
    const quantity = parseInt(await this.question("Quantity in grams: "), 10);

    console.log("\nBrew methods:");
    for (let i = 0; i < AllBrewMethods.length; i++) {
      console.log(`  ${i + 1}. ${AllBrewMethods[i]}`);
    }
    const methodIndex = parseInt(await this.question("Select brew method: "), 10);

    if (methodIndex < 1 || methodIndex > AllBrewMethods.length) {
      console.log("Invalid brew method");
      return;
    }

    const order: Order = {
      id: 1,
      coffeeBeanId,
      quantityGrams: quantity,
      brewMethod: AllBrewMethods[methodIndex - 1],
      status: OrderStatus.Pending,
    };

    try {
      this.orderService.processOrder(order);
      console.log("\nOrder confirmed");
    } catch (err) {
      console.log("\nOrder rejected:", (err as Error).message);
    }
  }

  private seeOrders(): void {
    const orders = this.orderService.getOrders();

    if (orders.length === 0) {
      console.log("\nNo orders yet.");
      return;
    }

    console.log("\nOrders:");
    for (const o of orders) {
      console.log(
        `  #${o.id} | Bean: ${o.coffeeBeanId} | ${o.quantityGrams}g | ${o.brewMethod} | ${o.status}`
      );
    }
  }
}
