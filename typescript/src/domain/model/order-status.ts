export const OrderStatus = {
  Pending: "PENDING",
  Confirmed: "CONFIRMED",
  Rejected: "REJECTED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
