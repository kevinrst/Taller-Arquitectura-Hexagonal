import { CoffeeBean } from "../../../domain/model/coffee-bean";

export interface InventoryRepository {
  findCoffeeBean(id: number): CoffeeBean;
  getCoffeeBeans(): CoffeeBean[];
  removeStock(id: number, grams: number): void;
}
