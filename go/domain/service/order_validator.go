package service

import (
	"taller/domain/exception"
	"taller/domain/model"
)

type OrderValidator struct{}

func NewOrderValidator() *OrderValidator {
	return &OrderValidator{}
}

func (s *OrderValidator) ValidateOrder(order model.Order, availableGrams int) error {
	if order.QuantityGrams <= 0 {
		return exception.ErrInsufficientInventory
	}

	if availableGrams < order.QuantityGrams {
		return exception.ErrInsufficientInventory
	}

	return nil
}
