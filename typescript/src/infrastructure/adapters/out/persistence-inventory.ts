import { InventoryRepository } from "../../../application/ports/out/inventory-repository";
import { CoffeeBean } from "../../../domain/model/coffee-bean";
import { BeanNotFoundError } from "../../../domain/exception/inventory";

export class Inventory implements InventoryRepository {
  private coffeeBeans: CoffeeBean[];

  constructor() {
    this.coffeeBeans = [
      { id: 1, name: "Bourbon Rosado", availableGrams: 700 },
      { id: 2, name: "Geisha", availableGrams: 1200 },
    ];
  }

  getCoffeeBeans(): CoffeeBean[] {
    return [...this.coffeeBeans];
  }

  findCoffeeBean(id: number): CoffeeBean {
    const bean = this.coffeeBeans.find((b) => b.id === id);
    if (!bean) {
      throw new BeanNotFoundError();
    }
    return { ...bean };
  }

  removeStock(id: number, grams: number): void {
    const bean = this.coffeeBeans.find((b) => b.id === id);
    if (!bean) {
      throw new BeanNotFoundError();
    }
    bean.availableGrams -= grams;
  }
}
