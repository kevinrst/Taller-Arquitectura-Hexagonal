package in

import "taller/domain/model"

type OrdersPort interface {
	GetOrders() ([]model.Order, error)
	ProcessOrder(order model.Order) error
}
