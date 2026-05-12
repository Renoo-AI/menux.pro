import { Timestamp } from "firebase/firestore";

export type UserRole = "superadmin" | "owner" | "manager" | "cashier" | "waiter";

export type User = {
  uid: string;
  email: string;
  role: UserRole;
  restaurantId?: string; // For staff
  createdAt: Timestamp;
  lastLogin?: Timestamp;
  status: "active" | "blocked";
};

export type Staff = {
  id: string; // usually same as uid if firebase auth is used, or a custom id for pin-based
  restaurantId: string;
  name: string;
  role: "manager" | "cashier" | "waiter";
  pinHash?: string; // If using pin-based auth
  status: "active" | "disabled";
  createdAt: Timestamp;
};
