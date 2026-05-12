import { Timestamp } from "firebase/firestore";

export type RestaurantTable = {
  id: string;
  label: string;
  qrCodeValue: string;
  status: "empty" | "created" | "accepted" | "awaiting_payment" | "paid" | "closed";
  activeOrderId?: string;
  enabled: boolean;
  sortOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
