import { InventoryPort } from "../ports/in/inventory-port";
import { InventoryRepository } from "../ports/out/inventory-repository";
import { CoffeeBean } from "../../domain/model/coffee-bean";

export class InventoryService implements InventoryPort {
  private inventory: InventoryRepository;

  constructor(inventory: InventoryRepository) {
    this.inventory = inventory;
  }

  getCoffeeBeans(): CoffeeBean[] {
    return this.inventory.getCoffeeBeans();
  }
}
