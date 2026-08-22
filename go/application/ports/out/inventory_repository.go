package out

import "taller/domain/model"

type InventoryRepository interface {
	FindCoffeeBean(id int) (model.CoffeeBean, error)
	GetCoffeeBeans() ([]model.CoffeeBean, error)
	RemoveStock(id int, grams int) error
}
