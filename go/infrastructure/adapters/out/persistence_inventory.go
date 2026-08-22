package out

import (
	"taller/domain/exception"
	"taller/domain/model"
)

type Inventory struct {
	coffeeBeans []model.CoffeeBean
}

func NewInventory() *Inventory {
	return &Inventory{
		coffeeBeans: []model.CoffeeBean{
			{
				ID:             1,
				Name:           "Bourbon Rosado",
				AvailableGrams: 700,
			},
			{
				ID:             2,
				Name:           "Geisha",
				AvailableGrams: 1200,
			},
		},
	}
}

func (i *Inventory) GetCoffeeBeans() ([]model.CoffeeBean, error) {
	return i.coffeeBeans, nil
}

func (i *Inventory) FindCoffeeBean(id int) (model.CoffeeBean, error) {
	for _, bean := range i.coffeeBeans {
		if bean.ID == id {
			return bean, nil
		}
	}

	return model.CoffeeBean{}, exception.ErrBeanNotFound
}

func (i *Inventory) RemoveStock(id int, grams int) error {
	for j, bean := range i.coffeeBeans {
		if bean.ID == id {
			i.coffeeBeans[j].AvailableGrams -= grams
			return nil
		}
	}
	return exception.ErrBeanNotFound
}
