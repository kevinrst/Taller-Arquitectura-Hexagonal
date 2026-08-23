export const BrewMethod = {
  PourOver: "POUR_OVER",
  Espresso: "ESPRESSO",
  FrenchPress: "FRENCH_PRESS",
  ColdBrew: "COLD_BREW",
} as const;

export type BrewMethod = (typeof BrewMethod)[keyof typeof BrewMethod];

export const AllBrewMethods: BrewMethod[] = [
  BrewMethod.PourOver,
  BrewMethod.Espresso,
  BrewMethod.FrenchPress,
  BrewMethod.ColdBrew,
];
