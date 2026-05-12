import { Timestamp } from "firebase/firestore";

export type ActivityLog = {
  id: string;
  restaurantId: string;
  actorId?: string;
  actorLabel: string;
  actorRole: "customer" | "cashier" | "owner" | "superadmin" | "system" | "manager" | "waiter";
  action:
    | "order_created"
    | "order_accepted"
    | "order_completed"
    | "order_cancelled"
    | "menu_item_created"
    | "menu_item_updated"
    | "table_created"
    | "table_updated"
    | "settings_updated"
    | "staff_login"
    | "superadmin_action";
  message: string;
  metadata?: Record<string, unknown>;
  createdAt: Timestamp;
};
