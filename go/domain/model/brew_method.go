package model

type BrewMethod string

var AllBrewMethods = []BrewMethod{PourOver, Espresso, FrenchPress, ColdBrew}

const (
	PourOver    BrewMethod = "POUR_OVER"
	Espresso    BrewMethod = "ESPRESSO"
	FrenchPress BrewMethod = "FRENCH_PRESS"
	ColdBrew    BrewMethod = "COLD_BREW"
)
