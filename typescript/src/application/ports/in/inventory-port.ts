import { CoffeeBean } from "../../../domain/model/coffee-bean";

export interface InventoryPort {
  getCoffeeBeans(): CoffeeBean[];
}
