export class BeanNotFoundError extends Error {
  constructor() {
    super("CoffeeBean was not found");
    this.name = "BeanNotFoundError";
  }
}

export class InsufficientInventoryError extends Error {
  constructor() {
    super("Insufficient inventory for requested coffee bean");
    this.name = "InsufficientInventoryError";
  }
}
