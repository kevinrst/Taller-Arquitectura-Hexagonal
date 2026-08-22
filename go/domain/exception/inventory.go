package exception

import "errors"

var ErrInsufficientInventory = errors.New("insufficient inventory for requested coffee bean")
var ErrBeanNotFound = errors.New("CoffeeBean was not found")
