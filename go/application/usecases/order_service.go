package usecases

import (
	"taller/application/ports/in"
	"taller/application/ports/out"
	"taller/domain/model"
	"taller/domain/service"
)

type OrderService struct {
	inventory       out.InventoryRepository
	orderRepository out.OrderRepository
	orderValidator  *service.OrderValidator
}

func NewOrderService(
	inventory out.InventoryRepository,
	orderRepository out.OrderRepository,
	orderValidator *service.OrderValidator,
) in.OrdersPort {
	return &OrderService{
		inventory:       inventory,
		orderRepository: orderRepository,
		orderValidator:  orderValidator,
	}
}

func (o *OrderService) GetOrders() ([]model.Order, error) {
	return o.orderRepository.GetOrders()
}

func (o *OrderService) ProcessOrder(order model.Order) error {
	coffeeBean, err := o.inventory.FindCoffeeBean(order.CoffeeBeanID)
	if err != nil {
		return err
	}

	if err = o.orderValidator.ValidateOrder(order, coffeeBean.AvailableGrams); err != nil {
		order.Status = model.Rejected
		return err
	}

	if err = o.inventory.RemoveStock(order.CoffeeBeanID, order.QuantityGrams); err != nil {
		return err
	}

	order.Status = model.Confirmed

	return o.orderRepository.Save(order)
}
