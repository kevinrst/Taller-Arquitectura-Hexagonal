package out

import "taller/domain/model"

type Orders []model.Order

func NewOrders() *Orders {
	orders := make(Orders, 0)
	return &orders
}

func (o *Orders) Save(order model.Order) error {
	*o = append(*o, order)
	return nil
}

func (o *Orders) GetOrders() ([]model.Order, error) {
	return *o, nil
}
