package model

type Order struct {
	ID            int
	CoffeeBeanID  int
	QuantityGrams int
	BrewMethod    BrewMethod
	Status        OrderStatus
}
