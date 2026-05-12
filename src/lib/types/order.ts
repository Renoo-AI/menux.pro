import { Timestamp } from "firebase/firestore";

export type Order = {
  id: string;
  restaurantId: string;
  tableId: string;
  tableLabel: string;
  status: "created" | "accepted" | "awaiting_payment" | "paid" | "closed" | "cancelled";
  items: Array<{
    menuItemId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    notes?: string;
  }>;
  customerNote?: string;
  total: number;
  currency: string;
  createdAt: Timestamp;
  acceptedAt?: Timestamp;
  completedAt?: Timestamp;
  cancelledAt?: Timestamp;
  cancelledReason?: string;
  createdBy: "customer" | "staff";
  handledBy?: string;
};
