import { doc, updateDoc, serverTimestamp, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

import type { Order } from "../types/order";

export const cashierService = {
  getOrders: async (restaurantId: string): Promise<Order[]> => {
    try {
      const ordersRef = collection(db, "restaurants", restaurantId, "orders");
      const q = query(ordersRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[];
    } catch (error) {
      console.error("Error fetching all orders for dashboard:", error);
      return [];
    }
  },

  acceptOrder: async (restaurantId: string, orderId: string) => {
    const orderRef = doc(db, "restaurants", restaurantId, "orders", orderId);
    await updateDoc(orderRef, {
      status: "accepted",
      acceptedAt: serverTimestamp(),
    });

    // Log action
    const logsRef = collection(db, "restaurants", restaurantId, "logs");
    await addDoc(logsRef, {
      restaurantId,
      actorLabel: "Cashier",
      actorRole: "cashier",
      action: "order_accepted",
      message: `Order accepted`,
      metadata: { orderId },
      createdAt: serverTimestamp(),
    });
  },

  markPaid: async (restaurantId: string, orderId: string) => {
    const orderRef = doc(db, "restaurants", restaurantId, "orders", orderId);
    await updateDoc(orderRef, {
      status: "awaiting_payment", // Or directly to paid depending on flow
    });
  },

  closeOrder: async (restaurantId: string, orderId: string) => {
    const orderRef = doc(db, "restaurants", restaurantId, "orders", orderId);
    await updateDoc(orderRef, {
      status: "closed",
      completedAt: serverTimestamp(),
    });

    const logsRef = collection(db, "restaurants", restaurantId, "logs");
    await addDoc(logsRef, {
      restaurantId,
      actorLabel: "Cashier",
      actorRole: "cashier",
      action: "order_completed",
      message: `Order completed and closed`,
      metadata: { orderId },
      createdAt: serverTimestamp(),
    });
  }
};
