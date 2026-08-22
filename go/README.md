# Arquitectura Hexagonal - Specialty Coffee Roasters

```
├── main.go
├── domain/
│   ├── model/
│   │   ├── coffee_bean.go
│   │   ├── order.go
│   │   ├── brew_method.go
│   │   └── order_status.go
│   ├── service/
│   │   └── order_validator.go
│   └── exception/
│       └── inventory.go
├── application/
│   ├── ports/
│   │   ├── in/
│   │   │   ├── orders.go
│   │   │   └── inventory.go
│   │   └── out/
│   │       ├── order_repository.go
│   │       └── inventory_repository.go
│   └── usecases/
│       ├── order_service.go
│       └── inventory_service.go
└── infrastructure/
    └── adapters/
        ├── in/
        │   └── cli.go
        └── out/
            ├── persistence_inventory.go
            └── persistence_order.go
```

## Capa de Dominio (`domain/`)

Contiene la lógica de negocio core. No depende de ninguna otra capa.

- **`model/`** — Entidades y tipos de valor: `Order`, `CoffeeBean`, `BrewMethod` (enum de métodos de preparación), `OrderStatus` (enum de estados).
- **`service/`** — Servicios de dominio. `OrderValidator` valida que la cantidad sea válida y que haya stock suficiente.
- **`exception/`** — Errores de dominio: `ErrBeanNotFound`, `ErrInsufficientInventory`.

## Capa de Aplicación (`application/`)

Orquesta los casos de uso y define los puertos.

### Puertos de entrada (`ports/in/`)

Interfaces que los adaptadores de entrada deben consumir:

- **`OrdersPort`** — `ProcessOrder(order)`, `GetOrders()`
- **`InventoryPort`** — `GetCoffeeBeans()`

### Puertos de salida (`ports/out/`)

Interfaces que los adaptadores de salida deben implementar:

- **`OrderRepository`** — `Save(order)`, `GetOrders()`
- **`InventoryRepository`** — `FindCoffeeBean(id)`, `GetCoffeeBeans()`, `RemoveStock(id, grams)`

### Casos de uso (`usecases/`)

Implementan los puertos de entrada y dependen de los puertos de salida:

- **`OrderService`** implementa `OrdersPort` — orquesta validación, descuento de stock y persistencia.
- **`InventoryService`** implementa `InventoryPort` — retorna el inventario de granos.

## Capa de Infraestructura (`infrastructure/adapters/`)

Implementa los puertos de salida y adapta el sistema al mundo exterior.

### Adaptadores de entrada (`adapters/in/`)

- **`CLI`** — Adaptador de consola. Consume `OrdersPort` e `InventoryPort`. Presenta un menú con opciones: hacer pedido, ver pedidos, salir.

### Adaptadores de salida (`adapters/out/`)

- **`Inventory`** implementa `InventoryRepository` — almacenamiento en memoria con datos iniciales (Bourbon Rosado, Geisha).
- **`Orders`** implementa `OrderRepository` — almacenamiento en memoria de pedidos.

## Flujo de dependencias

```
main.go (ensambla todo)
  └─ adaptadores (in/CLI, out/Inventory, out/Orders)
       └─ puertos de entrada (OrdersPort, InventoryPort)
            └─ casos de uso (OrderService, InventoryService)
                 └─ puertos de salida (InventoryRepository, OrderRepository)
                      └─ dominio (model, service, exception)
```

La dependencia siempre apunta hacia adentro.

## Inyección de dependencias

`main.go` es el único lugar que conoce todas las implementaciones:

```go
inventory := persistence.NewInventory()
orders := persistence.NewOrders()
orderValidator := service.NewOrderValidator()

orderService := usecases.NewOrderService(inventory, orders, orderValidator)
inventoryService := usecases.NewInventoryService(inventory)

cli := in.NewCLI(orderService, inventoryService)
cli.Run()
```
