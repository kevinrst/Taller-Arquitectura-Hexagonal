import { OrderValidator } from "./domain/service/order-validator";
import { OrderService } from "./application/usecases/order-service";
import { InventoryService } from "./application/usecases/inventory-service";
import { CLI } from "./infrastructure/adapters/in/cli";
import { Inventory } from "./infrastructure/adapters/out/persistence-inventory";
import { Orders } from "./infrastructure/adapters/out/persistence-order";

const inventory = new Inventory();
const orders = new Orders();
const orderValidator = new OrderValidator();

const orderService = new OrderService(inventory, orders, orderValidator);
const inventoryService = new InventoryService(inventory);

const cli = new CLI(orderService, inventoryService);
cli.run();
