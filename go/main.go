package main

import (
	"taller/application/usecases"
	"taller/domain/service"
	"taller/infrastructure/adapters/in"
	"taller/infrastructure/adapters/out"
)

func main() {
	inventory := out.NewInventory()
	orders := out.NewOrders()

	orderValidator := service.NewOrderValidator()

	orderService := usecases.NewOrderService(inventory, orders, orderValidator)
	inventoryService := usecases.NewInventoryService(inventory)

	cli := in.NewCLI(orderService, inventoryService)
	cli.Run()
}
