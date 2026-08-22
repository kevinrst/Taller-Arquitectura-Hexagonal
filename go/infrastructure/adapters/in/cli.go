package in

import (
	"bufio"
	"fmt"
	"os"
	"taller/application/ports/in"
	"taller/domain/model"
)

type CLI struct {
	orderService     in.OrdersPort
	inventoryService in.InventoryPort
}

func NewCLI(orderService in.OrdersPort, inventoryService in.InventoryPort) *CLI {
	return &CLI{
		orderService:     orderService,
		inventoryService: inventoryService,
	}
}

func (c *CLI) Run() {
	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Println("\nSpecialty Coffee Roasters")
		fmt.Println("1. Make order")
		fmt.Println("2. See orders")
		fmt.Println("3. Exit")

		fmt.Println("Select an option: ")
		var option int
		fmt.Fscanln(reader, &option)

		switch option {
		case 1:
			c.makeOrder(reader)
		case 2:
			c.seeOrders()
		case 3:
			return
		default:
			fmt.Println("Invalid option")
		}
	}
}

func (c *CLI) makeOrder(reader *bufio.Reader) {
	beans, err := c.inventoryService.GetCoffeeBeans()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Available coffee beans:")
	for _, bean := range beans {
		fmt.Printf("  %d. %s (%d g available)\n", bean.ID, bean.Name, bean.AvailableGrams)
	}

	fmt.Print("\nCoffee bean ID: ")
	var coffeeBeanID int
	fmt.Fscanln(reader, &coffeeBeanID)

	fmt.Print("Quantity in grams: ")
	var quantity int
	fmt.Fscanln(reader, &quantity)

	fmt.Println("\nBrew methods:")
	for i, method := range model.AllBrewMethods {
		fmt.Printf("  %d. %s\n", i+1, method)
	}
	fmt.Print("Select brew method: ")
	var methodIndex int
	fmt.Fscanln(reader, &methodIndex)

	if methodIndex < 1 || methodIndex > len(model.AllBrewMethods) {
		fmt.Println("Invalid brew method")
		return
	}

	order := model.Order{
		ID:            1,
		CoffeeBeanID:  coffeeBeanID,
		QuantityGrams: quantity,
		BrewMethod:    model.AllBrewMethods[methodIndex-1],
		Status:        model.Pending,
	}

	if err := c.orderService.ProcessOrder(order); err != nil {
		fmt.Println("Order rejected:", err)
		return
	}

	fmt.Println("Order confirmed")
}

func (c *CLI) seeOrders() {
	orders, err := c.orderService.GetOrders()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	if len(orders) == 0 {
		fmt.Println("No orders yet.")
		return
	}

	fmt.Println("Orders:")
	for _, o := range orders {
		fmt.Printf("  %d | Bean: %d | %dg | %s | %s\n",
			o.ID, o.CoffeeBeanID, o.QuantityGrams, o.BrewMethod, o.Status)
	}
}
