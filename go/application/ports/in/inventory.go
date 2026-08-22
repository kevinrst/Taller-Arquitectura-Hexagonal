package in

import "taller/domain/model"

type InventoryPort interface {
	GetCoffeeBeans() ([]model.CoffeeBean, error)
}
