package out

import "taller/domain/model"

type OrderRepository interface {
	GetOrders() ([]model.Order, error)
	Save(order model.Order) error
}
