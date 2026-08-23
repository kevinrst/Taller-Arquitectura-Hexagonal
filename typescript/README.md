# Arquitectura Hexagonal - Specialty Coffee Roasters (TypeScript)

```
├── src/
│   ├── main.ts
│   ├── domain/
│   │   ├── model/
│   │   │   ├── coffee-bean.ts
│   │   │   ├── order.ts
│   │   │   ├── brew-method.ts
│   │   │   └── order-status.ts
│   │   ├── service/
│   │   │   └── order-validator.ts
│   │   └── exception/
│   │       └── inventory.ts
│   ├── application/
│   │   ├── ports/
│   │   │   ├── in/
│   │   │   │   ├── orders-port.ts
│   │   │   │   └── inventory-port.ts
│   │   │   └── out/
│   │   │       ├── order-repository.ts
│   │   │       └── inventory-repository.ts
│   │   └── usecases/
│   │       ├── order-service.ts
│   │       └── inventory-service.ts
│   └── infrastructure/
│       └── adapters/
│           ├── in/
│           │   └── cli.ts
│           └── out/
│               ├── persistence-inventory.ts
│               └── persistence-order.ts
├── package.json
└── tsconfig.json
```

## Capa de Dominio (`domain/`)

Contiene la lógica de negocio core. No depende de ninguna otra capa.

- **`model/`** — Interfaces y tipos de valor: `Order`, `CoffeeBean`, `BrewMethod` (objeto `as const` con tipos literales), `OrderStatus` (objeto `as const`).
- **`service/`** — Servicios de dominio. `OrderValidator` valida que la cantidad sea válida y que haya stock suficiente. Lanza excepciones en lugar de retornar errores.
- **`exception/`** — Clases de error personalizadas: `BeanNotFoundError`, `InsufficientInventoryError`.

## Capa de Aplicación (`application/`)

Orquesta los casos de uso y define los contratos (puertos).

### Puertos de entrada (`ports/in/`)

Interfaces TypeScript que los adaptadores de entrada consumen:

- **`OrdersPort`** — `processOrder(order)`, `getOrders()`
- **`InventoryPort`** — `getCoffeeBeans()`

### Puertos de salida (`ports/out/`)

Interfaces TypeScript que los adaptadores de salida deben implementar:

- **`OrderRepository`** — `save(order)`, `getOrders()`
- **`InventoryRepository`** — `findCoffeeBean(id)`, `getCoffeeBeans()`, `removeStock(id, grams)`

### Casos de uso (`usecases/`)

Clases que implementan los puertos de entrada y dependen de los puertos de salida:

- **`OrderService`** implementa `OrdersPort` — orquesta validación, descuento de stock y persistencia.
- **`InventoryService`** implementa `InventoryPort` — retorna el inventario de granos.

## Capa de Infraestructura (`infrastructure/adapters/`)

Implementa los puertos de salida y adapta el sistema al mundo exterior.

### Adaptadores de entrada (`adapters/in/`)

- **`CLI`** — Adaptador de consola. Consume `OrdersPort` e `InventoryPort`. Usa `readline` de Node.js con `async/await` para lectura de input. Presenta un menú: hacer pedido, ver pedidos, salir.

### Adaptadores de salida (`adapters/out/`)

- **`Inventory`** implementa `InventoryRepository` — almacenamiento en memoria con datos iniciales (Bourbon Rosado, Geisha). Retorna copias con spread (`{...bean}`) para evitar fugas de referencia.
- **`Orders`** implementa `OrderRepository` — almacenamiento en memoria de pedidos.

## Flujo de dependencias

```
main.ts (ensambla todo)
  └─ adaptadores (in/CLI, out/Inventory, out/Orders)
       └─ puertos de entrada (OrdersPort, InventoryPort)
            └─ casos de uso (OrderService, InventoryService)
                 └─ puertos de salida (OrderRepository, InventoryRepository)
                      └─ dominio (model, service, exception)
```

La dependencia siempre apunta hacia adentro. 

## Inyección de dependencias

`main.ts` es el único lugar que conoce todas las implementaciones:

```typescript
const inventory = new Inventory();
const orders = new Orders();
const orderValidator = new OrderValidator();

const orderService = new OrderService(inventory, orders, orderValidator);
const inventoryService = new InventoryService(inventory);

const cli = new CLI(orderService, inventoryService);
cli.run();
```

Los puertos se inyectan por constructor.
