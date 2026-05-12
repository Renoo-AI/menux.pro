import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

import type { Order } from "../types/order";

export const orderClientService = {
  createOrder: async (data: Omit<Order, "id" | "status" | "createdAt" | "acceptedAt" | "completedAt" | "cancelledAt" | "cancelledReason" | "handledBy">) => {
    // Basic implementation for the vertical slice
    // Writes to `restaurants/{restaurantId}/orders`
    const { restaurantId, tableId, tableLabel, items, customerNote, total, currency, createdBy } = data;

    const ordersRef = collection(db, "restaurants", restaurantId, "orders");

    const newOrder = {
      restaurantId,
      tableId,
      tableLabel,
      status: "created",
      items,
      customerNote: customerNote || "",
      total,
      currency,
      createdAt: serverTimestamp(),
      createdBy,
    };

    const docRef = await addDoc(ordersRef, newOrder);

    // Also write to logs
    const logsRef = collection(db, "restaurants", restaurantId, "logs");
    await addDoc(logsRef, {
      restaurantId,
      actorLabel: "Customer",
      actorRole: "customer",
      action: "order_created",
      message: `New order created at table ${tableLabel}`,
      metadata: { orderId: docRef.id, total },
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  },
};
