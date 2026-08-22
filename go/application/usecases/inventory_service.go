package usecases

import (
	"taller/application/ports/in"
	"taller/application/ports/out"
	"taller/domain/model"
)

type InventoryService struct {
	inventory out.InventoryRepository
}

func NewInventoryService(inventory out.InventoryRepository) in.InventoryPort {
	return &InventoryService{
		inventory: inventory,
	}
}
func (i *InventoryService) GetCoffeeBeans() ([]model.CoffeeBean, error) {
	beans, err := i.inventory.GetCoffeeBeans()
	if err != nil {
		return nil, err
	}
	return beans, nil
}
