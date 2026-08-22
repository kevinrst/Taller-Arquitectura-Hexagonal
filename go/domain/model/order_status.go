package model

type OrderStatus string

const (
	Pending   OrderStatus = "PENDING"
	Confirmed OrderStatus = "CONFIRMED"
	Rejected  OrderStatus = "REJECTED"
)
